<script>
    import { base } from "$app/paths";
    import { getContext } from "svelte";
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import summaryData from "$data/summary.csv";

    export let variable;
    export let title;
    export let station;

    let data = [];
    let groupedData = [];
    let city;

    let callLetters = station;
    let stationSumData = summaryData.filter(d => d.stationName == callLetters)
    console.log(stationSumData)

    onMount(async () => {
        const response = await fetch(`./assets/Austin_${station}_withB2B.csv`);
        const text = await response.text();
        const parsed = d3.csvParse(text)
        data = parsed;
        groupedData = d3.groups(data, d => d.date);
        const firstData = data[0];
        city = firstData.city.replace(/([A-Z])/g, ' $1').trim();
        }
    )

    function formatDate(date) {
        const yearRemoved = date.split("/", 2).join("/");
        return yearRemoved;
    }

    function setClass(variable, song) {
        if (variable == "b2b_gender") {
            return `song-${song.b2b_gender}`
        } else if (variable == "b2b_collabGender") {
            return `song-${song.b2b_collabGender}`
        } else if (variable == "b2b_combinedGender") {
            return `song-${song.b2b_combinedGender}`
        }
    }
</script>

<section id={variable}>
    <div class="chart">
        <div class="details">
            <p>{title}</p>
            <div class="stats">
                {#if variable == "b2b_gender"}
                    <p>Women B2B: {Math.round(stationSumData[0].b2bWomenSongs_PERCENT * 100)/100}%</p>
                    <p>Men B2B: {Math.round(stationSumData[0].b2bMenSongs_PERCENT * 100)/100}%</p>
                    <p>Mixed-gender B2B: {Math.round(stationSumData[0].b2bMixedGenderSongs_PERCENT * 100)/100}%</p>
                {:else if variable == "b2b_collabGender"}
                    <p>Women + collab B2B: {Math.round(stationSumData[0].b2bCollabGenderSongs_PERCENT * 100)/100}%</p>
                {:else if variable == "b2b_combinedGender"}
                <p>Women + all mixed-gender B2B: {Math.round(stationSumData[0].b2bCombinedGenderSongs_PERCENT * 100)/100}%</p>
                {/if}
            </div>
        </div>
        {#each groupedData as dateBlock}
            <div class="date-block">
                <p class="date">{formatDate(dateBlock[0])}</p>
                <div class="song-block">
                    {#each dateBlock[1] as song}
                        <div 
                            class="song {setClass(variable, song)}"></div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</section>

<style>
    .chart {
        width: 100%;
    }
    .details {
        width: 100;
        display: flex;
        flex-direction: column;
    }
    .stats {
        display: flex;
        flex-direction: row;
    }

    .date-block {
        display: flex;
        flex-direction: row;
        width: 100%;
        margin: 0 0 0.5rem 0;
        align-items: center;
    }
    .date {
        margin: 0 0.25rem 0 0;
        font-family: var(--sans);
        padding: 0;
        font-size: var(--12px);
        text-align: right;
        width: 4rem;
    }
    .song-block {
        display: flex; 
        flex-direction: row;
        width: calc(100% - 4rem);
        justify-content: flex-start;
        flex-wrap: nowrap;

    }
    .song {
        background-color: var(--color-gray-300);
        width: 2px;
        height: 2rem;
        margin: 0 1px 0 0;
    }

    .song-B2Bwomen, .song-B2BCollabWomen, .song-B2BCombinedWomen {
        background: magenta;
    }

    .song-B2Bmen, .song-B2BCollabMen, .song-B2BCombinedMen {
        background: #1fc3aa;
    }

    .song-B2Bmixed {
        background: yellow;
    }
</style>
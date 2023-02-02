<script>
    import { base } from "$app/paths";
    import { getContext } from "svelte";
	import * as d3 from "d3";
    import { onMount } from "svelte"
	import summaryData from "$data/summary.csv";

    let data = [];
    let groupedData = [];
    let station;
    let city;
    export let stationName;
    export let value;

    let callLetters = stationName.split("_")[1];
    let stationSumData = summaryData.filter(d => d.stationName == callLetters)

    onMount(async () => {
        const response = await fetch(`./assets/${stationName}`);
        const text = await response.text();
        const parsed = d3.csvParse(text)
        data = parsed;
        groupedData = d3.groups(data, d => d.date);
        const firstData = data[0];
        station = firstData.station;
        city = firstData.city.replace(/([A-Z])/g, ' $1').trim();
        }
    )

    function handleMouseEnter(song) {
        const tt = d3.select("#tooltip").style("opacity", 1);
        const ttStation = d3.select("#tt-station");
        const ttDate = d3.select("#tt-date");
        const ttTime = d3.select("#tt-time");
        const ttArtist = d3.select("#tt-artist");
        const ttTitle = d3.select("#tt-title");


        ttDate.text(song.date)
        ttStation.text(song.station)
        ttTime.text(song.time)
        ttArtist.text(song.artist)
        ttTitle.text(song.title)
    }

    function handleMouseLeave() {
        
        const tt = d3.select("#tooltip").style("opacity", 0);
    }
	
</script>

<section>
    <div class="details">
        <p>{city}</p>
        <p>{station}</p>
        <div class="stats">
            {#if value == "B2B Gender Women+Mixed"}
                <p class="stat-w"><strong>WomenCombined-B2B:</strong> {(+stationSumData[0].b2bCombinedGenderSongs_PERCENT).toFixed(2)}%</p>
                <p class="stat-m"><strong>Men-B2B:</strong> {(+stationSumData[0].b2bMenSongs_PERCENT).toFixed(2)}%</p>
            {:else if value == "Gender Only"}
                <p class="stat-w"><strong>Women:</strong> {(+stationSumData[0].onlyWomenSongs_PERCENT).toFixed(2)}%</p>
                <p class="stat-m"><strong>Men:</strong> {(+stationSumData[0].onlyMenSongs_PERCENT).toFixed(2)}%</p>
                <p class="stat-x"><strong>Mixed:</strong> {(+stationSumData[0].onlyMixedGenderSongs_PERCENT).toFixed(2)}%</p>
            {:else}
                <p class="stat-w"><strong>Women-B2B:</strong> {(+stationSumData[0].b2bWomenSongs_PERCENT).toFixed(2)}%</p>
                <p class="stat-m"><strong>Men-B2B:</strong> {(+stationSumData[0].b2bMenSongs_PERCENT).toFixed(2)}%</p>
                <p class="stat-x"><strong>Mixed-B2B:</strong> {(+stationSumData[0].b2bMixedGenderSongs_PERCENT).toFixed(2)}%</p>
            {/if}
        </div>
    </div>
    <div class="all">
        {#each groupedData as dateBlock}
            <div class="date-block">
                <p class="date">{dateBlock[0]}</p>
                <div class="song-block">
                    {#each dateBlock[1] as song}
                        <div 
                            class:hover={song.hover}
                            on:mouseenter={() => {
                                (song.hover = true)
                                handleMouseEnter(song)
                                }
                            }
                            on:mouseleave={() => {
                                (song.hover = false)
                                handleMouseLeave()
                                }
                            } 
                            class="song song-{song.b2b_gender} song-{song.b2b_combinedGender} song-{song.gender}"></div>
                    {/each}
                </div>
            </div>
        {/each} 
    </div>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        max-width: 90rem;
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    .details {
        display: flex;
        flex-direction: row;
        font-family: var(--sans);
        font-size: var(--18px);
        font-weight: 700;
    }

    .details p:last-of-type {
        margin: 1rem 0 1rem 0.5rem;
        font-weight: 500;
    }

    .all {
        display: flex;
        flex-direction: column;
    }

    .date-block {
        display: flex;
        flex-direction: row;
    }

    .song-block {
        display: flex;
        flex-direction: row;
    }

    .date {
        margin: 0 1rem 0 0;
        font-family: var(--sans);
        padding: 0;
        font-size: var(--12px);
        width: 5rem;
        text-align: right;
    }

    .song {
        height: 1.5rem;
        width: 2px;
        margin: 0 1px 0 0;
    }

    .stats {
        display: flex;
        flex-direction: row;
        font-weight: 500;
        margin: 0 0 0 5rem;
    }

    .stats p {
        margin: 1rem 0 1rem 2rem;
    }

    .stats p:last-of-type {
        margin: 1rem 0 1rem 2rem;
    }

    .stat-w::before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 16px;
        background: magenta;
        margin: 0 0.25rem 0 0;
    }

    .stat-m::before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 16px;
        background: #1fc3aa;
        margin: 0 0.25rem 0 0;
    }

    .stat-x::before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 16px;
        background: yellow;
        margin: 0 0.25rem 0 0;
    }

    .song-B2Bwomen {
        background: magenta;
    }

    .song-B2Bmen {
        background: #1fc3aa;
    }

    .song-B2Bmixed {
        background: yellow;
    }
    .song-X {
        background: var(--color-gray-200);
    }

    .hover {
        background: black !important;
    }

    :global(.hover) {
        background: black !important;
    }

    :global(.song:hover) {
        background: black !important;
    }
</style>
<script>
    import { base } from "$app/paths";
    import { getContext } from "svelte";
	import * as d3 from "d3";
    import { onMount } from "svelte"
	import { AtSign } from "lucide-svelte";

    let data = [];
    let groupedData = [];
    let station;
    let city;
    let active = false;
    export let stationName;

    onMount(async () => {
        const response = await fetch(`${base}/assets/${stationName}_withB2B.csv`);
        const text = await response.text();
        const parsed = d3.csvParse(text)
        data = parsed;
        groupedData = d3.groups(data, d => d.Date);
        const firstData = data[0];
        station = firstData.Station;
        city = firstData.city.replace(/([A-Z])/g, ' $1').trim();
        }
    )

    function mouseEnter(song) {
        const tt = d3.select("#tooltip").style("opacity", 1);
        const ttDate = d3.select("#tt-date");
        const ttTime = d3.select("#tt-time");
        const ttArtist = d3.select("#tt-artist");
        const ttTitle = d3.select("#tt-title");

        ttDate.text(song.Date)
        ttTime.text(song["Time Played"])
        ttArtist.text(song.Artist)
        ttTitle.text(song.Title)
    }

    function mouseLeave() {
        const tt = d3.select("#tooltip").style("opacity", 0);
    }
	
</script>

<section>
    <div class="details">
        <p>{city}</p>
        <p>{station}</p>
    </div>
    <div class="all">
        {#each groupedData as dateBlock}
            <div class="date-block">
                <p class="date">{dateBlock[0]}</p>
                <div class="song-block">
                    {#each dateBlock[1] as song}
                        <div 
                            on:mouseenter={mouseEnter(song)}
                            on:mouseleave={mouseLeave()}
                            class="song song-{song.b2b_gender}"></div>
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
        max-width: 80rem;
        margin: 0 auto;
        padding: 2rem 0;
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
        max-width: 80rem;
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
        width: 0.125rem;
        margin: 0 1px 0 0;
    }

    .song-B2Bwomen {
        background: magenta;
    }

    .song-B2Bmen {
        background: cyan;
    }

    .song-B2Bmixed {
        background: yellow;
    }
    .song-X {
        background: var(--color-gray-200);
    }

    .active {
        background: black;
    }
</style>
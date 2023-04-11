<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";

    let data = [];
    let firstDateData = [];
    let groupedData = [];
    let w;
    let colW;
    let padding = 32;
    let songBlocks;
    let b2bBlocks;
    let startingSong;

    export let startingStation;
    export let value;
    export let blockH;
    export let spacingX;
    export let spacingY;

    onMount(async () => {
        const response = await fetch(`./assets/${startingStation}_withB2B.csv`);
        const text = await response.text();
        const parsed = d3.csvParse(text)
        data = parsed;
        groupedData = d3.groups(data, d => d.date);
        firstDateData = groupedData[0];
        firstDateData = firstDateData[1]
        colW = Math.floor((w - padding)/19);
        }
    )

    function formatDate(indivDate) {
        const parseTime = d3.timeParse("%m/%e/%y")
        const date = parseTime(indivDate)
        const formatedDate = d3.timeFormat("%b %e")(date)
        return formatedDate;
    }

    function handleMouseEnter(song) {
        console.log("checking")
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

    function handleScroll(value) {
        if (value == 0) {
            songBlocks = d3.selectAll(".song").filter((d, i) => i == 136);
            songBlocks.transition()
                .duration(0)
                .style("left", `${w/2-100}px`)
                .end()
                .then(() => {
                    songBlocks.transition()
                        .delay(250)
                        .duration(250)
                        .style("bottom", "0px")
                        .style("opacity", 1);
                })
        } else if (value == 1) {
            const firstSong = d3.selectAll(".song").filter((d, i) => i == 136);
            firstSong.transition()
                .duration(500)
                .style("height", "2px")
                .end()
                .then(() => {
                    firstSong.transition()
                    .delay(500)
                    .duration(250)
                    .style("border", "0px")
                    .style("background", "#e1d4ca")
                    .style("transform", "translate(0px, 0px)")
                    .style("width", "100%")
                    .style("left", "0px")
                    .style("top", "0px")
                })
            b2bBlocks = d3.selectAll(".song").filter((d, i) => i >= 173 && i <= 184).filter(".song-B2Bmen");
            b2bBlocks.transition()
                .duration(0)
                .style("background-color", "#917c73")
            songBlocks = d3.selectAll(".song").filter((d, i) => i >= 136 && i <= 184);
            songBlocks.transition()
                .delay(1000)
                .transition()
                .delay((d, i) => i * 25)
                .duration(0)
                .style("opacity", 1);
        } else if (value == 2) {
            songBlocks = d3.selectAll(".song-B2Bmen");
            songBlocks.transition()
                .duration(1000)
                .style("background-color", "#917c73")
        } else if (value == 3) {
            songBlocks = d3.selectAll(".song").filter((d, i) => i >= 136 && i <= 273);
            songBlocks.transition()
                .delay((d, i) => i * 25)
                .duration(0)
                .style("opacity", 1)
                .end()
                .then(() => {
                    const lastSong = d3.selectAll(".song").filter((d, i) => i == 273)
                        .transition()
                        .duration(250)
                        .style("transform", "scale(1.25)")
                        .style("height", "8px");
                })
        } else if (value == 4) {
            songBlocks = d3.selectAll(".song");
            songBlocks.transition()
                // .delay((d, i) => i * 50)
                .duration(2000)
                .style("opacity", 1)
            const lastSong = d3.selectAll(".song").filter((d, i) => i == 273)
                .transition()
                .duration(250)
                .style("transform", "scale(1)")
                .style("height", "2px");
        } else if (value == 5) {

            songBlocks = d3.selectAll(".song");
            songBlocks.transition()
                .duration(2000)
                .style("opacity", 1);

            b2bBlocks = d3.selectAll(".song-B2Bmen")
            b2bBlocks.transition()
                .duration(1000)
                .style("background-color", "#e1d4ca")

            const dateBlocks = d3.selectAll(".date-block").filter((d,i) => i !== 0)
                .transition()
                .delay((d, i) => i * 200)
                .duration(50)
                .style("opacity", 0);
        } else if (value == 6) {
            const repChart = d3.selectAll("#representative-chart")
                .transition()
                .duration(1000)
                .style("opacity", 0);
            
            const firstDate = d3.selectAll(".date").filter((d,i) => i == 0)
                .transition()
                .duration(1000)
                .style("opacity", 1);

            b2bBlocks = d3.selectAll(".song-B2Bmen")
            b2bBlocks.transition()
                .duration(1000)
                .style("background-color", "#917c73")
            
            const dateBlocks = d3.selectAll(".date-block").filter((d,i) => i !== 0)
                .transition()
                .delay(1000)
                .duration(0)
                .style("opacity", 1);
        } else if (value == 7) {
            const dates = d3.selectAll(".date")
                .transition()
                .delay((d, i) => i * 200)
                .duration(50)
                .style("opacity", 1);

            const dateBlocks = d3.selectAll(".date-block")
                .transition()
                .delay((d, i) => i * 200)
                .duration(50)
                .style("opacity", 0);
            
            b2bBlocks = d3.selectAll(".song-B2Bmixed")
            b2bBlocks.transition()
                .duration(0)
                .style("background-color", "#fda922")
        }
    }

    $: handleScroll(value);
</script>

<svelte:window bind:innerWidth={w}/>

<section id="day-chart">
    {#each groupedData as indivDate, i}
    <div class="date-block" style="width:{colW}px">
        <p class="date">{formatDate(indivDate[0])}</p>
        {#if i == 0}
        <div class="song-block">
            {#each firstDateData as song, i}
                <div 
                    class="song song-{i} song-{song.b2b_gender} song-{song.b2b_combinedGender} song-{song.gender}"
                    on:mouseenter={() => {
                        handleMouseEnter(song)
                        }
                    } ></div>
            {/each}
        </div>
        {/if}
    </div>
    {/each}
</section>

<style>
    section {
        width: 100%;
        padding: 1rem;
        display: flex;
        flex-direction: row;
        z-index: 1000;
        position: relative;
    }
    .date-block {
        padding-right: 2px;
        background: var(--color-country-bg)
    }
    .date {
        font-family: var(--sans);
        text-align: center;
        line-height: 1.25;
        color: var(--color-country-text);
        margin: 0;
        opacity: 0;
        font-size: var(--14px);
    }
    .song-block {
        display: flex;
        flex-direction: column;
        margin-top: 3px
    }
    .song {
        height: 2px;
        width: 100%;
        margin: 0 0 1px 0;
        background-color: var(--color-country-tan);
        opacity: 0;
    }

    .song:hover {
        background-color: red;
    }
    .song-B2Bwomen {
        background-color: var(--color-country-blue);
    }

    .song-B2Bmen {
        background-color: var(--color-country-tan);
    }

    .song-B2Bmixed {
        background-color: var(--color-country-orange);
    }
    .song-136 {
        background: url("./assets/images/brooks-and-dunn-bw.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        position: relative;
        height: 200px;
        width: 200px;
        left: 0;
        bottom: -2000px;
        /* transform: translate(-50%, -50%); */
        border: 1px solid var(--color-country-tan);
        transition: all 0.5s;
    }
    .first-song {
        background: var(--color-country-brown);
        width: 100%;
        height: 2px;
        position: relative;
    }
</style>
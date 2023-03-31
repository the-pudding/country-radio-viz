<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";

    let data = [];
    let firstDateData = [];
    let groupedData = [];
    let w;
    let colW;
    let songBlocks;
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
        colW = w/19;
        }
    )

    function formatDate(indivDate) {
        const parseTime = d3.timeParse("%m/%e/%y")
        const date = parseTime(indivDate)
        const formatedDate = d3.timeFormat("%b %e")(date)
        return formatedDate;
    }

    function handleScroll(value) {
        if (value == 0) {
            songBlocks = d3.selectAll(".song").filter((d, i) => i == 137);
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
            const firstSong = d3.selectAll(".song").filter((d, i) => i == 137);
            firstSong.transition()
                .duration(500)
                .style("height", "2px")
                .end()
                .then(() => {
                    firstSong.transition()
                    .delay(500)
                    .duration(250)
                    .style("border", "0px")
                    .style("background", "#917c73")
                    .style("transform", "translate(0px, 0px)")
                    .style("width", "100%")
                    .style("left", "0px")
                    .style("top", "0px")
                })
            songBlocks = d3.selectAll(".song").filter((d, i) => i >= 137 && i <= 184);
            songBlocks.transition()
                .delay(1000)
                .transition()
                .delay((d, i) => i * 25)
                .duration(0)
                .style("opacity", 1);
        } else if (value == 2) {
            songBlocks = d3.selectAll(".song").filter((d, i) => i >= 137 && i <= 273);
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
        } else if (value == 3) {
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
        } else if (value == 4) {
            songBlocks = d3.selectAll(".song");
            songBlocks.transition()
                .duration(2000)
                .style("opacity", 0);
            const dates = d3.selectAll(".date")
                .transition()
                .delay((d, i) => i * 50)
                .duration(2000)
                .style("opacity", 1);
        }
    }

    $: handleScroll(value);
</script>

<svelte:window bind:innerWidth={w}/>

<section class="chart_Divs">
    {#each groupedData as indivDate, i}
    <div class="date-block">
        <p class="date">{formatDate(indivDate[0])}</p>
        {#if i == 0}
        <div class="song-block">
            {#each firstDateData as song, i}
                <div 
                    class="song song-{i} song-{song.b2b_gender} song-{song.b2b_combinedGender} song-{song.gender}"></div>
            {/each}
        </div>
        {/if}
    </div>
    {/each}
</section>

<style>
    .chart_Divs {
        width: 100%;
        padding: 1rem;
        display: flex;
        flex-direction: row;
    }
    .date-block {
        width: calc(100%/19);
        padding-right: 2px;
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
    }
    .song {
        height: 2px;
        width: 100%;
        margin: 0 0 1px 0;
        background-color: var(--color-country-tan);
        opacity: 0;
    }
    .song-B2Bwomen {
        background-color: var(--color-country-blue);
    }

    .song-B2Bmen {
        background-color: var(--color-country-brown);
    }

    .song-B2Bmixed {
        background-color: var(--color-country-orange);
    }
    .song-137 {
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
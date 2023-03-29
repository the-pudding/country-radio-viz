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

    function handleScroll(value) {
        if (value == 0) {
            songBlocks = d3.selectAll(".song").filter((d, i) => i == 137);
            songBlocks.transition()
                .delay((d, i) => i * 25)
                .duration(0)
                .style("opacity", 1);
        } else if (value == 1) {
            songBlocks = d3.selectAll(".song").filter((d, i) => i >= 137 && i <= 184);
            songBlocks.transition()
                .delay((d, i) => i * 25)
                .duration(0)
                .style("opacity", 1);
        } else if (value == 2) {
            songBlocks = d3.selectAll(".song").filter((d, i) => i >= 137 && i <= 273);
            songBlocks.transition()
                .delay((d, i) => i * 25)
                .duration(0)
                .style("opacity", 1);
        } else if (value == 3) {
            songBlocks = d3.selectAll(".song");
            songBlocks.transition()
                // .delay((d, i) => i * 50)
                .duration(2000)
                .style("opacity", 1);
        } else if (value == 4) {
            songBlocks = d3.selectAll(".song");
            songBlocks.transition()
                // .delay((d, i) => i * 50)
                .duration(2000)
                .style("opacity", 0);
        }
    }

    $: handleScroll(value);
</script>

<svelte:window bind:innerWidth={w}/>

<section class="chart_Divs">
    <div class="date-block">
        <p class="date">Jan. 7</p>
        <div class="song-block">
            {#each firstDateData as song, i}
                <div 
                    class="song song-{i} song-{song.b2b_gender} song-{song.b2b_combinedGender} song-{song.gender}"></div>
            {/each}
        </div>
    </div>
</section>

<style>
    .chart_Divs {
        width: 100%;
        padding: 1rem;
    }
    .date-block {
        width: calc(100%/19);
        padding-right: 2px;
    }
    .date {
        font-family: var(--sans);
        text-align: center;
        line-height: 1.25;
        margin: 0;
    }
    .song-block {
        display: flex;
        flex-direction: column;
    }
    .song {
        height: 2px;
        width: 100%;
        margin: 0 0 1px 0;
        background-color: #c9c9c9;
        opacity: 0;
    }
    .song-B2Bwomen {
        background-color: magenta;
    }

    .song-B2Bmen {
        background-color: #1fc3aa;
    }

    .song-B2Bmixed {
        background-color: yellow;
    }
    .song-137 {
        background: url("./assets/images/brooks-and-dunn.jpg");
        background-size: cover;
        background-repeat: no-repeat;
    }
</style>
<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";

    // data
    let data = [];
    let firstDateData = [];
    let groupedData = [];
    let releaseDateArray = [0, 1, 3, 5, 7, 9, 11];

    // dimensions
    let w;
    let colW;
    let padding = 32;

    // elements
    let allSongBlocks;
    let firstSong;
    let b2bWomen;
    let b2bMen;
    let b2bMixed;
    let highlightWomenSong;
    let songCurtains;
    let repChart;
    let firstSongBlock;
    let dates;
    let firstDate;
    let simLabel;
    let stickyScroll;
    let songLineLabel;
    let b2bLabel;
    let timeLabel;
    let afterLabels;

    let songBlocks;
    let b2bBlocks;
    let startingSong;

    // mounted
    let mountCheck = false;

    // exports
    export let startingStation;
    export let value;
    export let blockH;
    export let spacingX;
    export let spacingY;

    onMount(() => {
        // data
        loadData();

        // dimensions
        colW = Math.floor((w - padding)/19);

        setTimeout(() => {
             // elements
            allSongBlocks = d3.selectAll(".song");
            firstSong = allSongBlocks.filter((d, i) => i == 136);
            b2bWomen = d3.selectAll(".song-B2Bwomen");
            b2bMen = d3.selectAll(".song-B2Bmen");
            b2bMixed = d3.selectAll(".song-B2Bmixed");
            highlightWomenSong = allSongBlocks.filter((d, i) => i == 273);
            repChart = d3.selectAll("#representative-chart");
            firstSongBlock = d3.selectAll(".song-block").filter((d, i) => i == 0);
            dates = d3.selectAll(".date");
            firstDate = d3.selectAll(".date").filter((d,i) => i == 0);
            songCurtains = d3.selectAll(".song-block");
            simLabel = d3.selectAll(".sim-label");
            stickyScroll = d3.select(".sticky");
            songLineLabel = d3.select(".song-line-label");
            b2bLabel = d3.select(".b2b-label");
            timeLabel = d3.select(".time-label-top");
            afterLabels = d3.selectAll(".song-4", ".song-73", ".song-272")

            // mounted
            mountCheck = true;
        }, 100)
        }
    )

    async function loadData() {
        const response = await fetch(`./assets/${startingStation}_withB2B.csv`);
        const text = await response.text();
        const parsed = d3.csvParse(text)
        data = parsed;
        groupedData = d3.groups(data, d => d.date);
        firstDateData = groupedData[0];
        firstDateData = firstDateData[1]
    }

    function formatDate(indivDate) {
        const parseTime = d3.timeParse("%m/%e/%y")
        const date = parseTime(indivDate)
        const formatedDate = d3.timeFormat("%b %e")(date)
        return formatedDate;
    }

    function handleScroll(value) {
        if (mountCheck) {
            if (value == 0) {
                firstSong.transition()
                    .duration(0)
                    .style("left", `${w/2-100-32}px`)
                    .end()
                    .then(() => {
                        firstSong.transition()
                            .delay(250)
                            .duration(250)
                            .style("bottom", "0px")
                            .style("opacity", 1);
                    })
            } else if (value == 1) {
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
                allSongBlocks.filter((d, i) => i >= 173 && i <= 184).filter(".song-B2Bmen").transition()
                    .duration(0)
                    .style("background", "#917c73")
                allSongBlocks.filter((d, i) => i >= 136 && i <= 184).transition()
                    .delay(1000)
                    .transition()
                    .delay((d, i) => i * 25)
                    .duration(0)
                    .style("opacity", 1);
                songLineLabel.transition()
                    .delay(2000)
                    .duration(1000)
                    .style("opacity", 1);
            } else if (value == 2) {
                b2bMen.transition()
                    .duration(1000)
                    .style("background", "#917c73")
                songLineLabel.transition()
                    .duration(1000)
                    .style("margin-top", `${3*148+1}px`)
                    .end()
                    .then(() => {
                        songLineLabel.select("p").transition()
                            .text("We're only counting the second song in a pair by same-gender artists as a back-to-back play")
                    })
            } else if (value == 3) {
                songLineLabel.transition()
                    .duration(1000)
                    .style("opacity", 0);
                allSongBlocks.filter((d, i) => i >= 136 && i <= 273).transition()
                    .delay((d, i) => i * 25)
                    .duration(0)
                    .style("opacity", 1)
                    .end()
                    .then(() => {
                        highlightWomenSong.transition()
                            .duration(100)
                            .style("transform", "scaleX(1.5)")
                            .style("margin-left", "25%")
                        
                        d3.select(".song-272").classed("show-label", true);
                    })
            } else if (value == 4) {
                allSongBlocks.transition()
                    .delay(500)
                    .duration(2000)
                    .style("opacity", 1);
                // highlightWomenSong.transition()
                //     .duration(750)
                //     .style("transform", "scaleX(1)")
                //     .style("margin-left", "0")
                timeLabel.transition()
                    .duration(1500)
                    .style("opacity", 1);
                b2bWomen.transition()
                    .delay(2000)
                    .duration(500)
                    .style("transform", "scaleX(1.5)")
                    .style("margin-left", "25%")
                    .end()
                    .then(() => {
                        d3.select(".song-4").classed("show-label", true);
                        d3.select(".song-73").classed("show-label", true);
                    })
            } else if (value == 5) {
                allSongBlocks.transition()
                    .duration(2000)
                    .style("opacity", 1);
                b2bMen.transition()
                    .duration(1000)
                    .style("background", "#e1d4ca")
                b2bWomen.transition()
                    .duration(500)
                    .style("transform", "scaleX(1)")
                    .style("margin-left", "0%")
                firstSong.transition()
                    .duration(500)
                    .style("background", "#e1d4ca")
                d3.select(".song-4").classed("show-label", false);
                d3.select(".song-73").classed("show-label", false);
                d3.select(".song-272").classed("show-label", false);
                songCurtains.filter((d,i) => i !== 0).transition()
                    .delay(1000)
                    .transition()
                    .delay((d, i) => i * 200)
                    .duration(50)
                    .style("opacity", 0);
                simLabel.transition()
                    .delay(3000)
                    .duration(1000)
                    .style("opacity", 1);
            } else if (value == 6) {
                repChart.transition()
                    .duration(1000)
                    .style("opacity", 0);
                firstDate.transition()
                    .delay(500)
                    .duration(1000)
                    .style("opacity", 1);
                b2bMen.transition()
                    .duration(1000)
                    .style("background", "#917c73")
                songCurtains.filter((d,i) => i !== 0).transition()
                    .delay(1000)
                    .duration(50)
                    .style("opacity", 1);
                simLabel.transition()
                    .duration(1000)
                    .style("opacity", 0);
            } else if (value == 7) {
                dates.transition()
                    .delay(1000)
                    .transition()
                    .delay((d, i) => i * 200)
                    .duration(50)
                    .style("opacity", 1);
                // songCurtains.filter((d,i) => i == 0).transition()
                //     .duration(500)
                //     .style("opacity", 0);
                songCurtains.filter((d,i) => i !== 0).transition()
                    .delay(1000)
                    .transition()
                    .delay((d, i) => i * 200)
                    .duration(50)
                    .style("opacity", 0);
                songCurtains.filter((d,i) => i == 0).transition()
                    .delay(2000)
                    .duration(1000)
                    .style("opacity", 0);
            } else if (value == 8) {
                const unmatchedCurtains = songCurtains.filter((d, i) => !releaseDateArray.includes(i));
                const unmatchedDates = dates.filter((d, i) => !releaseDateArray.includes(i));
                const matchedDates = dates.filter((d, i) => releaseDateArray.includes(i))
                unmatchedCurtains.transition()
                    .duration(1000)
                    .style("opacity", 0.75);
                unmatchedDates.transition()
                    .duration(1000)
                    .style("opacity", 0.5);
                matchedDates.transition()
                    .duration(1000)
                    .style("font-weight", "700");
            } else if (value == 9) {
                songCurtains.transition()
                    .duration(1000)
                    .style("opacity", 0);
                dates.transition()
                    .duration(0)
                    .style("font-weight", "500")
                    .transition()
                    .duration(1000)
                    .style("opacity", 1);
            } else if (value == 10) {
                stickyScroll.transition()
                    .duration(2000)
                    .style("opacity", 0)
            }
        }
    }

    $: handleScroll(value);
</script>

<svelte:window bind:innerWidth={w}/>

<section id="day-chart">
    <div class="sim-label" style="margin-left: {colW*2}px; width: calc({colW*10}px);"><p>Simulations</p></div>
    <div class="song-line-label" style="margin-left: {colW}px; margin-top: {3*134+1}px"><p>Each line is a song</p></div>
    <div class="time-label-top"><p>Midnight →</p></div>
    {#each groupedData as indivDate, i}
    <div class="date-block" style="width:{colW}px">
        <p class="date">{formatDate(indivDate[0])}</p>
        <div class="song-block">
            {#if i == 0 || i == undefined}
            {#each firstDateData as song, i}
                <div class="song song-{i} song-{song.b2b_gender} song-{song.b2b_combinedGender} song-{song.gender}"></div>
            {/each}
            {/if}
        </div>
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
        margin-left: 1.25rem;
    }
    .sim-label {
        position: absolute;
        top: 0.75rem;
        border-top: 1px solid var(--color-country-text);
        border-left: 1px solid var(--color-country-text);
        border-right: 1px solid var(--color-country-text);
        height: 1rem;
        opacity: 0;
    } 
    .sim-label p, .song-line-label p {
        font-family: var(--sans);
        font-size: var(--14px);
        max-width: 14rem;
    }
    .sim-label p {
        background: var(--color-country-bg);
        font-family: var(--sans);
        text-align: center;
        padding: 0 0.5rem;
        margin: 0;
        position: absolute;
        top: -0.75rem;
        transform: translate(-50%, 0);
        left: 50%;
        font-size: var(--14px);
    }
    .song-line-label {
        position: absolute;
        opacity: 0;
    }
    .song-line-label p {
        margin-left: 1rem;
    }
    .song-line-label p::before {
        content: "←";
        position: absolute;
        left: 0rem;
    }
    .time-label-top {
        position: absolute;
        top: 0;
        left: 0;
        padding: 0;
        margin: 0;
        width: 100%;
        opacity: 0;
    }
    .time-label-top p {
        transform: rotate(-90deg);
        font-family: var(--sans);
        color: var(--color-country-text);
        font-size: var(--14px);
        position: absolute;
        left: -2rem;
        top: 3rem;
    }
    .date {
        font-family: var(--sans);
        text-align: center;
        line-height: 1.25;
        color: var(--color-country-text);
        margin: 0;
        opacity: 0;
        font-size: var(--14px);
        text-overflow: clip;
        overflow: hidden;
        white-space: nowrap;    
    }
    .song-block {
        display: flex;
        flex-direction: column;
        margin-top: 3px;
        background: var(--color-country-bg);
        height: 100%;
        padding: 0 1px;
    }
    .song {
        height: 2px;
        width: 100%;
        margin: 0 0 1px 0;
        background: var(--color-country-tan);
        opacity: 0;
    }
    .song-4, .song-73, .song-272 {
        position: relative;
    }    
    .song-4::after {
        position: absolute;
        width: 30rem;
        top: 0.25rem;
        left: calc(100% + 0.25rem);
        content: '12:16am: Miranda Lambert "If I Was A Cowboy"';
        font-family: var(--sans);
        color: var(--color-country-blue);
        font-weight: 700;
        font-size: var(--14px);
        opacity: 0;
    }
    .song-73::after {
        position: absolute;
        width: 30rem;
        top: 0.25rem;
        left: calc(100% + 0.25rem);
        content: '4:18am: Carly Pearce & Ashley McBryde "Never Wanted To Be That Girl"';
        font-family: var(--sans);
        color: var(--color-country-blue);
        font-weight: 700;
        font-size: var(--14px);
        opacity: 0;
    }
    .song-272::after {
        position: absolute;
        width: 30rem;
        top: 0.25rem;
        left: calc(100% + 0.25rem);
        content: '5:51pm: Priscilla Block "Just About Over You"';
        font-family: var(--sans);
        color: var(--color-country-blue);
        font-weight: 700;
        font-size: var(--14px);
        opacity: 0;
    }
    .show-label::after  {
        opacity: 1
    }
    .song-B2Bwomen {
        background: var(--color-country-blue);
    }
    .song-B2Bmen {
        background: var(--color-country-tan);
    }
    .song-B2Bmixed {
        background: var(--color-country-orange);
    }
    .song-136 {
        background: "#e1d4ca";
        /* background: url("./assets/images/brooks-and-dunn-bw.jpg"); */
        background: url("https://the-pudding.github.io/country-radio-viz/assets/images/brooks-and-dunn-bw.jpg");
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
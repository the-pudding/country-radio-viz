<script>
    import { csvParse, groups, select, selectAll, timeParse, timeFormat } from "d3";
    import { onMount, tick } from "svelte";
    import { browser } from "$app/environment";

    // data
    let data = [];
    let firstDateData = [];
    let groupedData = [];
    let releaseDateArray = [0, 1, 3, 5, 7, 9, 11];

    // dimensions
    let w;
    let h;
    let scrollY;
    let scrollDir;
    let lastY = 0;
    let colW;
    let blockH;
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
    let intro;

    let songBlocks;
    let b2bBlocks;
    let startingSong;

    // mounted
    let mountCheck = false;

    // exports
    export let startingStation;
    export let value;

    onMount(async () => {
        // data
        await loadData();

        // dimensions
        calcW(w);
        blockH = h > 1000 ? 2 : 1;
        await tick();

        setSelectors();
        
        // mounted
        mountCheck = true;
    });

    async function loadData() {
        const response = await fetch(`./assets/${startingStation}_withB2B.csv`);
        const text = await response.text();
        const parsed = csvParse(text)
        data = parsed;
        groupedData = groups(data, d => d.date);
        firstDateData = groupedData[0];
        firstDateData = firstDateData[1];
    }

    function setSelectors() {
        allSongBlocks = selectAll(".song");
        firstSong = allSongBlocks.filter((d, i) => i == 136);
        b2bWomen = selectAll(".song-B2Bwomen");
        b2bMen = selectAll(".song-B2Bmen");
        b2bMixed = selectAll(".song-B2Bmixed");
        highlightWomenSong = allSongBlocks.filter((d, i) => i == 273);
        repChart = selectAll("#representative-chart");
        firstSongBlock = selectAll(".song-block").filter((d, i) => i == 0);
        dates = selectAll(".date");
        firstDate = selectAll(".date").filter((d,i) => i == 0);
        songCurtains = selectAll(".song-block");
        simLabel = selectAll(".sim-label");
        stickyScroll = select(".sticky");
        songLineLabel = select(".song-line-label");
        b2bLabel = select(".b2b-label");
        timeLabel = select(".time-label-top");
        afterLabels = selectAll(".song-4", ".song-73", ".song-272")
        intro = select("#intro");
    }

    function calcW(w) {
        colW = Math.floor((w - padding*1.5)/19);
    }
    function calcH(h) {
        blockH = h > 1000 ? 2 : 1;
    }

    function formatDate(indivDate) {
        const parseTime = timeParse("%m/%e/%y")
        const date = parseTime(indivDate)
        let formatedDate = timeFormat("%b%d")(date)
        formatedDate = `${formatedDate.match(/.{1,3}/g)[0]}<br>${formatedDate.match(/.{1,3}/g)[1]}`
        return formatedDate;
    }

    function checkScrollY(scrollY) {
        if (scrollY) {
            scrollDir = scrollY > lastY ? "down" : "up"
            lastY = scrollY;
        }
    }

    function handleScroll(value) {
        checkScrollY(scrollY)
        if (mountCheck) {
            if (value == 0 || value == "undefined" && scrollY == 0) {
                intro.transition()
                    .duration(500)
                    .style("opacity", 1);
            } else if (value == 1) {
                if (scrollDir == "up") {
                    console.log("up")
                    firstSong.transition()
                            .duration(250)
                            .style("left", `${w/2-100-32}px`)
                            .style("border", "1px solid #e1d4ca")
                            .style("bottom", "0px")
                            .style("background", "url('https://the-pudding.github.io/country-radio-viz/assets/images/brooks-and-dunn-bw.jpg')")
                            .style("background-size", "cover")
                            .style("width", "200px")
                            .style("height", "200px")
                            .style("opacity", 1);
                } else {
                    firstSong.transition()
                    .duration(0)
                    .style("left", `${w/2-100-32}px`)
                    .end()
                    .then(() => {
                        firstSong.transition()
                            .delay(250)
                            .duration(250)
                            .style("border", "1px solid #e1d4ca")
                            .style("bottom", "0px")
                            .style("background", "url('https://the-pudding.github.io/country-radio-viz/assets/images/brooks-and-dunn-bw.jpg'), cover")
                            .style("width", "200px")
                            .style("height", "200px")
                            .style("opacity", 1);
                    })
                }
                intro.transition()
                    .duration(500)
                    .style("opacity", 0);
                timeLabel.transition()
                    .duration(1500)
                    .style("opacity", 0);
                allSongBlocks.filter((d, i) => i !== 136).transition()
                    .duration(100)
                    .style("opacity", 0);
                songLineLabel.transition()
                    .duration(1000)
                    .style("opacity", 0);
                firstDate.transition()
                    .duration(1000)
                    .style("opacity", 0);
            } else if (value == 2) {
                intro.transition()
                    .duration(500)
                    .style("opacity", 0);
                timeLabel.transition()
                    .duration(1500)
                    .style("opacity", 0);
                firstSong.transition()
                    .duration(500)
                    .style("height", `${blockH}px`)
                    .end()
                    .then(() => {
                        firstSong.transition()
                            .delay(500)
                            .duration(500)
                            .style("border", "0px")
                            .style("background", "#e1d4ca")
                            .style("transform", "translate(0px, 0px)")
                            .style("width", "100%")
                            .style("left", "0px")
                            .style("top", "0px")
                    })
                allSongBlocks.filter((d, i) => i >= 172 && i <= 184).filter(".song-B2Bmen").transition()
                    .duration(0)
                    .style("background", "#917c73");
                allSongBlocks.filter((d, i) => i >= 136 && i <= 172).filter(".song-B2Bmen").transition()
                    .delay(500)
                    .duration(0)
                    .style("background", "#e1d4ca")
                allSongBlocks.filter((d, i) => i >= 136 && i <= 184).transition()
                    .delay(1000)
                    .transition()
                    .delay((d, i) => i * 25)
                    .duration(0)
                    .style("opacity", 1);
                songLineLabel.transition()
                    .delay(2000)
                    .duration(1000)
                    .style("opacity", 1)
                    .style("margin-top", `${(blockH+1)*134+(blockH+1)*7}px`)
                    .end()
                    .then(() => {
                        songLineLabel.select("p").transition()
                            .text("Each line is a song")
                    });
                firstDate.transition()
                    .duration(1000)
                    .style("opacity", 0);
            } else if (value == 3) {
                intro.transition()
                    .duration(500)
                    .style("opacity", 0);
                timeLabel.transition()
                    .duration(1500)
                    .style("opacity", 0);
                firstSong.transition()
                    .duration(0)
                    .style("height", `${blockH}px`)
                    .style("border", "0px")
                    .style("transform", "translate(0px, 0px)")
                    .style("width", "100%")
                    .style("left", "0px")
                    .style("top", "0px")
                    .style("bottom", "0px")
                    .style("background", "#A18D7E")
                b2bMen.transition()
                    .duration(1000)
                    .style("background", "#A18D7E")
                songLineLabel.transition()
                    .duration(1000)
                    .style("opacity", 0);
                allSongBlocks.filter((d, i) => i >= 185 && i <= 275).transition()
                    .duration(1000)
                    .style("opacity", 0)
                firstDate.transition()
                    .duration(1000)
                    .style("opacity", 0);
            } else if (value == 4) {
                intro.transition()
                    .duration(500)
                    .style("opacity", 0);
                timeLabel.transition()
                    .duration(1500)
                    .style("opacity", 0);
                allSongBlocks.filter((d, i) => i >= 0 && i <= 135).transition()
                    .delay(500)
                    .duration(2000)
                    .style("opacity", 0);
                allSongBlocks.filter((d, i) => i >= 274 && i <= 400).transition()
                    .delay(500)
                    .duration(2000)
                    .style("opacity", 0)
                    .end()
                    .then(() => {
                        b2bWomen.filter((d,i) => i !== 2).transition()
                            .duration(0)
                            .style("transform", "scaleX(1)")
                            .style("margin-left", "0")
                        select(".song-4").classed("show-label", false);
                        select(".song-73").classed("show-label", false);
                    });
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
                        
                        select(".song-272").classed("show-label", true);
                    })
                firstDate.transition()
                    .duration(1000)
                    .style("opacity", 0);
            } else if (value == 5) {
                intro.transition()
                    .duration(500)
                    .style("opacity", 0);
                allSongBlocks.transition()
                    .delay(500)
                    .duration(2000)
                    .style("opacity", 1);
                timeLabel.transition()
                    .duration(1500)
                    .style("opacity", 1);
                b2bMen.transition()
                    .delay(1000)
                    .duration(1000)
                    .style("background", "#A18D7E")
                    .style("opacity", 1);
                b2bWomen.transition()
                    .delay(2000)
                    .duration(500)
                    .style("transform", "scaleX(1.5)")
                    .style("margin-left", "25%")
                    .end()
                    .then(() => {
                        select(".song-4").classed("show-label", true);
                        select(".song-73").classed("show-label", true);
                        select(".song-272").classed("show-label", true);
                    })
                songCurtains.filter((d,i) => i !== 0).transition()
                    .duration(1000)
                    .style("opacity", 1);
                simLabel.transition()
                    .duration(1000)
                    .style("opacity", 0);
                firstDate.transition()
                    .duration(1000)
                    .style("opacity", 0);
            } else if (value == 6) {
                intro.transition()
                    .duration(500)
                    .style("opacity", 0);
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
                select(".song-4").classed("show-label", false);
                select(".song-73").classed("show-label", false);
                select(".song-272").classed("show-label", false);
                repChart.transition()
                    .duration(1000)
                    .style("opacity", 1);
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
                firstDate.transition()
                    .duration(1000)
                    .style("opacity", 0);
            } else if (value == 7) {
                intro.transition()
                    .duration(500)
                    .style("opacity", 0);
                repChart.transition()
                    .duration(1000)
                    .style("opacity", 0);
                firstDate.transition()
                    .delay(500)
                    .duration(1000)
                    .style("opacity", 1);
                b2bMen.transition()
                    .duration(1000)
                    .style("background","#A18D7E")
                songCurtains.filter((d,i) => i !== 0).transition()
                    .delay(1000)
                    .duration(50)
                    .style("opacity", 1);
                songCurtains.filter((d,i) => i == 0).transition()
                    .duration(1000)
                    .style("opacity", 1);
                simLabel.transition()
                    .duration(1000)
                    .style("opacity", 0);
                dates.filter((d,i) => i !== 0).transition()
                    .duration(1000)
                    .style("opacity", 0);
            } else if (value == 8) {
                intro.transition()
                    .duration(500)
                    .style("opacity", 0);
                dates.transition()
                    .delay(1000)
                    .transition()
                    .delay((d, i) => i * 200)
                    .duration(50)
                    .style("opacity", 1)
                    .style("font-weight", "500");
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
            } else if (value == 9) {
                intro.transition()
                    .duration(500)
                    .style("opacity", 0);
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
            } else if (value == 10) {
                intro.transition()
                    .duration(500)
                    .style("opacity", 0);
                songCurtains.transition()
                    .duration(1000)
                    .style("opacity", 0);
                dates.transition()
                    .duration(0)
                    .style("font-weight", "500")
                    .transition()
                    .duration(1000)
                    .style("opacity", 1);
                stickyScroll.transition()
                    .duration(2000)
                    .style("opacity", 1)
            } else if (value == 11) {
                intro.transition()
                    .duration(500)
                    .style("opacity", 0);
                stickyScroll.transition()
                    .duration(2000)
                    .style("opacity", 0)
            }
        }
    }
    $: if (browser) { handleScroll(value) };
    $: w, calcW(w);
    $: h, calcH(h);
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} bind:scrollY/>

<section id="day-chart">
    <div class="sim-label" style="margin-left: {colW*2+2}px; width: {colW*10-3}px;"><p>Simulations</p></div>
    <div class="song-line-label" style="margin-left: {colW}px; margin-top: {(blockH+1)*134+(blockH+1)*7}px"><p>Each line is a song</p></div>
    <div class="time-label-top"><p>Midnight →</p></div>
    {#each groupedData as indivDate, i}
    <div class="date-block" style="width:{colW}px">
        <p class="date">{@html formatDate(indivDate[0])}</p>
        <div class="song-block">
            {#if i == 0 || i == undefined}
            {#each firstDateData as song, i}
                {#if blockH}
                    <div class="song song-{i} song-{song.b2b_gender} song-{song.b2b_combinedGender} song-{song.gender}" style="height: {blockH}px"></div>
                {/if}
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
        z-index: 998;
    }
    .sim-label {
        position: absolute;
        top: 1.75rem;
        border-top: 1px solid var(--color-country-text);
        border-left: 1px solid var(--color-country-text);
        border-right: 1px solid var(--color-country-text);
        height: 1rem;
        opacity: 0;
    } 
    .sim-label p, .song-line-label p {
        font-family: var(--sans-narrow);
        font-size: var(--14px);
        max-width: 14rem;
    }
    .sim-label p {
        background: var(--color-country-bg);
        font-family: var(--sans-narrow);
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
        font-family: var(--sans-narrow);
        color: var(--color-country-text);
        font-size: var(--14px);
        position: absolute;
        left: -2rem;
        top: 4.125rem;
    }
    .date {
        font-family: var(--sans-narrow);
        text-align: center;
        line-height: 1.25;
        color: var(--color-country-text);
        margin: 0;
        opacity: 0;
        font-size: var(--14px);  
        height: 2.25rem;
        overflow: hidden;
        overflow-wrap: break-word; 
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
        /* height: 2px; */
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
        max-width: 30rem;
        top: 0.25rem;
        left: calc(100% + 0.25rem);
        content: '12:16am: Miranda Lambert "If I Was A Cowboy"';
        font-family: var(--sans-narrow);
        color: var(--color-country-blue);
        font-weight: 700;
        font-size: var(--14px);
        opacity: 0;
    }
    .song-73::after {
        position: absolute;
        width: 30rem;
        max-width: 30rem;
        top: 0.25rem;
        left: calc(100% + 0.25rem);
        content: '4:18am: Carly Pearce & Ashley McBryde "Never Wanted To Be That Girl"';
        font-family: var(--sans-narrow);
        color: var(--color-country-blue);
        font-weight: 700;
        font-size: var(--14px);
        opacity: 0;
    }
    .song-272::after {
        position: absolute;
        width: 30rem;
        max-width: 30rem;
        top: 0.25rem;
        left: calc(100% + 0.25rem);
        content: '5:51pm: Priscilla Block "Just About Over You"';
        font-family: var(--sans-narrow);
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

    @media only screen and (max-width: 800px) {
        .song-4::after, .song-73::after, .song-272::after {
            max-width: 20rem;
            font-size: var(--12px);
        }
        .time-label-top p {
          left: -1.75rem;  
          top: 3.75rem;
          font-size: var(--12px);
        }
        .sim-label p {
            font-size: var(--12px);
            top: -0.5rem;
        }
        .date {
            font-size: var(--12px);
        }
    }
    @media only screen and (max-width: 500px) {
        .date {
            font-size: 10px;
        }
    }
</style>
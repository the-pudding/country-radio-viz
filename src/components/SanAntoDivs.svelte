<script>
    import { csvParse, groups, select, selectAll, timeParse, timeFormat } from "d3";
    import { onMount, tick } from "svelte";
    import { browser } from "$app/environment";
    import Song from "$components/Song.svelte";
    import { fade } from 'svelte/transition'

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
    let b2bMenGroup;
    let b2bMenAll;

    //styles
    let opacity;

    // mounted
    let mountCheck = false;
    let selectorsSet = false;

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
        
        // mounted
        mountCheck = true;
    });

    async function loadData() {
        const response = await fetch(`./assets/data/${startingStation}_withB2B.csv`);
        const text = await response.text();
        const parsed = csvParse(text)
        data = parsed;
        groupedData = groups(data, d => d.date);
        firstDateData = groupedData[0];
        firstDateData = firstDateData[1];
    }

    // function setSelectors() {
    //     allSongBlocks = selectAll(".song");
    //     b2bMenGroup = allSongBlocks.filter((d, i) => i >= 172 && i <= 184).filter(".song-B2Bmen");
    //     b2bMenBeforeGroup = allSongBlocks.filter((d, i) => i < 172).filter(".song-B2Bmen");
    //     b2bMenAll = allSongBlocks.filter((d, i) => i !== 136).filter(".song-B2Bmen")
    //     selectorsSet = true;
    // }
    function calcW(w) { colW = Math.floor((w - padding*1.5)/19); }
    function calcH(h) { blockH = h > 1000 ? 2 : 1; }
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
    function calcShowRow(i, value) {
        if (value == undefined) {
            return 0;
        } else if (value == 5 && i !== 0) {
            return 0;
        } else if (value == 7 && i !== 0) {
            return 0;
        } else if (value == 8 && releaseDateArray.includes(i)) {
            return 0;
        } else if (value == 8 && !releaseDateArray.includes(i)) {
            return 0.75;
        } else if (value >= 9) {
            return 0
        } else { return 1 }
    }
    function calcShowDate(i, value) {
        if (value == undefined) {
            return 0;
        } else if (value == 6 && i == 0) {
            return 1;
        } else if (value == 7) {
            return 1;
        } else if (value == 8 && releaseDateArray.includes(i)) {
            return 1;
        } else if (value == 8 && !releaseDateArray.includes(i)) {
            return 0.5;
        } else if (value >= 9) {
            return 1;
        } else { return 0 }
    }
    function calcBoldDate(i, value) {
        if (value == 6 && i == 0) {
            return 500;
        } else if (value == 7) {
            return 500;
        } else if (value == 8 && releaseDateArray.includes(i)) {
            return 600;
        } else if (value == 8 && !releaseDateArray.includes(i)) {
            return 500;
        } else if (value >= 9 || value == undefined) {
            return 500;
        } else { return 500 }
    }
    function calcBlockDelay(i, value) {
        if (value == 5 & scrollDir !== "up" || value == 7 && scrollDir !== "up") {
            return `opacity 0s ${i*0.125}s`
        } else if (i == 0) {
            return `opacity 1s`
        } else {
            return `opacity 0.5s`
        }
    }
    function recolorBlocks(value) {
        if (value < 2) {
            allSongBlocks = selectAll(".song");
            if (value == 1 && scrollDir == "up") {
                b2bMenAll = allSongBlocks.filter((d, i) => i == 136)
                    .transition()
                    .duration(500)
                    .style("background-color", "#e1d4ca");
            }
            allSongBlocks = selectAll(".song");
            b2bMenAll = allSongBlocks.filter((d, i) => i !== 136).filter(".song-B2Bmen")
                .transition()
                .duration(500)
                .style("background-color", "#e1d4ca");
            b2bMenGroup = allSongBlocks.filter((d, i) => i >= 172 && i <= 184).filter(".song-B2Bmen")
                .transition()
                .duration(500)
                .style("background-color", "#A18D7E");
        } else if (value == 2) {
            allSongBlocks = selectAll(".song");
            b2bMenAll = allSongBlocks.filter(".song-B2Bmen")
                .transition()
                .duration(500)
                .style("background-color", "#A18D7E");
        }
    }

    $: scrollY, checkScrollY(scrollY)
    $: w, calcW(w);
    $: h, calcH(h);
    $: value, recolorBlocks(value);

</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} bind:scrollY/>

<section id="day-chart">
    {#if value == 5}
        <div in:fade={{duration: 250, delay: 1500}} out:fade={{duration: 500}} class="sim-label" style="margin-left: {colW*2+2}px; width: {colW*10-3}px;"><p>Simulations</p></div>
    {/if}
    {#if value == 1}
        <div in:fade={{duration: 250, delay: 2000 }} out:fade={{duration: 250, delay: 250}} class="song-line-label" style="margin-left: {colW}px; margin-top: {(blockH+1)*134+(blockH+1)*7}px"><p>Each line is a song</p></div>
    {/if}
    {#if value >= 4}
        <div in:fade={{duration: 250, delay: 500}} out:fade={{duration: 500}} class="time-label-top"><p>Midnight →</p></div>
    {/if}
    {#each groupedData as indivDate, i}
    {@const showRow = calcShowRow(i, value)}
    {@const showDate = calcShowDate(i, value)}
    {@const fontWeight = calcBoldDate(i, value)}
    <div class="date-block" style="width:{colW}px">
            <p class="date" style="opacity: {showDate}; transition: {calcBlockDelay(i, value)}; font-weight:{fontWeight}">{@html formatDate(indivDate[0])}</p>
        <div class="song-block" style="opacity: {showRow}; transition: {calcBlockDelay(i, value)}">
            {#if i == 0 || i == undefined}
            {#each firstDateData as song, i}
                <!-- <SpecialSong value></SpecialSong> -->
                <!-- <Song {first} {hightlight}/>
                {#if i === 136}
                    <div style:left={left136}></div>
                {/if} -->
                {#if blockH}
                    <Song {i} songClass={song.b2b_gender} songHeight={blockH} {value} {w} />
                    <!-- <div class="song song-{i} song-{song.b2b_gender} song-{song.b2b_combinedGender} song-{song.gender}" style="height: {blockH}px"></div> -->
                {/if}
            {/each}
            {/if}
        </div>
    </div>
    {/each}
</section>

<style>
    #day-chart {
        overflow-x: hidden;
    }
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
    }
    .time-label-top p {
        transform: rotate(-90deg);
        font-family: var(--sans-narrow);
        color: var(--color-country-text);
        font-size: var(--14px);
        position: absolute;
        left: -1.75rem;
        top: 5rem;
        margin: 0;
        padding: 0;
    }
    .date {
        font-family: var(--sans-narrow);
        text-align: center;
        line-height: 1.25;
        color: var(--color-country-text);
        margin: 0;
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
    .song-block.visible-true {
        opacity: 0;
    }
    .show-label::after  {
        opacity: 1;
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
    .first-song {
        background: var(--color-country-brown);
        width: 100%;
        height: 2px;
        position: relative;
    }

    @media only screen and (max-width: 800px) {
        .song-4::after, .song-73::after, .song-272::after {
            max-width: 15rem;
            font-size: var(--12px);
        }
        .time-label-top p {
          left: -1.25rem;  
          top: 4.75rem;
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
<script>
    import Canvas from "$components/Canvas.svelte";
    import Rect from "$components/Canvas.Rect.svelte";
    import { fade } from 'svelte/transition';
    import { onMount } from "svelte";
    import { csvParse, groups } from "d3";
    import { browser } from "$app/environment";

    let innerWidth;
	let innerHeight;
    let data = [];
    let firstDateData = [];
    let groupedData = [];
    let colW;
    let padding = 32;
    let visible = false;
    let top;

    export let startingStation;
    export let value;
    export let blockH;
    export let spacingX;
    export let spacingY;
    export let posType;

    onMount(async () => {
        calcW(innerWidth);
        calcH(innerHeight);
    })

    async function fetchData() {
        const response = await fetch(`./assets/data/${startingStation}_withB2B.csv`);
        const text = await response.text();
        const parsed = csvParse(text)
        data = parsed;
        groupedData = groups(data, d => d.date);
        firstDateData = groupedData[0];
        firstDateData = firstDateData[1]
    }

    if (posType == "absolute") { 
        top = "3.5rem" } 
        else { top = "0" }

    function calcW(innerWidth) {
        colW = Math.floor((innerWidth - padding*1.5)/19);
    }
    function calcH(innerHeight) {
        blockH = innerHeight > 1000 ? 3 : 2;
    }
    function changeVisibility(value) {
        if (value > 4 || value == "Gender" || value == "Race" || value == "Sexual Orientation") {
            visible = true;
        } else {
            visible = false;
        }
    }

    function returnFillClasses(value, song) {
        let fillColor;
        if (value < 7 || value == "Gender") { 
            fillColor = song.b2b_gender;
            return fillColor;
        }
        else if (value >= 7) { 
            fillColor = song.b2b_combinedGender; 
            return fillColor;
        }
        else if (value == "Race") { return song.b2b_raceGender }
        else if (value == "Sexual Orientation") { return song.b2b_lgbtq  }
        else { return song.b2b_gender }
    }

    $: if (browser) fetchData(startingStation);

    $: value, changeVisibility(value);
    $: innerWidth, calcW(innerWidth);
    $: innerHeight, calcH(innerHeight);
</script>


<section bind:clientWidth={innerWidth} bind:clientHeight={innerHeight} class="canvas-chart" style="position: {posType}; top: {top}">
    {#if innerHeight && innerWidth}
        {#if visible && value}
        <div class="canvas-container" transition:fade>
            <Canvas height={innerHeight} width={innerWidth}>
                {#each groupedData as indivDate, i}
                    {@const groupPos = i}
                    {#each indivDate[1] as song, i}
                        {@const fill = returnFillClasses(value, song)}
                            <Rect x1={groupPos*colW} y1={i*blockH} x2={colW-spacingX} y2={blockH-spacingY} {fill} value={value}/>
                        {/each}
                {/each}
            </Canvas>
        </div>
        {/if}
    {/if}
</section>

<style>
    section {
        height: 100vh;
        min-height: 800px;
        width: 100%;
        padding: 0 1rem;
        display: flex;
        flex-direction: row;
        overflow-x: hidden;
    }

    .canvas-container {
        width: calc(100% - 1.25rem);
        margin-left: 1.25rem;
        height: 100%;
    }
</style>
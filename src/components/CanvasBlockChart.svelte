<script>
    import Canvas from "$components/Canvas.svelte";
    import Rect from "$components/Canvas.Rect.svelte";
    import { fade } from 'svelte/transition';
    import { onMount } from "svelte";
    import * as d3 from "d3";
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
    let map;

    export let startingStation;
    export let value;
    export let blockH;
    export let spacingX;
    export let spacingY;
    export let posType;

    onMount(async () => {
        calcW(innerWidth);
    })

    async function fetchData() {
        const response = await fetch(`assets/${startingStation}_withB2B.csv`);
        const text = await response.text();
        const parsed = d3.csvParse(text)
        data = parsed;
        groupedData = d3.groups(data, d => d.date);
        firstDateData = groupedData[0];
        firstDateData = firstDateData[1]
    }

    if (posType == "absolute") { top = "3.5rem" } 
        else { top = "0" }

    function calcW(innerWidth) {
        colW = Math.floor((innerWidth - padding*1.5)/19);
    }
    function changeVisibility(value) {
        if (value > 6) {
            visible = true;
        } else {
            visible = false;
        }
    }

    function changeMap() {
        map = d3.select('#map-container');
        let cityName = startingStation.split("_")[0];
        let allDots = map.selectAll(`g path`).filter((d,i) => i !== 0).style("fill", "#78695E");
        let mapOutline = map.selectAll(`#Layer_1 path`).style("fill", "#F6EFE9")  
        let cityDot = map.selectAll(`#${cityName} path`).style("fill", "#3460E5");
    }

    $: if (browser) changeMap(startingStation);

    $: if (browser) fetchData(startingStation);

    $: value, changeVisibility(value);
    $: innerWidth, calcW(innerWidth);
</script>

<section bind:clientWidth={innerWidth} bind:clientHeight={innerHeight} id="canvas-chart" style="position: {posType}; top: {top}">
    {#if innerHeight && innerWidth}
        {#if visible}
        <div class="canvas-container" transition:fade>
            <Canvas height={innerHeight} width={innerWidth}>
                {#each groupedData as indivDate, i}
                    {@const groupPos = i}
                    {#each indivDate[1] as song, i}
                        {@const fill = value < 9 ? song.b2b_gender : song.b2b_combinedGender}
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
        width: 100%;
        padding: 0 1rem;
        display: flex;
        flex-direction: row;
    }

    .canvas-container {
        width: calc(100% - 1.25rem);
        margin-left: 1.25rem;
        height: 100%;
    }
</style>
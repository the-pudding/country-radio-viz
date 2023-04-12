<script>
    import Canvas from "$components/Canvas.svelte";
    import Rect from "$components/Canvas.Rect.svelte";
    import { fade } from 'svelte/transition';
    import { onMount } from "svelte";
    import * as d3 from "d3";

    let innerWidth;
	let innerHeight;
    let data = [];
    let firstDateData = [];
    let groupedData = [];
    let colW;
    let colWCSS;
    let padding = 32;
    let visible = false;
    const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

    export let startingStation;
    export let value;
    export let blockH;
    export let spacingX;
    export let spacingY;

    onMount(async () => {
        const response = await fetch(`./assets/${startingStation}_1_7_22.csv`);
        const text = await response.text();
        const parsed = d3.csvParse(text)
        data = parsed;
        groupedData = d3.groups(data, d => d.version);
        // firstDateData = groupedData[0];
        // firstDateData = firstDateData[1]
        colW = Math.floor((innerWidth - padding)/19);
        colWCSS = `${colW}px`
        }
    )

    function checkBetween(x, min, max) {
        return x >= min && x <= max;
    }

    function changeVisibility(value) {
        if (checkBetween(value, 4, 6)) {
            visible = true;
        } else {
            visible = false;
        }
    }

    // function handleMouseOver(e) {
    //     console.log("working")
    // }

    $: value, changeVisibility(value);
</script>

<section bind:clientWidth={innerWidth} bind:clientHeight={innerHeight} id="representative-chart">
    {#if innerHeight && innerWidth}
    <!-- <div class="screen-container">
        {#each cols as col, i}
        <div class="screen-block" style="width:{colW}px"></div>
        {/each}
    </div> -->
        {#if visible}
        <div class="canvas-container" transition:fade>
            <Canvas height={innerHeight} width={innerWidth}>
                {#each groupedData as indivDate, i}
                {@const groupPos = i}
                    {#each indivDate[1] as song, i}
                        {@const fill = song.value}
                            <Rect x1={groupPos*colW+colW+colW} y1={i*blockH} x2={colW-spacingX} y2={blockH-spacingY} {fill} value={value}/>
                    {/each}
                {/each}
            </Canvas>
        </div>
        {/if}
    {/if}
</section>

<style>
    section {
        position: absolute;
        top: 2.45rem;
        height: 100vh;
        width: 100%;
        margin: 1.25rem 0 0 0;
        padding: 1rem;
    }

    .screen-container {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1000;
        display: flex;
        flex-direction: row;
    }

    .screen-block {
        padding-right: 2px;
        background: var(--color-country-bg);
    }

    .canvas-container {
        position: absolute;
        width: 100%;
        height: 100%;
    }
</style>
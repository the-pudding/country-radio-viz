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
    let padding = 32;
    let visible = false;

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
        console.log(data)
        groupedData = d3.groups(data, d => d.version);
        console.log(groupedData)
        // firstDateData = groupedData[0];
        // firstDateData = firstDateData[1]
        colW = (innerWidth - padding)/19;
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

<section bind:clientWidth={innerWidth} bind:clientHeight={innerHeight}>
    {#if innerHeight && innerWidth}
        {#if visible}
        <div class="canvas-container" transition:fade>
            <Canvas height={innerHeight} width={innerWidth}>
                {#each groupedData as indivDate, i}
                {@const groupPos = i}
                    {#each indivDate[1] as song, i}
                        {@const fill = song.value}
                            <Rect x1={groupPos*colW+colW} y1={i*blockH} x2={colW-spacingX} y2={blockH-spacingY} {fill} value={value}/>
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
        height: 100vh;
        width: 100%;
        margin: 1.25rem 0 0 0;
        padding: 1rem;
    }

    .canvas-container {
        width: 100%;
        height: 100%;
    }
</style>
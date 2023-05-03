<script>
    import * as d3 from "d3";
    import simulationData from "$data/simulationData.csv";
    import { onMount, tick } from "svelte";
    
    let groupedData = d3.groups(simulationData, d => d.station);
    
    let innerWidth;

    onMount(async() => {
        await tick();
        console.log(innerWidth)
    })

    $: innerWidth, console.log(innerWidth);
</script>

<section id="histograms">
    {#each groupedData as station, i}
    <div class="station-histo">
        <div class="bar-wrapper">
                {#each station[1] as bins, i}
                <div class="bin" style="height: {bins.count/400*100}%">
                    {#if i % 10 == 0}
                        <p>{bins.bin.split("bin")[1]}</p>
                    {/if}
                </div>
                {/each}
            </div>
        <div class="obs" style="left: {station[1][0].obs/225*100}%">
            <p>{station[1][0].obs}</p>
        </div>
        <h5>{@html station[1][0].city} <br>({station[1][0].station})</h5>
    </div>
    {/each}
    <div class="gradient"></div>
    <button>Show more</button>
</section>

<style> 
    #histograms {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        max-width: 60rem;
        margin: 0 auto;
        max-height: 400px;
        overflow-y: hidden;
    }
    .station-histo {
        display: flex;
        flex-direction: row;
        width: calc(33% - 1rem);
        flex-wrap: wrap;
        margin: 0 0.5rem;
        position: relative;
    }
    .bar-wrapper {
        width: 100%;
        height: 200px;
        display: flex;
        flex-direction: row;
        justify-content: end;
        align-items: end;
        border-bottom: 1px solid var(--color-country-text);
    }
    .obs {
        position: absolute;
        height: 150px;
        border-left: 2px solid var(--color-country-blue);
        top: 50px;
    }
    .obs p {
        color: var(--color-country-blue);
        font-weight: 700;
        position: absolute;
        top: -1.5rem;
        left: -0.275rem;
        margin: 0;
        padding: 0;
        text-align: center;
    }
    .bin {
        width: calc(29% - 0.1rem);
        margin: 0 0.05rem;
        background: var(--color-country-tan);
        position: relative;
    }
    .bin p {
        position: absolute;
        font-size: var(--12px);
        bottom: -1.5rem;
        margin: 0;
        padding: 0;
    }
    h5 {
        font-weight: 700;
        width: 100%;
        text-align: center;
        padding: 1rem 0 0 0;
    }
</style>
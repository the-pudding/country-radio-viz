<script>
    import * as d3 from "d3";
    import { ascending, groups, select } from "d3";
    import simulationData from "$data/simulationData.csv";
    import { onMount, tick } from "svelte";
    
    let groupedData = groups(simulationData, d => d.station).sort((a, b) => ascending(a[1][0].city, b[1][0].city));
    
    let innerWidth;
    let histSection;
    let gradient;
    let button;
    let hidden = true;

    onMount(async() => {
        await tick();
        histSection = select("#histograms")
        gradient = select(".gradient")
    })

    function showCharts() {
        hidden = !hidden;
    }
</script>

<section id="histograms" style="height:{hidden ? '575px' : 'auto'}; overflow-y:{hidden ? 'hidden' : 'visble'}">
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
        <div class="obs" style="left: {station[1][0].obs/230*100}%">
            <p>{station[1][0].obs}</p>
        </div>
        <h5>{@html station[1][0].city} ({station[1][0].station})</h5>
    </div>
    {/each}
    <div class="gradient" style="opacity:{hidden ? '1' : '0'}"></div>
    <button on:click={showCharts}>
        {#if hidden}
            <p>Show more</p>
        {:else}
            <p>Show fewer</p>
        {/if}
    </button>
</section>

<style> 
    #histograms {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        max-width: 60rem;
        margin: 2rem auto 5rem auto;
        height: 600px;
        overflow-y: hidden;
        position: relative;
        justify-content: center;
        padding: 0 0 4rem 0;
    }
    .station-histo {
        display: flex;
        flex-direction: row;
        width: calc(20% - 1rem);
        flex-wrap: wrap;
        margin: 0 0.5rem;
        position: relative;
        min-width: 150px;
    }
    .bar-wrapper {
        width: 100%;
        height: 150px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-end;
        border-bottom: 1px solid var(--color-country-text);
    }
    .obs {
        position: absolute;
        height: 100px;
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
        font-size: var(--14px);
    }
    .gradient {
        width: 100%;
        height: 5rem;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 999;
        background-image: linear-gradient(180deg, rgba(246, 239, 233, 0), rgba(246, 239, 233, 1));
    }
    button {
        position: absolute;
        bottom: 0rem;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 1000;
        width: 8rem;
        background: var(--color-country-tan);
        border: 1px solid var(--color-country-text);
    }
    button:hover {
        background: var(--color-country-orange);
    }
    button p {
        margin: 0;
        padding: 0;
        text-transform: uppercase;
        font-size: var(--14px);
    }
</style>
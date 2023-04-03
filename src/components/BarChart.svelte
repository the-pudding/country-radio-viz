<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import summaryData from "$data/summary.csv";

    let sortedData = summaryData.sort((a, b) => d3.descending(a.b2bWomenSongs_PERCENT, b.b2bWomenSongs_PERCENT));
    let innerWidth;
</script>

<section id="bar-chart">
    {#each summaryData as city, i}
        <div class="row row-{city.stationName}" bind:clientWidth={innerWidth}>
            <div class="city-label">{city.cityName}</div>
            {#if innerWidth}
                <div class="bar" style="width: {innerWidth*city.b2bWomenSongs_PERCENT/2}px"></div>
            {/if}
            <div class="value-label">{Math.round(city.b2bWomenSongs_PERCENT*100)/100}%</div>
        </div>
    {/each}
</section>

<style>
    #bar-chart {
        padding: 1rem;
        color: var(--color-country-text);
        position: absolute;
        height: 100vh;
        width: 100%;
    }
    .row {
        display: flex;
        flex-direction: row;
        width: 100%;
        padding: 0.5rem 0;
        justify-content: flex-start;
    }
    .city-label, .value-label {
        font-family: var(--sans);
        margin: 0;
        padding: 0;
    }

    .city-label {
        text-align: right;
        width: 10rem;
        margin: 0 0.5rem 0 0;
    }

    .value-label {
        margin: 0 0 0 0.5rem;
    }

    .row-KCYY-FM .city-label, .row-KCYY-FM .value-label {
        font-weight: 700;
    }

    .bar {
        background: var(--color-country-brown);
    }

    .row-KCYY-FM .bar {
        background: var(--color-country-blue); 
    }
</style>
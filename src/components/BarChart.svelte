<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import summaryData from "$data/summary.csv";

    let sortedData = summaryData.sort((a, b) => d3.descending(a.b2bWomenSongs_PERCENT, b.b2bWomenSongs_PERCENT));
    let innerWidth;

    function formatCityName(cityName) {
        if (cityName == "SanAntonio") { return "San Antonio"}
        else if (cityName == "LosAngeles") { return "Los Angeles"}
        else if (cityName == "KansasCity") { return "Kansas City"}
        else if (cityName == "WashingtonDC") { return "Washington DC"}
        else { return cityName}
    }
</script>

<section id="bar-chart">
    <h4>Percentage of back-to-back women plays by station</h4>
    {#each summaryData as city, i}
        <div class="row row-{city.stationName}" bind:clientWidth={innerWidth}>
            <div class="city-label">{formatCityName(city.cityName)} ({city.stationName})</div>
            {#if innerWidth}
                <div class="bar bar-{i}" style="width: {innerWidth*city.b2bWomenSongs_PERCENT/2.5}px"></div>
            {/if}
            <div class="value-label">{Math.round(city.b2bWomenSongs_PERCENT*100)/100}%</div>
        </div>
    {/each}
</section>

<style>
    #bar-chart {
        padding: 0;
        color: var(--color-country-text);
        width: 100%;
        margin: 5rem auto;
        max-width: 40rem;
    }
    h4 {
        font-weight: 700;
        font-size: var(--20px);
        color: var(--color-country-text);
        margin: 0 0 2rem 0;
        padding: 0;
    }
    .row {
        display: flex;
        flex-direction: row;
        width: 100%;
        padding: 0.25rem 0;
        justify-content: flex-start;
        border-bottom: 1px solid var(--color-country-tan);
    }
    .city-label, .value-label {
        font-family: var(--sans);
        margin: 0;
        padding: 0;
    }

    .city-label {
        text-align: right;
        width: 12.5rem;
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
        position: relative;
        border-radius: 0.125rem;
    }
    .bar-1::before, .bar-5::before, .bar-8::before, .bar-12::before, .bar-15::before, .bar-17::before,.bar-20::before, .bar-23::before, .bar-25::before, .bar-28::before {
        content: "";
        background-image: url("assets/images/letterpress-texture1.png");
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        opacity: 0.25;
    }
    .bar-2::before, .bar-4::before, .bar-7::before, .bar-10::before, .bar-13::before, .bar-16::before, .bar-19::before, .bar-22::before, .bar-26::before, .bar-29::before {
        content: "";
        background-image: url("assets/images/letterpress-texture2.png");
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        opacity: 0.25;
    }
    .bar-0::before, .bar-3::before, .bar-6::before, .bar-9::before, .bar-11::before, .bar-14::before, .bar-18::before, .bar-21::before, .bar-24::before, .bar-27::before {
        content: "";
        background-image: url("assets/images/letterpress-texture3.png");
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        opacity: 0.25;
    }
    .row-KCYY-FM .bar {
        background: var(--color-country-blue); 
    }
</style>
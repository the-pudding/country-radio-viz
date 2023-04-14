<script>
    import { getContext } from "svelte";
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import summaryData from "$data/summary.csv";
    import Select from "$components/helpers/Select.svelte";
    import usMap from "$svg/us-map.svg";
    import ButtonSet from "$components/helpers/ButtonSet.svelte";
    import CanvasBlockChart from "$components/CanvasBlockChart.svelte";
    import SortTable from "$components/helpers/SortTable.svelte";

    const data = getContext("data");
	const copy = getContext("copy");

    const stations = summaryData.map(d => `${d.stationName}`);
    const dates = ["Jan 7", "Jan 24", "Jan28", "Feb 7", "Feb 25", "Mar 18",
                    "Mar 25", "Apr 8", "Apr 29", "May 20", "May 27", "Jun 13",
                    "June 24", "Jul 29", "Aug 26", "Sep 30", "Oct 28", "Nov 25", "Dec 30"]

    let searchStation;
    let currData;
    let womenStraightALL;
    let womenStraightB2B;
    let menStraightALL;
    let menStraightB2B;
    let mixedStraightALL;
    let mixedStraightB2B;
    let womenLGBTQALL;
    let womenLGBTQB2B;
    let menLGBTQALL;
    let menLGBTQB2B;
    let mixedLGBTQALL;
    let mixedLGBTQB2B;
    let womenWhiteALL;
    let womenWhiteB2B;
    let menWhiteALL;
    let menWhiteB2B;
    let mixedWhiteALL;
    let mixedWhiteB2B;
    let womenPOCALL;
    let womenPOCB2B;
    let menPOCALL;
    let menPOCB2B;
    let mixedPOCALL;
    let mixedPOCB2B;
    let rowsOrientation;
    let rowsRace;
    let columns;
    let value;
    let innerWidth;
    let innerHeight;
    let colW;
    let padding = 32;

    export let startingStation;
    export let blockH;
    export let spacingX;
    export let spacingY;

    const options = [
		{ value: "Gender" },
		{ value: "Race"},
		{ value: "Sexual Orientation" }
	];

    onMount(() => {
        updateData(value);

        colW = Math.floor((innerWidth - padding)/19);
    })

    function updateData(value) {
        currData = summaryData.filter(d => d.stationName == value);

        womenStraightALL = `${Math.round(currData[0].onlyWomenSongs_PERCENT*100)/100}%`;
        womenStraightB2B = `${Math.round(currData[0].b2bWomenSongs_PERCENT*100)/100}%`;
        menStraightALL = `${Math.round(currData[0].onlyMenSongs_PERCENT*100)/100 - Math.round(currData[0].onlyLGBTQSongs_PERCENT*100)/100}%`;
        menStraightB2B = `${Math.round(currData[0].b2bMenSongs_PERCENT*100)/100}%`;
        mixedStraightALL = `${Math.round(currData[0].onlyMixedGenderSongs_PERCENT*100)/100}%`;
        mixedStraightB2B = `${Math.round(currData[0].b2bMixedGenderSongs_PERCENT*100)/100}%`;
        womenLGBTQALL = `${0}%`;
        womenLGBTQB2B = `${0}%`;
        menLGBTQALL = `${Math.round(currData[0].onlyLGBTQSongs_PERCENT*100)/100}%`;
        menLGBTQB2B = `${Math.round(currData[0].b2bLGBTQSongs_PERCENT*100)/100}%`;
        mixedLGBTQALL = `${0}%`;
        mixedLGBTQB2B = `${0}%`;
        womenWhiteALL = `${Math.round(currData[0].onlyWhiteWomenSongs_PERCENT*100)/100}%`;
        womenWhiteB2B = `${Math.round(currData[0].b2bWhiteWomenSongs_PERCENT*100)/100}%`;
        menWhiteALL = `${Math.round(currData[0].onlyWhiteMenSongs_PERCENT*100)/100}%`;
        menWhiteB2B = `${Math.round(currData[0].b2bWhiteMenSongs_PERCENT*100)/100}%`;
        mixedWhiteALL = `${Math.round(currData[0].onlyWhiteMixedGenderSongs_PERCENT*100)/100}%`;
        mixedWhiteB2B = `${Math.round(currData[0].b2bWhiteMixedGenderSongs_PERCENT*100)/100}%`;
        womenPOCALL = `${Math.round(currData[0].onlyPOCWomenSongs_PERCENT*100)/100}%`;
        womenPOCB2B = `${Math.round(currData[0].b2bPOCWomenSongs_PERCENT*100)/100}%`;
        menPOCALL = `${Math.round(currData[0].onlyPOCMenSongs_PERCENT*100)/100}%`;
        menPOCB2B = `${Math.round(currData[0].b2bPOCMenSongs_PERCENT*100)/100}%`;
        mixedPOCALL = `${Math.round(currData[0].onlyPOCMixedSongs_PERCENT*100)/100}%`;
        mixedPOCB2B = `${Math.round(currData[0].b2bPOCMixedSongs_PERCENT*100)/100}%`;

        rowsOrientation = [
            {name: "Women", value1: womenStraightALL, value2: womenStraightB2B, value3: womenLGBTQALL, value4: womenLGBTQB2B, value5: womenWhiteALL, value6: womenWhiteB2B, value7: womenPOCALL, value8: womenPOCB2B},
            {name: "Men", value1: menStraightALL, value2: menStraightB2B, value3: menLGBTQALL, value4: menLGBTQB2B, value5: menWhiteALL, value6: menWhiteB2B, value7: menPOCALL, value8: menPOCB2B},
            {name: "Mixed", value1: mixedStraightALL, value2: mixedStraightB2B, value3: mixedLGBTQALL, value4: mixedLGBTQB2B, value5: mixedWhiteALL, value6: mixedWhiteB2B, value7: mixedPOCALL, value8: mixedPOCB2B},
        ]

        rowsRace = [
            {name: "Women", value1: womenWhiteALL, value2: womenWhiteB2B, value3: womenPOCALL, value4: womenPOCB2B},
            {name: "Men", value1: menWhiteALL, value2: menWhiteB2B, value3: menPOCALL, value4: menPOCB2B},
            {name: "Mixed", value1: mixedWhiteALL, value2: mixedWhiteB2B, value3: mixedPOCALL, value4: mixedPOCB2B},
        ]

        columns = [
            { label: "", prop: "name", sort: false, type: "text" },
            { label: "All songs", prop: "value1", sort: false, type: "text" },
            { label: "B2B songs", prop: "value2", sort: false, type: "text" },
            { label: "All songs", prop: "value3", sort: false, type: "text" },
            { label: "B2B songs", prop: "value4", sort: false, type: "text" },
            { label: "All songs", prop: "value5", sort: false, type: "text" },
            { label: "B2B songs", prop: "value6", sort: false, type: "text" },
            { label: "All songs", prop: "value7", sort: false, type: "text" },
            { label: "B2B songs", prop: "value8", sort: false, type: "text" }
        ];
    }
    if (value) {
        $: updateData(value);
    }
</script>

<section id="dashboard" bind:clientWidth={innerWidth}>
    <h4>Explore the song play demographics from each of the 29 radio stations</h4>
    <div class="details">
        <div class="station-container">
            <div class="left">
                <Select options={stations} bind:value/>
                {#if currData}
                    <p class="city-label">{currData[0].cityName}</p>
                    <p class="owner-label">{currData[0].ownerName}</p>
                {/if}
            </div>
            <div class="right">
                {@html usMap}
            </div>
        </div>
        <div class="table-container">
            <div class="table-block">
                <div class="extra-labels">
                    <p>Straight</p>
                    <p>LGBTQ+</p>
                    <p>White</p>
                    <p>POC</p>
                </div>
                {#if rowsOrientation}
                    <SortTable  rows={rowsOrientation} columns={columns}/>
                {/if}
            </div>
            <p class="note">{@html copy.methodsNote[0].text}</p>
            <!-- <div class="table-block">
                <div class="extra-labels">
                    <p>White</p>
                    <p>POC</p>
                </div>
                {#if rowsRace}
                    <SortTable  rows={rowsRace} columns={columns}/>
                {/if}
            </div> -->
        </div>
    </div>
    <!-- <div class="chart-type">
        <p>Show data by</p>
        <ButtonSet options={options}/>
    </div> -->
    <div class="chart-container">
        <div class="date-row">
            {#each dates as day, i}
                <p style="width: {colW}px">{day}</p>
            {/each}
        </div>
        <div class="time-label-top"><p>Midnight →</p></div>
        <CanvasBlockChart startingStation={startingStation} value={7} blockH={blockH} spacingX={spacingX} spacingY={spacingY} posType="relative"/>
    </div>
</section>

<style>
    #dashboard {
        font-family: var(--sans);
        color: var(--color-country-text);
        width: 100%;
        padding: 0;
        margin: 5rem 0;
    }

    h4 {
        margin: 1rem;
        border-bottom: 1px solid var(--color-country-tan);
        font-size: var(--20px);
        color: var(--color-country-text);
        font-weight: 700;
        text-align: center;
        padding: 0 0 0.5rem 0;
    }

    .details {
        display: flex;
        flex-direction: row;
        margin: 2rem 0;
    }

    .station-container {
        display: flex;
        flex-direction: column;
        width: 20rem;
        justify-content: space-between;
        padding: 0 3rem 0 1rem;
        
    }

    .city-label {
        font-size: var(--24px);
        margin: 1rem 0 0 0;
    }

    .owner-label {
        color: var(--color-country-brown);
        margin: 0;
    }

    .right {
        max-width: 14rem;
    }

    .chart-type {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .chart-type p {
        margin: 0 0.5rem 0 0;
        padding: 0 1rem;
    }

    .table-container {
        width: calc(100% - 20rem);
        display: flex;
        flex-direction: column;
        padding: 0 1rem;
    }
    .note {
        font-size: var(--14px);
        font-style: italic;
    }
    .table-block {
        width: 100%;
    }
    .extra-labels {
        width: 100%;
        display: flex;
        flex-direction: row;
        padding: 0 0 0 5rem;
    }
    .extra-labels p {
        width: 100%;
        text-align: center;
        font-size: var(--16px);
        text-transform: uppercase;
        margin: 0.5rem;
        color: var(--color-country-brown);
    }
    .date-row {
        width: 100%;
        display: flex;
        flex-direction: row;
        font-size: var(--14px);
        color: var(--color-country-text);
        text-align: center;
        padding: 0 1rem;
        margin-left: 1.25rem;
    }
    .date-row p {
        margin: 0;
    }
    .chart-container {
        position: relative;
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
        font-family: var(--sans);
        color: var(--color-country-text);
        font-size: var(--14px);
        position: absolute;
        left: -1rem;
        top: 2rem;
    }
    :global(.right svg) {
        width: 100%;
        height: 100%;
    }

    :global(.right svg #SanAntonio path) {
        fill: var(--color-country-blue);
    }
</style>
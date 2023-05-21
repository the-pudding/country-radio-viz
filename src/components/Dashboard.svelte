<script>
    import { getContext } from "svelte";
    import { onMount } from "svelte";
    import summaryData from "$data/summary.csv";
    import Select from "$components/helpers/Select.svelte";
    import usMap from "$svg/us-map.svg";
    import CanvasBlockChart from "$components/CanvasBlockChart.svelte";
    import SortTable from "$components/helpers/SortTable.svelte";
    import ButtonSet from "$components/helpers/ButtonSet.svelte";
    import { browser } from "$app/environment";
    import { select } from "d3";

    const data = getContext("data");
	const copy = getContext("copy");

    function formatCityName(cityName) {
        if (cityName == "SanAntonio") { return "San Antonio"}
        else if (cityName == "LosAngeles") { return "Los Angeles"}
        else if (cityName == "KansasCity") { return "Kansas City"}
        else if (cityName == "WashingtonDC") { return "Washington DC"}
        else { return cityName}
    }

    const stations = summaryData.map(d => `${formatCityName(d.cityName)} (${d.stationName})`).sort();

    const dates = ["Jan<br>7", "Jan<br>24", "Jan<br>28", "Feb<br>7", "Feb<br>25", "Mar<br>18",
                    "Mar<br>25", "Apr<br>8", "Apr<br>29", "May<br>20", "May<br>27", "Jun<br>13",
                    "Jun<br>24", "Jul<br>29", "Aug<br>26", "Sep<br>30", "Oct<br>28", "Nov<br>25", "Dec<br>30"];

    const options = [
		{ value: "Gender" },
		{ value: "Race"},
		{ value: "Sexual Orientation" }
	];


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
    let buttonVal;
    let innerWidth;
    let innerHeight;
    let colW;
    let padding = 32;
    let startingStation;
    let map;
    
    export let blockH;
    export let spacingX;
    export let spacingY;

    onMount(() => {
        updateTableData(value);
        calcW(innerWidth);
    })

    function calcW(innerWidth) {
        colW = Math.floor((innerWidth - padding*1.5)/19);
    }

    function showLessThan(number){
        if (number < 0.05 && number !== 0) {
            return "<0.1";
        } else {
            return Math.round(number).toFixed(1);
        }
    }

    function updateTableData(value) {  
        let stationName = value.split("(")[1];
        stationName = stationName.split(")")[0];
        currData = summaryData.filter(d => d.stationName == stationName);

        startingStation = `${currData[0].cityName}_${currData[0].stationName}`

        womenStraightALL = `${(Math.round(currData[0].onlyWomenSongs_PERCENT*100)/100).toFixed(1)}%`;
        womenStraightB2B = `${showLessThan(currData[0].b2bWomenSongs_PERCENT*100/100)}%`;
        menStraightALL = `${(Math.round(currData[0].onlyMenSongs_PERCENT*100 - currData[0].onlyLGBTQSongs_PERCENT*100)/100).toFixed(1)}%`;
        menStraightB2B = `${showLessThan(currData[0].b2bMenSongs_PERCENT*100/100)}%`;
        mixedStraightALL = `${(Math.round(currData[0].onlyMixedGenderSongs_PERCENT*100)/100).toFixed(1)}%`;
        mixedStraightB2B = `${showLessThan(currData[0].b2bMixedGenderSongs_PERCENT*100/100)}%`;
        womenLGBTQALL = `0.0%`;
        womenLGBTQB2B = `0.0%`;
        menLGBTQALL = `${(Math.round(currData[0].onlyLGBTQSongs_PERCENT*100)/100).toFixed(1)}%`;
        menLGBTQB2B = `${showLessThan(currData[0].b2bLGBTQSongs_PERCENT*100/100)}%`;
        mixedLGBTQALL = `0.0%`;
        mixedLGBTQB2B = `0.0%`;
        womenWhiteALL = `${(Math.round(currData[0].onlyWhiteWomenSongs_PERCENT*100)/100).toFixed(1)}%`;
        womenWhiteB2B = `${showLessThan(currData[0].b2bWhiteWomenSongs_PERCENT*100/100)}%`;
        menWhiteALL = `${(Math.round(currData[0].onlyWhiteMenSongs_PERCENT*100)/100).toFixed(1)}%`;
        menWhiteB2B = `${showLessThan(currData[0].b2bWhiteMenSongs_PERCENT*100/100)}%`;
        mixedWhiteALL = `${(Math.round(currData[0].onlyWhiteMixedGenderSongs_PERCENT*100)/100).toFixed(1)}%`;
        mixedWhiteB2B = `${showLessThan(currData[0].b2bWhiteMixedGenderSongs_PERCENT*100/100)}%`;
        womenPOCALL = `${(Math.round(currData[0].onlyPOCWomenSongs_PERCENT*100)/100).toFixed(1)}%`;
        womenPOCB2B = `${showLessThan(currData[0].b2bPOCWomenSongs_PERCENT*100/100)}%`;
        menPOCALL = `${(Math.round(currData[0].onlyPOCMenSongs_PERCENT*100)/100).toFixed(1)}%`;
        menPOCB2B = `${showLessThan(currData[0].b2bPOCMenSongs_PERCENT*100/100)}%`;
        mixedPOCALL = `${(Math.round(currData[0].onlyPOCMixedSongs_PERCENT*100)/100).toFixed(1)}%`;
        mixedPOCB2B = `${showLessThan(currData[0].b2bPOCMixedSongs_PERCENT*100/100)}%`;

        rowsOrientation = [
            {name: "Women", value1: womenStraightALL, value2: womenStraightB2B, value3: womenLGBTQALL, value4: womenLGBTQB2B},
            {name: "Men", value1: menStraightALL, value2: menStraightB2B, value3: menLGBTQALL, value4: menLGBTQB2B},
            {name: "Mixed", value1: mixedStraightALL, value2: mixedStraightB2B, value3: mixedLGBTQALL, value4: mixedLGBTQB2B}
        ]

        rowsRace = [
            {name: "Women", value1: womenWhiteALL, value2: womenWhiteB2B, value3: womenPOCALL, value4: womenPOCB2B},
            {name: "Men", value1: menWhiteALL, value2: menWhiteB2B, value3: menPOCALL, value4: menPOCB2B},
            {name: "Mixed", value1: mixedWhiteALL, value2: mixedWhiteB2B, value3: mixedPOCALL, value4: mixedPOCB2B}
        ]

        columns = [
            { label: "", prop: "name", sort: false, type: "text" },
            { label: "All songs", prop: "value1", sort: false, type: "text" },
            { label: "B2B songs", prop: "value2", sort: false, type: "text" },
            { label: "All songs", prop: "value3", sort: false, type: "text" },
            { label: "B2B songs", prop: "value4", sort: false, type: "text" }
        ];
    }

    function changeMap() {
        if (startingStation){
            map = select('#map-container');
            let cityName = startingStation.split("_")[0];
            let allDots = map.selectAll(`#dots g circle`).filter((d,i) => i !== 0).style("fill", "#78695E").attr("r", 8.5);
            let cityDot = map.selectAll(`#${cityName}`);
            cityDot.raise();
            cityDot.select("circle").transition()
                .duration(250)
                .style("fill", "#3460E5")
                .attr("r", 10.5);
        }
    }

    $: if (value) { updateTableData(value); }
    $: if (browser) changeMap(startingStation);
    $: innerWidth, calcW(innerWidth);
</script>

<section id="dashboard" bind:clientWidth={innerWidth} bind:clientHeight={innerHeight}>
    <h4>Explore the back-to-back song demographics for each of the 29 radio stations</h4>
    <div class="details">
        <div class="station-container">
            <div class='map-dropdown-wrapper'>
                <div class="left">
                    <Select options={stations} bind:value/>
                    {#if currData}
                        <!-- <p class="city-label">{formatCityName(currData[0].cityName)}</p> -->
                        <p class="owner-label">Owner: {currData[0].ownerName}</p>
                    {/if}
                </div>
                <div class="right" id="map-container">
                    <img class="overlay" alt="letterpress texture" style="opacity:0.25" src="assets/images/letterpress-texture1.png">
                    {@html usMap}
                </div>
            </div>
            <div class="chart-type">
                <div class="button-wrapper">
                    <p class="label">Show data by</p>
                    <ButtonSet {options} bind:buttonVal/>
                </div>
                {#if buttonVal == "Gender"}
                    <div class="key">
                        <p class="blue-line">Women artists back-to-back</p>
                        <p class="brown-line">Men artists back-to-back</p>
                        <p class="orange-line">Mixed-gender artists back-to-back</p>
                        <p class="tan-line">Not a back-to-back</p>
                    </div>
                {:else if buttonVal =="Race"}
                    <div class="key">
                        <p class="blue-line">Artists of color back-to-back</p>
                        <p class="brown-line">White artists back-to-back</p>
                        <p class="tan-line">Not a back-to-back</p>
                    </div>
                {:else}
                    <div class="key">
                        <p class="blue-line">LGBTQ+ artists back-to-back</p>
                        <p class="brown-line">Straight artists back-to-back</p>
                        <p class="tan-line">Not a back-to-back</p>
                    </div>
                {/if}
            </div>
        </div>
        <div class="table-container">
            <div class="table-wrapper">
                <div class="table-block">
                    <div class="extra-labels">
                        <p>Straight Artists</p>
                        <p>LGBTQ+ Artists</p>
                    </div>
                    {#if rowsOrientation}
                        <SortTable  rows={rowsOrientation} columns={columns}/>
                    {/if}
                </div>
                <div class="table-block">
                    <div class="extra-labels">
                        <p>White Artists</p>
                        <p>Artists of Color</p>
                    </div>
                    {#if rowsRace}
                        <SortTable  rows={rowsRace} columns={columns}/>
                    {/if}
                </div>
            </div>
            <p class="note">{@html copy.dashNote[0].text}</p>
        </div>
    </div>
    <div class="chart-container">
        <div class="date-row">
            {#each dates as day, i}
                <p style="width: {colW}px">{@html day}</p>
            {/each}
        </div>
        <div class="time-label-top"><p>Midnight →</p></div>
        <img class="overlay" alt="letterpress texture" src="assets/images/letterpress-texture2.png">
        {#if startingStation && buttonVal}
            <CanvasBlockChart startingStation={startingStation} value={buttonVal} blockH={blockH} spacingX={spacingX} spacingY={spacingY} posType="relative"/>
        {/if}
    </div>
</section>

<style>
    #dashboard {
        font-family: var(--sans);
        color: var(--color-country-text);
        width: 100%;
        padding: 0;
        margin: 5rem 0;
        overflow-x: hidden;
    }
    .overlay {
		position: absolute;
		width: 100%;
		height: 100vh;
		z-index: 1000;
		opacity: 0.15;
	}
    h4 {
        margin: 1rem;
        font-family: var(--sans-narrow);
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
        margin: 2rem auto;
        max-width: 80rem;
    }

    .station-container {
        display: flex;
        flex-direction: column;
        width: 18rem;
        justify-content: start;
        padding: 0 2rem 0 1rem; 
    }
    .map-dropdown-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .owner-label {
        color: var(--color-country-text);
        font-family: var(--sans-narrow);
        margin: 1rem 0 0 0;
    }
    .chart-type .label {
        font-family: var(--sans-narrow);
        color: var(--color-country-dark-brown);
        font-size: var(--14px);
        margin: 0.5rem 0 0.5rem 0;
    }
    .blue-line, .orange-line, .brown-line, .tan-line {
        position: relative;
        margin: 0 0 0 1.75rem;
        font-size: var(--14px);
        font-family: var(--sans-narrow);
    }
    .blue-line::before {
        content: "";
        width: 1.5rem;
        height: 0.25rem;
        background: var(--color-country-blue);
        position: absolute;
        left: -1.75rem;
        top: 0.5rem;
    }
    .orange-line::before {
        content: "";
        width: 1.5rem;
        height: 0.25rem;
        background: var(--color-country-orange);
        position: absolute;
        left: -1.75rem;
        top: 0.5rem;
    }
    .brown-line::before {
        content: "";
        width: 1.5rem;
        height: 0.25rem;
        background: var(--color-country-brown);
        position: absolute;
        left: -1.75rem;
        top: 0.5rem;
    }
    .tan-line::before {
        content: "";
        width: 1.5rem;
        height: 0.25rem;
        background: var(--color-country-tan);
        position: absolute;
        left: -1.75rem;
        top: 0.5rem;
    }
    .right {
        max-width: 14rem;
    }
    .table-container {
        width: calc(100% - 18rem);
        display: flex;
        flex-direction: column;
        padding: 0 1rem;
    }
    .table-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .note {
        font-size: var(--14px);
        font-style: italic;
        font-family: var(--sans-narrow);
        color: var(--color-country-dark-brown); 
    }
    .table-block {
        width: 100%;
    }
    .table-block:first-of-type {
        padding: 0 0 2rem 0;
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
        margin: 0 0.5rem 0.5rem 0.5rem;
        color: var(--color-country-dark-brown);
        font-family: var(--sans-narrow);
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
        font-family: var(--sans-narrow);
    }
    .chart-container {
        position: relative;
    }
    .time-label-top {
        position: absolute;
        top: 0.75rem;
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
        left: -1rem;
        top: 2.25rem;
    }
    :global(.right svg) {
        width: 100%;
        height: 100%;
        margin: 0;
    }

    :global(.right svg #SanAntonio path) {
        fill: var(--color-country-blue);
    }
    .right .overlay {
        width: 100%;
        max-height: 10rem;
    }
    @media only screen and (max-width: 800px) {
        .date-row p {
            font-size: var(--12px);
        }
        .details {
            flex-direction: column;
        }
        .station-container {
            width: 100%;
            flex-direction: column;
            margin: 0 0 2rem 0;
            padding: 0 1rem;
        }
        .map-dropdown-wrapper {
            flex-direction: row;
            padding: 0;
            justify-content: space-between;
        }
        .left {
            width: 50%;
            padding: 0 1rem 0 0;
        }
        .right {
            width: 50%;
            max-width: none;
        }
        .right .overlay {
            width: 100%;
            max-height: 12rem;
        }
        .table-container {
            width: 100%;
        }
        :global(.right svg) {
            margin: -1rem 0 0 0;
        }
        .chart-type {
            display: flex;
            flex-direction: column;
            width: 100%;
            margin: -4.5rem 0 0 0;
        }
        .chart-type .label {
            margin: 0 0 0.5rem 0;
            width: 5.5rem;
            padding: 0.125rem 0 0 0;
        }
        .button-wrapper {
            display: flex;
            flex-direction: column;
            width: 100%;
        }
        .chart-type .key {
            display: flex;
            flex-direction: row;
            width: 100%;
            flex-wrap: wrap;
            font-family: var(--sans-narrow);
            min-height: none;
        }
        .key p {
            width: calc(50% - 2rem);
            font-family: var(--sans-narrow);
        }
        :global(.button-set) {
            max-width: 15rem;
        }
        .time-label-top p {
          left: -0.25rem;  
          top: 1.5rem;
          font-size: var(--12px);
        }
    }
    @media only screen and (max-width: 600px) {
        .date-row p {
            font-size: 10px;
        }
        .extra-labels p, .owner-label {
            font-size: var(--14px);
        }
        .chart-type {
            margin: 0;
        }
        .chart-type .label { 
            font-size: var(--12px);
        }
        .chart-type .key {
            flex-direction: column;
            min-height: 5rem;
        }
        .chart-type .key p {
            width: 100%;
            font-size: var(--12px);
        }
    }
</style>
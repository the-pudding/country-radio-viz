<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import summaryData from "$data/summary.csv";
    import Select from "$components/helpers/Select.svelte";
    import usMap from "$svg/us-map.svg";
    import ButtonSet from "$components/helpers/ButtonSet.svelte";

    const stations = summaryData.map(d => `${d.stationName}`)

    let value;
    let searchStation;
    let currData;

    const options = [
		{ value: "Gender" },
		{ value: "Race"},
		{ value: "Sexual Orientation" }
	];

    onMount(() => {
        updateData(value)
    })

    function updateData(value) {
        currData = summaryData.filter(d => d.stationName == value);
    }
    if (value) {
        $: updateData(value);
    }
</script>

<section id="dashboard">
    <div class="details">
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
        <div class="data-table">
            <p>Gender</p>
            {#if currData}
            <table>
                <tr>
                    <th></th>
                    <th>All</th>
                    <th>B2B</th>
                </tr>
                <tr>
                    <td>Women</td>
                    <td>{Math.round(currData[0].onlyWomenSongs_PERCENT*100)/100}%</td>
                    <td class="table-women">{Math.round(currData[0].b2bWomenSongs_PERCENT*100)/100}%</td>
                </tr>
                <tr>
                    <td>Men</td>
                    <td>{Math.round(currData[0].onlyMenSongs_PERCENT*100)/100}%</td>
                    <td class="table-men">{Math.round(currData[0].b2bMenSongs_PERCENT*100)/100}%</td>
                </tr>
                <tr>
                    <td>Mixed</td>
                    <td>{Math.round(currData[0].onlyMixedGenderSongs_PERCENT*100)/100}%</td>
                    <td class="table-mixed">{Math.round(currData[0].b2bMixedGenderSongs_PERCENT*100)/100}%</td>
                </tr>
                <tr>
                    <td>Trans/non-binary</td>
                    <td>0%</td>
                    <td class="table-nb">0%</td>
                </tr>
            </table>
            {/if}
        </div>
        <div class="data-table">
            <p>Race/Ethnicity</p>
            {#if currData}
            <table>
                <tr>
                    <th></th>
                    <th>All</th>
                    <th>B2B</th>
                </tr>
                <tr>
                    <td>White</td>
                    <td>XX%</td>
                    <td class="table-white">XX%</td>
                </tr>
                <tr>
                    <td>POC</td>
                    <td>XX%</td>
                    <td class="table-poc">XX%</td>
                </tr>
            </table>
            {/if}
        </div>
    </div>
    <div class="chart-type">
        <p>Show data by</p>
        <ButtonSet options={options}/>
    </div>
</section>

<style>
    #dashboard {
        font-family: var(--sans);
        color: var(--color-country-text);
        width: 100%;
        padding: 1rem;
    }

    .details {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
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
    }

    .table-container {
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    .data-table {
        width: 50%;
        margin: 2rem 0;
    }

    .data-table:first-of-type {
        padding: 0 0.5rem 0 0;
    }
    .data-table:last-of-type {
        padding: 0 0 0 0.5rem;
    }
    .data-table table {
        width: 100%;
    }

    .data-table p {
        font-weight: 700;
        font-size: var(--24px);
    }

    td, th {
        border-bottom: 1px solid var(--color-country-text);
        padding: 0.5rem 0.25rem;
    }

    .table-women {
        background: var(--color-country-blue);
        font-weight: 700;
    }

    .table-men {
        background: var(--color-country-tan);
        font-weight: 700;
    }

    .table-mixed {
        background: var(--color-country-orange);
        font-weight: 700;
    }

    :global(.right svg) {
        width: 100%;
        height: 100%;
    }

    :global(.right svg #SanAntonio path) {
        fill: var(--color-country-blue);
    }
</style>
<script>
    import { getContext } from "svelte";
    const data = getContext("data");
	const copy = getContext("copy");
    let rowsTopOverallW;
    let rowsTopOverallM;
    let rowsTopCurrentW;
    let rowsTopCurrentM;
    let columnsTop;

    import BarChart from "$components/BarChart.svelte";
    import Wall from "$components/Wall.svelte";
    import InlineBarChart from "$components/InlineBarChart.svelte";
    import SortTable from "$components/helpers/SortTable.svelte";
    import MultiLineContainer from "$components/MultiLineContainer.svelte";
    import Icon from "$components/helpers/Icon.svelte";
    import SimulationCharts from "$components/SimulationCharts.svelte";



    rowsTopCurrentW = [
        {name: copy.top3Chart[1].rank1Name, percent: `${copy.top3Chart[1].rank1Percent}%`},
        {name: copy.top3Chart[1].rank2Name, percent: `${copy.top3Chart[1].rank2Percent}%`},
        {name: copy.top3Chart[1].rank3Name, percent: `${copy.top3Chart[1].rank3Percent}%`},
        {name: "Total", percent: `${copy.top3Chart[1].total}%`},
    ]

    rowsTopCurrentM = [
        {name: copy.top3Chart[3].rank1Name, percent: `${copy.top3Chart[3].rank1Percent}%`},
        {name: copy.top3Chart[3].rank2Name, percent: `${copy.top3Chart[3].rank2Percent}%`},
        {name: copy.top3Chart[3].rank3Name, percent: `${copy.top3Chart[3].rank3Percent}%`},
        {name: "Total", percent: `${copy.top3Chart[3].total}%`},
    ]

    rowsTopOverallW = [
        {name: copy.top3Chart[0].rank1Name, percent: `${copy.top3Chart[0].rank1Percent}%`},
        {name: copy.top3Chart[0].rank2Name, percent: `${copy.top3Chart[0].rank2Percent}%`},
        {name: copy.top3Chart[0].rank3Name, percent: `${copy.top3Chart[0].rank3Percent}%`},
        {name: "Total", percent: `${copy.top3Chart[0].total}%`},
    ]

    rowsTopOverallM = [
        {name: copy.top3Chart[2].rank1Name, percent: `${copy.top3Chart[2].rank1Percent}%`},
        {name: copy.top3Chart[2].rank2Name, percent: `${copy.top3Chart[2].rank2Percent}%`},
        {name: copy.top3Chart[2].rank3Name, percent: `${copy.top3Chart[2].rank3Percent}%`},
        {name: "Total", percent: `${copy.top3Chart[2].total}%`},
    ]

    columnsTop = [
        { label: "Artist", prop: "name", sort: false, type: "text" },
        { label: "%", prop: "percent", sort: false, type: "text" },
    ];
</script>

<section id="post-scroll">
    <div class="dashTease">
        <Icon name="star" rotation=-10/>
        <p>{@html copy.dashTease}</p>
        <Icon name="star" rotation=10/>
    </div>
    <div class="prose">
        {#each copy.prose1 as text, i}
            <p>{@html text.value}</p>
        {/each}
    </div>
    <div class="pullquote">
        {#each copy.quote1 as text, i}
            <p>{@html text.value}</p>
        {/each}
    </div>
    <div class="prose">
        {#each copy.prose2 as text, i}
            <p>{@html text.value}</p>
        {/each}
    </div>
    <MultiLineContainer />
    <div class="prose">
        {#each copy.prose2a as text, i}
            <p>{@html text.value}</p>
        {/each}
    </div>
    <h3>{copy.proseHead3}</h3>
    <div class="prose">
        {#each copy.prose3 as text, i}
            <p>{@html text.value}</p>
        {/each}
    </div>
    <Wall />
    <div class="prose">
        {#each copy.prose4 as text, i}
            <p>{@html text.value}</p>
        {/each}
    </div>
    <h3>{copy.proseHead5}</h3>
    <div class="prose">
        {#each copy.prose5 as text, i}
            <p>{@html text.value}</p>
        {/each}
    </div>
    <BarChart />
    <div class="prose">
        {#each copy.prose5a as text, i}
            <p>{@html text.value}</p>
        {/each}
    </div>
    <h4 class="coin-title">"Coin flip" simulations by station</h4>
    <SimulationCharts />
    <div class="prose">
        {#each copy.prose5b as text, i}
            <p>{@html text.value}</p>
        {/each}
    </div>
    <div class="pullquote">
        {#each copy.quote2 as text, i}
            <p>{@html text.value}</p>
        {/each}
    </div>
    <div class="prose">
        {#each copy.prose5c as text, i}
            <p>{@html text.value}</p>
        {/each}
    </div>
    <h3>{copy.proseHead6}</h3>
    <div class="prose">
        {#each copy.prose6 as text, i}
            <p>{@html text.value}</p>
        {/each}
    </div>
    <InlineBarChart title={copy.hoursChartTitle} data={copy.hoursChart} />
    <div class="prose">
        {#each copy.prose7 as text, i}
            <p>{@html text.value}</p>
        {/each}
    </div>
    <InlineBarChart title={copy.goldChartTitle} data={copy.goldChart} />
    <div class="prose">
        {#each copy.prose8 as text, i}
            <p>{@html text.value}</p>
        {/each}
    </div>
    <div class="table-container">
        <div class="table-wrapper">
            {#if rowsTopOverallW}
                <h4>Plays for top <span class="women-span">overall women</span></h4>
                <SortTable  rows={rowsTopOverallW} columns={columnsTop}/>
            {/if} 
        </div>
        <div class="table-wrapper">
            {#if rowsTopCurrentW}
                <h4>Plays for top <span class="women-span">current women</span></h4>
                <SortTable  rows={rowsTopCurrentW} columns={columnsTop}/>
            {/if} 
        </div>
        <div class="table-wrapper">
            <h4>Plays for top <span class="men-span">overall men</span></h4>
            {#if rowsTopOverallM}
                <SortTable  rows={rowsTopOverallM} columns={columnsTop}/>
            {/if} 
        </div>
        <div class="table-wrapper">
            <h4>Plays for top <span class="men-span">current men</span></h4>
            {#if rowsTopCurrentM}
                <SortTable  rows={rowsTopCurrentM} columns={columnsTop}/>
            {/if} 
        </div>
    </div>
    <div class="prose">
        {#each copy.prose9 as text, i}
            <p>{@html text.value}</p>
        {/each}
    </div>
</section>

<style>
    :global(.icon svg polygon) {
        fill: var(--color-country-text);
    }
    :global(.icon) {
        margin: 0.25rem 0.25rem 0 0.25rem;
    }
    #post-scroll {
        width: 100%;
        padding: 0 1rem;
        font-family: var(--sans);
        margin-top: 7rem;
        overflow-x: hidden;
    }
    .dashTease {
        margin: 2rem auto;
        max-width: 40rem;
        font-weight: 700;
        font-size: var(--14px);
        text-align: center;
        padding: 0 1rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    h3 {
        font-weight: 700;
        font-family: var(--sans-narrow);
        color: var(--color-country-text);
        margin: 3rem 0 -1rem 0;
        max-width: 40rem;
        margin: 3rem auto 0 auto;
        position: relative;
    }
    h3::before {
        content: "";
        background-image: url("/assets/images/pointer.png");
        background-repeat: no-repeat;
        background-size: 3.5rem;
        width: 3.5rem;
        height: 15rem;
        position: absolute;
        top: -6rem;
        left: 0.5rem;
        opacity: 1;
        transform: rotate(-90deg);
    }
    .prose {
        max-width: 40rem;
        margin: 0 auto;
    }
    .table-container {
        max-width: 65rem;
        margin: 0 auto;
        padding: 1rem 0 2rem 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .table-wrapper {
        width: calc(25% - 1rem);
        margin: 0;
        margin: 0 0.5rem;
    }
    :global(#post-scroll .table-container td, #post-scroll .table-container th) {
        background: var(--color-coutnry-bg);
        border-right: none;
        font-family: var(--sans-narrow);
    }
    :global(#post-scroll .table-container td) {
        width: 100%;
        padding: 0.75rem;
        font-weight: 500;
    }
    :global(#post-scroll .table-container td:nth-of-type(2), #post-scroll .table-container tr:nth-of-type(4) td:nth-of-type(1)) {
        font-weight: 700;
    }
    :global(#post-scroll .table-container td:nth-of-type(2)) {
        text-align: right;
    }
    :global(#post-scroll .table-container tr:nth-of-type(4) td) {
        background: var(--color-country-tan);
        position: relative;
    }
    :global(#post-scroll .table-container tr:nth-of-type(4) td::before) {
        content: "";
        background-image: url("/assets/images/letterpress-texture3.png");
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        opacity: 0.15;
    }
    .pullquote {
        padding: 1rem 2rem;
        background: var(--color-white);
        font-size: var(--20px);
        font-style: italic;
        line-height: 1.65;
        position: relative;
        max-width: 40rem;
        margin: 2rem auto;
    }
    .pullquote::before {
        content: "";
        background-image: url("/assets/images/quote.png");
        background-repeat: no-repeat;
        background-size: 3.5rem;
        width: 3.5rem;
        height: 3.5rem;
        position: absolute;
        top: -1.25rem;
        left: -1.25rem;
        opacity: 0.95;
    }
    h4 {
        font-weight: 700;
        font-family: var(--sans-narrow);
        font-size: var(--20px);
        color: var(--color-country-text);
        margin: 0 0 0.5rem 0;
        padding: 0;
    }
    .coin-title {
        max-width: 60rem;
        margin: 4rem auto 0 auto;
    }

    @media only screen and (max-width: 1100px) {
        .table-container {
            flex-wrap: wrap;
        }
        .table-wrapper {
            width: calc(50% - 1rem);
        }
        .table-wrapper h4 {
            margin: 3rem 0 0.5rem 0;
        }
    }

    @media only screen and (max-width: 800px) {
        h3 {
            padding-left: 4rem;
        }
        h3::before {
            left: 4.5rem;
        }
    }

    @media only screen and (max-width: 700px) {
        .prose p {
            font-size: var(--16px);
        }
        .pullquote {
            font-size: var(--18px);
        }
        :global(#post-scroll .table-container th) {
            font-size: var(--14px);
        }
        :global(#post-scroll .table-container td) {
            font-size: var(--14px);
        }
        .pullquote::before {
            top: -1.25rem;
            left: -0.5rem;
        }
    }
    @media only screen and (max-width: 600px) {
        .table-container {
            flex-direction: column;
        }
        .table-wrapper {
            width: 100%;
        }
        .table-wrapper h4 {
            margin: 2rem 0 0.5rem 0;
        }
    }
</style>
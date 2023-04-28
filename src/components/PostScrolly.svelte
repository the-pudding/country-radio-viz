<script>
    import { getContext } from "svelte";
    const data = getContext("data");
	const copy = getContext("copy");
    let rowsTopW;
    let rowsTopM;
    let columnsTop;

    import BarChart from "$components/BarChart.svelte";
    import Wall from "$components/Wall.svelte";
    import InlineBarChart from "$components/InlineBarChart.svelte";
    import SortTable from "$components/helpers/SortTable.svelte";


    rowsTopW = [
        {name: copy.top3Chart[0].rank1Name, percent: `${copy.top3Chart[0].rank1Percent}%`},
        {name: copy.top3Chart[0].rank2Name, percent: `${copy.top3Chart[0].rank2Percent}%`},
        {name: copy.top3Chart[0].rank3Name, percent: `${copy.top3Chart[0].rank3Percent}%`},
        {name: "Total", percent: `${copy.top3Chart[0].total}%`},
    ]

    rowsTopM = [
        {name: copy.top3Chart[1].rank1Name, percent: `${copy.top3Chart[1].rank1Percent}%`},
        {name: copy.top3Chart[1].rank2Name, percent: `${copy.top3Chart[1].rank2Percent}%`},
        {name: copy.top3Chart[1].rank3Name, percent: `${copy.top3Chart[1].rank3Percent}%`},
        {name: "Total", percent: `${copy.top3Chart[1].total}%`},
    ]

    columnsTop = [
        { label: "Artist", prop: "name", sort: false, type: "text" },
        { label: "Percentage", prop: "percent", sort: false, type: "text" },
    ];
</script>

<section id="post-scroll">
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
            {#if rowsTopW}
                <h4>Percentage of plays for top current women artists</h4>
                <SortTable  rows={rowsTopW} columns={columnsTop}/>
            {/if} 
        </div>
        <div class="table-wrapper">
            <h4>Percentage of plays for top current men artists</h4>
            {#if rowsTopM}
                <SortTable  rows={rowsTopM} columns={columnsTop}/>
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
    #post-scroll {
        width: 100%;
        padding: 0 1rem;
        font-family: var(--sans);
    }
    h3 {
        font-weight: 700;
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
        max-width: 40rem;
        margin: 0 auto;
        padding: 3rem 0;
        display: flex;
        flex-direction: row;
    }
    .table-wrapper {
        width: 50%;
        margin: 0;
    }
    .table-wrapper:first-of-type {
        margin-right: 1rem;
    }
    .table-wrapper:last-of-type {
        margin-left: 1rem;
    }
    :global(#post-scroll .table-container td, #post-scroll .table-container th) {
        background: var(--color-coutnry-bg);
        border-right: none;
    }
    :global(#post-scroll .table-container td) {
        width: 100%;
        padding: 0.75rem;
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
        opacity: 0.25;
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
        background-size: 5rem;
        width: 5rem;
        height: 5rem;
        position: absolute;
        top: -2.25rem;
        left: -2.5rem;
        opacity: 0.95;
    }
    h4 {
        font-weight: 700;
        font-size: var(--20px);
        color: var(--color-country-text);
        margin: 0 0 1rem 0;
        padding: 0;
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
    }
    @media only screen and (max-width: 600px) {
        .table-container {
            flex-direction: column;
        }
        .table-wrapper {
            width: 100%;
        }
        .table-wrapper:first-of-type {
            margin-right: 0;
            margin: 0 0 3rem 0;
        }
        .table-wrapper:last-of-type {
            margin-left: 0;
        }
    }
</style>
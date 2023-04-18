<script>
    import { getContext } from "svelte";
    const data = getContext("data");
	const copy = getContext("copy");

    import BarChart from "$components/BarChart.svelte";
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
    <h3>{copy.proseHead4}</h3>
    <div class="prose">
        {#each copy.prose4 as text, i}
            <p>{@html text.value}</p>
        {/each}
    </div>
    <BarChart />
    <h3>{copy.proseHead5}</h3>
    <div class="prose">
        {#each copy.prose5 as text, i}
            <p>{@html text.value}</p>
        {/each}
    </div>
    <div class="hours-chart">
        <h4>{copy.hoursChartTitle}</h4>
        {#each copy.hoursChart as text, i}
            <div class="row">
                <div class="label-container">
                    <p>{text.long} ({text.type})</p>
                    <p>{text.hours}</p>
                </div>
                <div class="bar-container">
                    <div class="bar"></div>
                    <div class="color-bar color-bar-{text.type}" style="width: {text.percent}%"><p>{text.percent}%</p></div>
                </div>
            </div>
        {/each}
    </div>
    <div class="prose">
        {#each copy.prose6 as text, i}
            <p>{@html text.value}</p>
        {/each}
    </div>
    <div class="gold-chart">
        <h4>{copy.goldChartTitle}</h4>
        {#each copy.goldChart as text, i}
            <div class="row">
                <div class="label-container">
                    <p>{text.type}</p>
                </div>
                <div class="bar-container">
                    <div class="bar"></div>
                    <div class="color-bar color-bar-{text.type}" style="width: {text.percent}%"><p>{text.percent}%</p></div>
                </div>
            </div>
        {/each}
    </div>
    <div class="prose">
        {#each copy.prose7 as text, i}
            <p>{@html text.value}</p>
        {/each}
    </div>
</section>

<style>
    #post-scroll {
        max-width: 40rem;
        margin: 0 auto;
        padding: 0 1rem;
        font-family: var(--sans);
    }
    h3 {
        font-weight: 700;
        color: var(--color-country-text);
        margin: 3rem 0 -1rem 0;
    }
    .pullquote {
        padding: 1rem 2rem;
        background: var(--color-white);
        font-size: var(--20px);
        font-style: italic;
        line-height: 1.65;
        position: relative;
    }

    .hours-chart, .gold-chart {
        width: 100%;
        padding: 3rem 0;
    }

    .row {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 0;
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--color-country-tan);
    }

    .label-container {
        width: 12rem;
        color: var(--color-country-text);
        margin: 0;
    }

    .gold-chart .label-container {
        width: 6rem;
    }

    .label-container p {
        margin: 0;
        padding: 0;
    }

    .label-container p:first-of-type {
        font-weight: 700;
    }

    .bar-container {
        width: calc(100% - 12rem);
        position: relative;
        height: 2rem;
    }

    .gold-chart .bar-container {
        width: calc(100% - 6rem);
    }

    .bar {
        background: var(--color-country-tan);
        width: 100%;
        height: 2rem;
        position: absolute;
    }

    .color-bar {
        background: var(--color-country-brown);
        height: 2rem;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: end;
        text-align: left;
    }

    .color-bar-OVN, .color-bar-EVE, .color-bar-Current {
        background: var(--color-country-blue);
    }

    .color-bar p {
        font-weight: 700;
        margin-right: -3.5rem;
        width: 3rem;
    }

    h4 {
        font-weight: 700;
        font-size: var(--20px);
        color: var(--color-country-text);
        margin: 0 0 2rem 0;
        padding: 0;
    }
</style>
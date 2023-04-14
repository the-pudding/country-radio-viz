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
    <BarChart />
    <h3>{copy.proseHead2}</h3>
    <div class="prose">
        {#each copy.prose2 as text, i}
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
    }
    :global(.pullquote) {
        font-weight: 700;
        font-size: var(--24px);
        background-color: white;
    }
</style>
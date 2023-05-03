<script>
    import { getContext } from "svelte";
    const data = getContext("data");
	const copy = getContext("copy");
    import SimulationCharts from "$components/SimulationCharts.svelte";
</script>

<section id="methods">
    <h3>Methodology & Notes</h3>
    <div class="prose">
        {#each copy.methods1 as text, i}
            <p>{@html text.value}</p>
        {/each}
    </div>
    <div class="prose">
        <ul>
            {#each copy.methodBullets1 as text, i}
                <li><strong>{@html text.category}:</strong> {@html text.details}</li>
            {/each}
        </ul>
    </div>
    <div class="note">
        <p>{@html copy.methodsNote[0].text}</p>
    </div>
    <div class="prose">
        {#each copy.methods2 as text, i}
            <p>{@html text.value}</p>
        {/each}
    </div>
    <SimulationCharts />
    <div class="prose">
        <h4>Organizations & communities</h4>
        <ul>
            {#each copy.methodsListOrgs as text, i}
                <li><a href={text.link}><strong>{@html text.name}:</strong></a> {@html text.description}</li>
            {/each}
        </ul>
        <h4>Media & publications</h4>
        <ul>
            {#each copy.methodsListPubs as text, i}
                <li><a href={text.link}><strong>{@html text.name}:</strong></a> {@html text.description}</li>
            {/each}
        </ul>
        <h4>Support the artists</h4>
        <ul>
            {#each copy.methodsListSupport as text, i}
                <li><a href={text.link}><strong>{@html text.name}:</strong></a> {@html text.description}</li>
            {/each}
        </ul>
        <h4>About the authors</h4>
        {#each copy.methodsAbout as text, i}
            <p>{@html text.value}</p>
        {/each}
    </div>
</section>

<style>
    #methods {
        padding: 0 1rem;
        font-family: var(--sans-narrow);
        color: var(--color-country-text);
        margin: 0 0 5rem 0;
    }

    .prose {
        font-size: var(--14px);
        color: var(--color-country-text);
        max-width: 40rem;
        margin: 0 auto;
    }
    .note {
        font-size: var(--14px);
        font-style: italic;
        color: var(--color-country-text);
        max-width: 40rem;
        margin: 0 auto;
    }
    h3 {
        max-width: 40rem;
        margin: 2rem auto 0rem auto; 
    }
    h4 {
        font-weight: 700;
        font-size: var(--18px);
        color: var(--color-country-text);
        max-width: 40rem;
        margin: 2rem auto 0rem auto;
    }

    @media only screen and (max-width: 700px) {
        #methods {
            max-width: 100%;
        }
    }
</style>
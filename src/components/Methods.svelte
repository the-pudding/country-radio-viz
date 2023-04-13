<script>
    import { getContext } from "svelte";
    const data = getContext("data");
	const copy = getContext("copy");
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
</section>

<style>
    #methods {
        max-width: 40rem;
        margin: 0 auto 5rem auto;
        padding: 0 1rem;
        font-family: var(--sans);
        color: var(--color-country-text);
    }

    #methods .prose {
        font-size: var(--14px);
    }
    #methods .note {
        font-size: var(--14px);
        font-style: italic;
    }
</style>
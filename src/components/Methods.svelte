<script>
    import { getContext } from "svelte";
    const data = getContext("data");
	const copy = getContext("copy");
    import SimulationCharts from "$components/SimulationCharts.svelte";
</script>

<section id="methods">
    <h3>Methodology</h3>
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
    <h4>"Coin flip" simulations by station</h4>
    <SimulationCharts />
    <h3>Notes</h3>
    <div class="prose">
        {#each copy.methods3 as text, i}
            <p>{@html text.value}</p>
        {/each}
        <div class="playlist-wrapper">
            <iframe title="Spotify Playlsit" style="border-radius:12px" src="https://open.spotify.com/embed/playlist/4iUShEXY8vdrZzZstsNxto?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
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
        <ul>
        {#each copy.methodsAbout as text, i}
            <li><a href={text.link}><strong>{@html text.name}</strong></a> {@html text.description}</li>
        {/each}
        </ul>
    </div>
</section>

<style>
    #methods {
        padding: 0 1rem;
        font-family: var(--sans-narrow);
        color: var(--color-country-text);
        margin: 0 1rem 12rem 1rem;
        border-top: 1px solid var(--color-country-tan);
    }
    .playlist-wrapper {
        max-width: 40rem;
        padding: 2rem 0;
    }
    .prose {
        font-size: var(--14px);
        color: var(--color-country-text);
        max-width: 40rem;
        margin: 0 auto;
    }
    .prose p {
        margin: 0;
    }
    .note {
        font-size: var(--14px);
        font-style: italic;
        color: var(--color-country-text);
        max-width: 40rem;
        margin: 0 auto;
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
    h4 {
        font-weight: 700;
        font-size: var(--18px);
        color: var(--color-country-text);
        max-width: 40rem;
        margin: 2rem auto 0rem auto;
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
        #methods {
            max-width: 100%;
        }
    }
</style>
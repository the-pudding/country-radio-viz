<script>
    import { getContext } from "svelte";
	const copy = getContext("copy");

    let imgW;
</script>

<section id="wall">
    <div class="wall-container">
        {#each copy.wall as indiv, i}
            <div class="indiv-container">
                <p class="year">{indiv.year}</p>
                {#if indiv.image}
                <div class="img-wrapper" bind:clientWidth={imgW}>
                    <img src="assets/images/{indiv.image}" alt="A album cover from {indiv.name}"/>
                </div>
                {:else}
                    <div class="empty-img" style="width: {imgW}px; height: {imgW}px; margin-top: 2rem"></div>
                {/if}
                <p class="name">{indiv.name}</p>
                <p class="song">{indiv.song}</p>
                <p class="details">{indiv.superlative}</p>
            </div>
        {/each}
    </div>
</section>

<style>
    .wall-container {
        width: 100%;
        display: flex;
        max-width: 65rem;
        margin: 3rem auto;
        color: var(--color-country-text);
    }
    .indiv-container {
        width: 20%;
        padding: 0 1rem;
        text-align: center;
    }

    .wall-container img {
        max-width: 300px;
        width: 100%;
        object-fit: cover;
    }

    .img-wrapper, .empty-img {
        width: 100%;
        max-width: 300px;
        border: 1px solid var(--color-country-tan);
    }

    .year {
        color: var(--color-country-brown);
        margin: 0 0 0.5rem 0;
    }
    .name {
        font-weight: 700;
        font-size: var(--20px);
        margin: 0.5rem 0 0 0;
    }
    .song {
        margin: 0;
    }
    .details {
        font-style: italic;
    }
</style>
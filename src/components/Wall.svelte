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
                <div class="img-wrapper img-wrapper-{i}" bind:clientWidth={imgW}>
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
        flex-wrap: wrap;
        justify-content: center;
        font-family: var(--sans-narrow);
    }
    .indiv-container {
        width: 20%;
        max-width: 15rem;
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
        border-radius: 0.125rem;
    }
    .img-wrapper-0::before, .img-wrapper-2::before {
        content: "";
        background-image: url("/assets/images/letterpress-texture1.png");
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        opacity: 0.25;
    }
    .img-wrapper-1::before {
        content: "";
        background-image: url("/assets/images/letterpress-texture2.png");
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        opacity: 0.25;
    }
    .img-wrapper-3::before {
        content: "";
        background-image: url("/assets/images/letterpress-texture3.png");
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        opacity: 0.25;
    }
    .year {
        color: var(--color-country-brown);
        margin: 0 0 0.5rem 0;
    }
    .name {
        font-family: var(--sans-narrow);
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

    @media only screen and (max-width: 900px) {
        .indiv-container {
            width: 50%;
        }
    }
</style>
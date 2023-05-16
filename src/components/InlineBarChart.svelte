<script>
    import { getContext } from "svelte";
	const copy = getContext("copy");

    export let title;
    export let data;
</script>

<section class="inline-bar">
    <h4>{title}</h4>
    {#each data as bar, i}
        <div class="row">
            {#if bar.long}
                <div class="label-container" style="width: 10rem">
                    <p>{bar.long} ({bar.type})</p>
                    <p>{bar.hours}</p>
                </div>
                <div class="bar-container" style="width: calc(100% - 10rem)">
                    <div class="bar bar-{i}"></div>
                    <div class="color-wrapper">
                        <div class="color-bar color-bar-{i} color-bar-{bar.type}" style="width: {bar.percent}%"></div>
                        <p>{bar.percent}%</p>
                    </div>
                </div>
            {:else}
                <div class="label-container" style="width: 5rem">
                    <p>{bar.type}</p>
                </div>
                <div class="bar-container" style="width: calc(100% - 5rem)">
                    <div class="bar bar-{i}"></div>
                    <div class="color-wrapper">
                        <div class="color-bar color-bar-{i} color-bar-{bar.type}" style="width: {bar.percent}%"></div>
                        <p>{bar.percent}%</p>
                    </div>
                </div>
            {/if}
        </div>
    {/each}
    <p class="note">Note: Keep in mind that these percentages are percentages of the tiny number (1.3% and below) of women's back-to-back plays.</p>
</section>

<style>
    section {
        max-width: 40rem;
        margin: 0 auto;
        padding: 3rem 0;
    }
    .mline {
        font-family: var(--sans-narrow);
        position: relative;
        margin: 0 0 1rem 0;
        padding: 0;
    }
    .mline::before {
        content:'';
        position: relative;
        top: 0.25rem;
        display: inline-block;
        height: 20px;
        width: 2px;
        background: var(--color-country-text);
        margin-right: 0.5rem
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

    .note {
        font-size: var(--14px);
        font-style: italic;
        font-family: var(--sans-narrow);
        color: var(--color-country-dark-brown); 
    }

    .label-container {
        color: var(--color-country-text);
        margin: 0;
    }

    .label-container p {
        font-family: var(--sans-narrow);
        margin: 0;
        padding: 0;
    }

    .label-container p:first-of-type {
        font-weight: 700;
    }

    .bar-container {
        position: relative;
        height: 2rem;
    }

    .bar {
        background: var(--color-country-tan);
        width: 100%;
        height: 2rem;
        position: absolute;
        border-radius: 0.125rem;
    }
    .color-wrapper {
        position: absolute;
        width: 100%;
        display: flex;
        flex-direction: row;
        /* align-items: center; */
    }
    .color-bar {
        background: var(--color-country-blue);
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: end;
        text-align: left;
        border-radius: 0.125rem;
    }
    .bar-0::before, .bar-4::before, .color-bar-0::before, .color-bar-4::before {
        content: "";
        background-image: url("/assets/images/letterpress-texture1.png");
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        opacity: 0.15;
    }
    .bar-1::before, .bar-3::before, .color-bar-1::before, .color-bar-3::before {
        content: "";
        background-image: url("/assets/images/letterpress-texture2.png");
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        opacity: 0.15;
    }
    .bar-2::before, .color-bar-2::before {
        content: "";
        background-image: url("/assets/images/letterpress-texture3.png");
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        opacity: 0.15;
    }
    .color-bar-OVN, .color-bar-EVE, .color-bar-Current {
        background: var(--color-country-blue);
    }

    .color-wrapper p {
        font-weight: 700;
        margin: 0.25rem 0 0 0.25rem;
        padding: 0;
        width: 3rem;
        font-family: var(--sans-narrow);
        z-index: 1000;
        text-shadow:
            -1px -1px 0 var(--color-country-tan),  
                1px -1px 0 var(--color-country-tan),
                -1px 1px 0 var(--color-country-tan),
                1px 1px 0 var(--color-country-tan);
    }
    .m-bar {
        width: 2px;
        background: var(--color-country-text);
        position: absolute;
        height: 2rem;
    }

    h4 {
        font-weight: 700;
        font-family: var(--sans-narrow);
        font-size: var(--20px);
        color: var(--color-country-text);
        margin: 0 0 0.5rem 0;
        padding: 0;
    }

    @media only screen and (max-width: 700px) {
        .color-wrapper p, .label-container p {
            font-size: var(--14px);
        }
        .color-wrapper p {
            margin-top: 0.35rem;
        }
    }
    @media only screen and (max-width: 500px) {
        .color-wrapper p, .label-container p {
            font-size: var(--12px);
        }
        .color-wrapper p {
            margin-top: 0.5rem;
        }
    }
</style>
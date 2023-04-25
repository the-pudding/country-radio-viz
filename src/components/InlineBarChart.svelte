<script>
    import { getContext } from "svelte";
	const copy = getContext("copy");

    export let title;
    export let data;
</script>

<section class="inline-bar">
    <h4>{title}</h4>
    <p class="mline">Back-to-back men percentage</p>
    {#each data as bar, i}
        <div class="row">
            {#if bar.long}
                <div class="label-container" style="width: 12rem">
                    <p>{bar.long} ({bar.type})</p>
                    <p>{bar.hours}</p>
                </div>
                <div class="bar-container" style="width: calc(100% - 12rem)">
                    <div class="bar bar-{i}"></div>
                    <div class="color-bar color-bar-{i} color-bar-{bar.type}" style="width: {bar.percent}%"><p>{bar.percent}%</p></div>
                    <div class="m-bar" style="margin-left:{bar.mpercent}%"></div>
                </div>
            {:else}
                <div class="label-container" style="width: 6rem">
                    <p>{bar.type}</p>
                </div>
                <div class="bar-container" style="width: calc(100% - 6rem)">
                    <div class="bar bar-{i}"></div>
                    <div class="color-bar color-bar-{i} color-bar-{bar.type}" style="width: {bar.percent}%"><p>{bar.percent}%</p></div>
                    <div class="m-bar" style="margin-left:{bar.mpercent}%"></div>
                </div>
            {/if}
        </div>
    {/each}
</section>

<style>
    section {
        max-width: 40rem;
        margin: 0 auto;
        padding: 3rem 0;
    }
    .mline {
        position: relative;
        margin: 0 0 2rem 0;
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

    .label-container {
        color: var(--color-country-text);
        margin: 0;
    }

    .label-container p {
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
    
    .color-bar {
        background: var(--color-country-brown);
        height: 2rem;
        position: absolute;
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
        opacity: 0.25;
    }
    .bar-1::before, .bar-3::before, .color-bar-1::before, .color-bar-3::before {
        content: "";
        background-image: url("/assets/images/letterpress-texture2.png");
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        opacity: 0.25;
    }
    .bar-2::before, .color-bar-2::before {
        content: "";
        background-image: url("/assets/images/letterpress-texture3.png");
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        opacity: 0.25;
    }
    .color-bar-OVN, .color-bar-EVE, .color-bar-Current {
        background: var(--color-country-blue);
    }

    .color-bar p {
        font-weight: 700;
        margin-right: -3.5rem;
        width: 3rem;
    }
    .m-bar {
        width: 2px;
        background: var(--color-country-text);
        position: absolute;
        height: 2rem;
    }

    h4 {
        font-weight: 700;
        font-size: var(--20px);
        color: var(--color-country-text);
        margin: 0 0 0 0;
        padding: 0;
    }
</style>
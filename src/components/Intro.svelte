<script>
    import { getContext } from "svelte";
    import title from "$svg/title_hero-bg.svg";
    import Header from "$components/Header.svelte";
    const copy = getContext("copy");

    let w;
</script>

<svelte:window bind:innerWidth={w}/>

<section id="intro">
    <div class="title-wrapper" style="height: {w*0.9}px">
        <Header />
        <img alt="letterpress sunburst texture" src="assets/images/hero-bg.jpg" />
        <div class="svg-container">
            {@html title}
        </div>
        <div class="subhed-wrapper">
            <h2>{copy.subhed}</h2>
            <p class="byline">By {@html copy.byline}</p>
        </div>
        <h1>{copy.hed}</h1>
        <div class="img-wrapper">
            <p>Scroll</p>
            <img class="pointer" alt="letterpress pointer hand" src="assets/images/pointer.png" />
        </div>
    </div>
</section>


<style>
    section {
        width: 100%;
        z-index: 999;
        /* margin-bottom: -50vh; */
    }
    .title-wrapper {
        width: 100%;
        position: relative;
        z-index: 999;
    }
    .title-wrapper img {
        width: 100%;
        position: absolute;
    }
    .svg-container {
        width: 100%;
        position: absolute;
        top: -2rem;
    }
    :global(.svg-container svg) {
        width: 100%;
    }
    .img-wrapper {
        position: absolute;
        right: 1rem;
        bottom: -2rem;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .img-wrapper .pointer {
        width: 4rem;
        position: relative;
        animation: bounceUp 1s infinite;
    }
    .img-wrapper p {
        font-family: var(--sans);
        font-weight: 700;
        font-size: var(--14px);
        text-transform: uppercase;
        color: var(--color-country-text);
        padding: 0;
        margin: 1.75rem -1rem 0 0;
    }
    .subhed-wrapper {
        width: 100%;
        position: absolute;
        bottom: 3rem;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    h2, .byline {
        color: var(--color-country-bg);
        background: rgba(45, 39, 36, 0.95);
        text-align: center;
        color: var(--color-country-bg);
        padding: 0.25rem 1rem;
        font-family: var(--sans);
        text-transform: uppercase;
        border-radius: 0.125rem;
        height: 2.5rem;
        line-height: 1.75;
        margin: 0.5rem 0;
    }
    h2 {
        font-size: var(--20px);
        height: 3rem;
        line-height: 1.75;
        bottom: 6rem;
        clip-path: polygon(0 0, 99.5% 0, 100% 3rem, 0.5% 100%);
    }
    .byline {
        font-size: var(--14px);
        height: 2.25rem;
        line-height: 1.75;
        bottom: 3rem;
        clip-path: polygon(0.5% 0, 99.5% 0, 100% 2.25rem, 0 100%);
    }
    :global(.byline a) {
        color: var(--color-country-bg);
    }
    h1 {
        text-align: center;
        position: absolute;
        opacity: 0;
        pointer-events: none;
    }

    @keyframes bounceUp {
        0%       { bottom:3px; }
        25%, 75% { bottom:6px; }
        50%      { bottom:9px; }
        100%     { bottom:0; }
    }

</style>
<script>
    import { getContext } from "svelte";
    import title from "$svg/title_hero-bg.svg";
    import { onMount } from "svelte";
    import { min } from "d3";
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import { fade } from 'svelte/transition';
    // import { loadImage } from '$utils/loadImage.js'

    const copy = getContext("copy");
    let w;
    let h;
    let scrollY;
    let minDim;
    let svgH;

    export let value;

    const opacity = tweened(0, {
		duration: 500,
		easing: cubicOut
	});

    function calcDims(w, h) { minDim = min([w, h]); }

    onMount(() => {
        calcDims(w, h);
    })

    $: calcDims(w, h);
    $: console.log(value)
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} bind:scrollY/>

<section id="intro" class:visible={minDim && value == undefined && scrollY < 200}>
        <div class="title-wrapper" out:fade={{duration: 500}}>
            <img class="overlay" alt="lettepress texture" src="assets/images/letterpress-texture2.png">
            <img class="sunburst" alt="letterpress sunburst texture" src="assets/images/bg-no-texture.png" />
            <div class="svg-container" bind:clientHeight={svgH}>
                {@html title}
            </div>
            <div class="subhed-wrapper">
                <h2>{copy.subhed}</h2>
                <p class="byline">By {@html copy.byline}</p>
            </div>
            <h1>{copy.hed}</h1>
        </div>
        <div class="img-wrapper">
            <p>Scroll</p>
            <img class="pointer" alt="letterpress pointer hand" src="assets/images/pointer.png" />
        </div>
</section>


<style>
    section {
        width: 100%;
        z-index: 999;
        height: auto;
        font-family: var(--sans);
        position: absolute;
        top: 0;
        left: 0;
        height: 100vh;
        z-index: 1000;
        visibility: hidden;
    }
    section.visible {
        visibility: visible;
    }
    .title-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50% , -50%);
        z-index: 999;
        margin: 0 auto;
        width: 85vmin;
        height: 85vmin;
    }
    .title-wrapper img {
        width: 100%;
        position: absolute;
    }
    .sunburst {
        z-index: 998;
        width: 85vmin;
        height: 85vmin;
    }
    .overlay {
        z-index: 999;
        height: 100%;
    }
    .svg-container {
        width: 100%;
        position: absolute;
        top: -2rem;
        z-index: 1000;
    }
    :global(.svg-container svg) {
        width: 100%;
    }
    .img-wrapper {
        position: absolute;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        z-index: 1000;
    }
    .img-wrapper .pointer {
        width: 4rem;
        position: relative;
        animation: bounceUp 1s infinite;
    }
    .img-wrapper p {
        font-size: var(--14px);
        text-transform: uppercase;
        color: var(--color-country-text);
        padding: 0;
        margin: 0.25rem -1rem 0 0;
        font-family: var(--sans-narrow);
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
        z-index: 1000;
    }
    h2, .byline {
        color: var(--color-country-bg);
        background: rgba(45, 39, 36, 0.95);
        text-align: center;
        color: var(--color-country-bg);
        padding: 0.25rem 1rem;
        text-transform: uppercase;
        border-radius: 0.125rem;
        height: 2.5rem;
        line-height: 1.75;
        margin: 0.5rem 0;
        font-family: var(--sans-narrow);
    }
    h2 {
        font-size: var(--20px);
        height: 3rem;
        line-height: 1.75;
        clip-path: polygon(0 0, 99.5% 0, 100% 3rem, 0.5% 100%);
    }
    .byline {
        font-size: var(--14px);
        height: 2.25rem;
        line-height: 1.75;
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

    @media only screen and (max-width: 900px) {
        .subhed-wrapper {
            bottom: 1rem;
        }
        h2 {
            font-size: var(--16px); 
            height: 2.5rem;
            clip-path: polygon(0 0, 99.5% 0, 100% 2.5rem, 0.5% 100%);
        }
    }

    @media only screen and (max-width: 700px) {
        .svg-container {
            top: 0; 
        }
        .subhed-wrapper {
            bottom: -1.5rem;
        }
        h2 {
            font-size: var(--16px); 
            max-width: 80%;
            line-height: 1.25;
            height: 3.25rem;
            clip-path: polygon(0 0, 99.5% 0, 100% 3.25rem, 0.5% 100%);
        }
        .byline {
            font-size: var(--12px);
            height: 2rem;
            line-height: 1.75;
            clip-path: polygon(0.5% 0, 99.5% 0, 100% 2rem, 0 100%);
        }
        .img-wrapper .pointer {
            width: 3rem;
        }
        .img-wrapper p {
            font-size: var(--12px);
        }
    }
    @media only screen and (max-width: 500px) {
        .title-wrapper {
            top: 40%;
        }
        .subhed-wrapper {
            bottom: -5rem;
        }
        .img-wrapper {
            /* right: 2rem; */
            bottom: 1rem;
        }
        h2 {
            font-size: var(--16px); 
            max-width: 70%;
            line-height: 1.25;
            height: 4.25rem;
            clip-path: polygon(0 0, 99.5% 0, 100% 4.25rem, 0.5% 100%);
        }
    }
</style>
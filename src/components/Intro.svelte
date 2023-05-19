<script>
    import { getContext, onMount, tick } from "svelte";
    import title from "$svg/title_hero-bg.svg";
    import { select } from "d3";
    import { fade } from 'svelte/transition';

    const copy = getContext("copy");
    let w;
    let h;
    let scrollY;
    let star;

    export let value;

    $: console.log(value)

    onMount(async() => {
        await tick();
		star = select("#star");
        clickStar();
	})

    function jiggleStar() {
        star.transition()
            .delay(5000)
            .duration(100)
            .style("transform", "translate(1px, 0px)")
            .transition()
            .duration(100)
            .style("transform", "translate(0px, 0px)")
            .transition()
            .duration(100)
            .style("transform", "translate(1px, 0px)")
            .transition()
            .duration(100)
            .style("transform", "translate(0px, 0px)")
            .on("end",jiggleStar)
    }

    function clickStar() {
        jiggleStar();
        star.on("mouseover", function() {
            star.select("path").transition()
                .duration(250)
                .style("fill", "#3460E5")
            star.interrupt();
        })
        star.on("mouseout", function() {
            star.select("path").transition()
                .duration(250)
                .style("fill", "#2d2724")
        })
        star.on("click", function() {
            window.open("https://open.spotify.com/track/5ow9CpeIj5pVqESTNMs9Vm?si=0f1d80978dd748e1")
        })
    }
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} bind:scrollY/>

<section id="intro" class:visible={value == undefined}>
        <div class="title-wrapper" out:fade={{duration: 500}}>
            <div class="svg-container">
                {@html title}
            </div>
            <!-- <img class="sunburst" alt="letterpress sunburst texture" src="assets/images/bg-full.png" /> -->
            <img class="overlay" alt="lettepress texture" src="assets/images/letterpress-texture2.png">
            <img class="sunburst" alt="letterpress sunburst texture" src="assets/images/bg-texture.png" />
            <!-- <img class="title-text" alt=" title text: They Don't Play a Lady-O on Coutnry Radio" src="assets/images/bg-text.png" /> -->
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
    :global(#star) {
        cursor: pointer;
    }
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
        opacity: 0;
        transition: all 0.5s;
    }
    section.visible {
        opacity: 1;
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
    .sunburst {
        position: absolute;
        z-index: 998;
        width: 85vmin;
        height: 85vmin;
        object-fit: contain;
    }
    .overlay {
        position: absolute;
        z-index: 999;
        height: 100%;
    }
    .title-text {
        position: absolute;
        top: 0;
        z-index: 1000;
    }
    .svg-container {
        width: 100%;
        position: absolute;
        top: 0;
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
    :global(.byline a:hover) {
        color: var(--color-country-tan);
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
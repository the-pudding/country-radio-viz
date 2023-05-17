<script>
	import { getContext, onMount } from "svelte";
	import Header from "$components/Header.svelte";
	import Intro from "$components/Intro.svelte";
	import SanAntoDivs from "$components/SanAntoDivs.svelte";
	import CanvasBlockChart from "$components/CanvasBlockChart.svelte";
	import RepresentativeBlockChart from "$components/RepresentativeBlockChart.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import PostScrolly from "$components/PostScrolly.svelte";
	import Dashboard from "$components/Dashboard.svelte";
	import Methods from "$components/Methods.svelte";
	import Footer from "$components/Footer.svelte";

	const data = getContext("data");
	const copy = getContext("copy");
	const startingStation = "SanAntonio_KCYY-FM";

	const spacingX = 2;
	const spacingY = 1;

	let value;
	let blockH;
	let w;
	let h;
	let stickyOpacity;
	let scrollY;
	let scrollDir;
	let lastY;

	onMount(() => {
		blockH = h > 1000 ? 3 : 2;
	})

	function checkScrollY(scrollY) {
        if (scrollY) {
            scrollDir = scrollY > lastY ? "down" : "up"
            lastY = scrollY;
        }
    }

	function calcOpacity(value) { 
		stickyOpacity = value >= 10 || value == undefined && scrollY > 1000 ? 0 : 1; 
	}

	$: value, calcOpacity(value)
	$: scrollY, checkScrollY(scrollY)
</script>

<!-- <div id="tooltip">
	<p id="tt-station">Station</p>
	<p id="tt-date">Date</p>
	<p id="tt-time">Time</p>
	<p id="tt-artist">Artist</p>
	<p id="tt-title">Title</p>
</div> -->

<svelte:window bind:innerWidth={w} bind:innerHeight={h} bind:scrollY/>
<Header />
<section id="scrolly">
	<div class="sticky" style="opacity:{stickyOpacity}">
		<Intro {value}/>
		<img class="overlay" alt="lettepress texture" src="assets/images/letterpress-texture2.png">
		<SanAntoDivs startingStation={startingStation} value={value} />
		{#if blockH}
			<RepresentativeBlockChart startingStation={startingStation} value={value} blockH={blockH} spacingX={spacingX} spacingY={spacingY} />
			<CanvasBlockChart startingStation={startingStation} value={value} blockH={blockH} spacingX={spacingX} spacingY={spacingY} posType="absolute" />
		{/if}
	</div>
	<Scrolly bind:value>
		{#each copy.scrolly as text, i}
			{@const active = value === i}
			<div class="step" class:active>
				<p>{@html text.value}</p>
			</div>
		{/each}
	</Scrolly>
	<div class="spacer" />
</section>
<PostScrolly />
<div id="dashboard-container">
	{#if blockH}
		<Dashboard blockH={blockH} spacingX={spacingX} spacingY={spacingY}/>
	{/if}
</div>
<Methods />
<Footer />

<style>
	.sticky {
		position: sticky;
		top: 0.25rem;
		transition: all 1s;
	}
	.step {
		max-width: 500px;
		margin: 80vh auto;
		text-align: center;
		background: white;
		color: var(--color-fg);
		z-index: 1000;
	}
	.step:first-of-type {
		margin: 0 auto 80vh auto;
	}
	.step:last-of-type {
		margin: 80vh auto 0 auto;
	} 
	.step p {
		padding: 2rem;
		text-align: left;
		line-height: 1.6;
		font-family: var(--sans);
		font-size: var(--18px);
		line-height: 1.65;
	}
	.spacer {
		height: 75vh;
	}
	.overlay {
		position: absolute;
		top: 3rem;
		width: 100%;
		height: 100vh;
		z-index: 999;
		opacity: 0.15;
		pointer-events: none;
	}

	:global(.women-span) {
		color: var(--color-white);
		font-weight: 700;
		background-color: var(--color-country-blue);
		padding: 0.125rem 0.25rem;
		box-decoration-break:clone;
	}

	:global(.men-span) {
		color: var(--color-white);
		font-weight: 700;
		background-color: var(--color-country-dark-brown);
		padding: 0.125rem 0.25rem;
		box-decoration-break:clone;
	}

	:global(.mixed-span) {
		color: var(--color-country-text);
		font-weight: 700;
		background-color: var(--color-country-orange);
		padding: 0.125rem 0.25rem;
		box-decoration-break:clone;
	}

	:global(.song-span) {
		color: var(--color-country-text);
		font-weight: 700;
		background-color: var(--color-country-tan);
		padding: 0.125rem 0.25rem;
		box-decoration-break:clone;
	}

	:global(.prose) {
		color: var(--color-country-text);
		font-size: var(--18px);
		line-height: 1.65;
	}

	:global(.prose p) {
		padding: 0.5rem 0;
	}

	@media only screen and (max-width: 700px) {
		.step p {
			font-size: var(--16px);
		}
	}

</style>

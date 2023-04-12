<script>
	import { getContext } from "svelte";
	// import ButtonSet from "$components/helpers/ButtonSet.svelte";
	// import BlockChart from "$components/BlockChart.svelte";
	// import SXSWChart from "$components/SXSWChart.svelte";
	import Intro from "$components/Intro.svelte";
	import SanAntoDivs from "$components/SanAntoDivs.svelte";
	import CanvasBlockChart from "$components/CanvasBlockChart.svelte";
	import RepresentativeBlockChart from "$components/RepresentativeBlockChart.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import PostScrolly from "$components/PostScrolly.svelte";
	import Dashboard from "$components/Dashboard.svelte";

	const data = getContext("data");
	const copy = getContext("copy");
	const startingStation = "SanAntonio_KCYY-FM";

	const blockH = 3;
	const spacingX = 2;
	const spacingY = 1;

	let value;
</script>

<div id="tooltip">
	<p id="tt-station">Station</p>
	<p id="tt-date">Date</p>
	<p id="tt-time">Time</p>
	<p id="tt-artist">Artist</p>
	<p id="tt-title">Title</p>
</div>

<Intro />
<section id="scrolly">
	<div class="sticky">
		<p>{value}</p>
		<SanAntoDivs startingStation={startingStation} value={value} blockH={blockH} spacingX={spacingX} spacingY={spacingY}/>
		<RepresentativeBlockChart startingStation={startingStation} value={value} blockH={blockH} spacingX={spacingX} spacingY={spacingY}/>
		<CanvasBlockChart startingStation={startingStation} value={value} blockH={blockH} spacingX={spacingX} spacingY={spacingY}/>
	</div>
	<Scrolly bind:value top={0}>
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
<Dashboard startingStation={startingStation} blockH={blockH} spacingX={spacingX} spacingY={spacingY}/>
<!-- <nav>
	<ButtonSet legend={"Color songs by"} {options} bind:value />
</nav> -->
<!-- {#each SXSWStations as station}
	<div class="SXSW-charts">
		{#each chartVars as chart}
			<SXSWChart variable={chart.var} title={chart.title} station={station} />
		{/each}
	</div>
{/each} -->
<!-- {#each data as stationName}
	<BlockChart stationName={stationName} value={value}/>
{/each} -->
<!-- <Footer /> -->

<style>
	.sticky {
		position: sticky;
		top: 0;
	}
	.sticky section {
		position: absolute;
	}
	.step {
		max-width: 500px;
		margin: 80vh auto;
		text-align: center;
		background: white;
		color: var(--color-fg);
		z-index: 1000;
		pointer-events: none;

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
		font-family: var(--sans)
	}
	.spacer {
		height: 75vh;
	}

	#tooltip {
		position: sticky;
		top: 3rem;
		bottom: 0;
		z-index: 1000;
		display: none;
	}

	:global(.step .women-span) {
		color: var(--color-white);
		font-weight: 700;
		background-color: var(--color-country-blue);
		padding: 0.125rem 0.25rem;
		white-space: nowrap;
	}

	:global(.step .men-span) {
		color: var(--color-white);
		font-weight: 700;
		background-color: var(--color-country-brown);
		padding: 0.125rem 0.25rem;
		white-space: nowrap;
	}

	:global(.step .mixed-span) {
		color: var(--color-white);
		font-weight: 700;
		background-color: var(--color-country-orange);
		padding: 0.125rem 0.25rem;
		white-space: nowrap;
	}

	:global(.step .song-span) {
		color: var(--color-country-text);
		font-weight: 700;
		background-color: var(--color-country-tan);
		padding: 0.125rem 0.25rem;
		white-space: nowrap;
	}
</style>

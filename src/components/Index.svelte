<script>
	import { getContext } from "svelte";
	import ButtonSet from "$components/helpers/ButtonSet.svelte";
	import BlockChart from "$components/BlockChart.svelte";
	import SXSWChart from "$components/SXSWChart.svelte";
	import SanAntoDivs from "$components/SanAntoDivs.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";

	const data = getContext("data");
	const copy = getContext("copy");
	const startingStation = "SanAntonio_KCYY-FM";
	// const SXSWStations = ["KASE-FM", "KVET-FM"]
	// const chartVars = [
	// 	{var: "b2b_gender", title: "Back-to-back (B2B) songs by women artists"},
	// 	{var: "b2b_collabGender", title: "Back-to-back (B2B) songs by women artists + women/men collaborations"},
	// 	{var: "b2b_combinedGender", title: "Back-to-back (B2B) songs by women artists + all mixed-gender artists"},
	// 	{var: "b2b_raceGender", title: "Back-to-back (B2B) songs by artists of color"},
	// 	{var: "b2b_lgbtq", title: "Back-to-back (B2B) songs by out LGBTQ+ artists"}
	// ];

	// const options = [
	// 	{ value: "B2B Gender" },
	// 	{ value: "B2B Gender Women+Mixed"},
	// 	{ value: "Gender Only" }
	// ];

	let value;
</script>

<!-- <div id="tooltip">
	<p id="tt-station">Station</p>
	<p id="tt-date">Date</p>
	<p id="tt-time">Time</p>
	<p id="tt-artist">Artist</p>
	<p id="tt-title">Title</p>
</div> -->

<section id="scrolly">
	<div class="sticky">
		<h2>Scrolly <span>{value}</span></h2>
		<SanAntoDivs startingStation={startingStation} value={value}/>
	</div>
	<Scrolly bind:value>
		{#each copy.prose as text, i}
			{@const active = value === i}
			<div class="step" class:active>
				<p>{text.value}</p>
			</div>
		{/each}
	</Scrolly>
	<div class="spacer" />
</section>
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
	.step {
		max-width: 500px;
		margin: 80vh auto;
		text-align: center;
		background: white;
		color: var(--color-fg);
	}
	.step:first-of-type {
		margin-top: 0;
	}
	.step p {
		padding: 2rem;
		text-align: left;
		line-height: 1.6;
	}
	:global(.step p span) {
		font-weight: 700;
		font-family: sans-serif;
		color: #10a2ee;
	}
	.spacer {
		height: 75vh;
	}
</style>

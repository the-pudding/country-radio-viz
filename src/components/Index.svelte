<script>
	import { getContext } from "svelte";
	import ButtonSet from "$components/helpers/ButtonSet.svelte";
	import BlockChart from "$components/BlockChart.svelte";
	import SXSWChart from "$components/SXSWChart.svelte";

	const data = getContext("data");
	const SXSWStations = ["KASE-FM", "KVET-FM"]
	const chartVars = [
		{var: "b2b_gender", title: "Back-to-back (B2B) songs by women artists"},
		{var: "b2b_collabGender", title: "Back-to-back (B2B) songs by women artists + women/men collaborations"},
		{var: "b2b_combinedGender", title: "Back-to-back (B2B) songs by women artists + all mixed-gender artists"},
		{var: "b2b_raceGender", title: "Back-to-back (B2B) songs by artists of color"},
		{var: "b2b_lgbtq", title: "Back-to-back (B2B) songs by out LGBTQ+ artists"}
	];

	const options = [
		{ value: "B2B Gender" },
		{ value: "B2B Gender Women+Mixed"},
		{ value: "Gender Only" }
	];

	let value;
</script>

<div id="tooltip">
	<p id="tt-station">Station</p>
	<p id="tt-date">Date</p>
	<p id="tt-time">Time</p>
	<p id="tt-artist">Artist</p>
	<p id="tt-title">Title</p>
</div>

<!-- <nav>
	<ButtonSet legend={"Color songs by"} {options} bind:value />
</nav> -->
{#each SXSWStations as station}
	<div class="SXSW-charts">
		{#each chartVars as chart}
			<SXSWChart variable={chart.var} title={chart.title} station={station} />
		{/each}
	</div>
{/each}
<!-- {#each data as stationName}
	<BlockChart stationName={stationName} value={value}/>
{/each} -->
<!-- <Footer /> -->

<style>
	.SXSW-charts {
		width: 100%;
		max-width: 80rem;
		margin: 0 auto;
		padding: 2rem;
	}
	#tooltip {
		position: fixed;
		top: 0;
		left: 0;
		opacity: 0;
		background: var(--color-white);
		border: 1px solid var(--color-gray-900);
		padding: 1rem;
		font-family: var(--sans);
		font-size: var(--14px);
		max-width: 30rem;
		z-index: 1000;
	}

	#tooltip p {
		margin: 0;
	}

	nav {
		margin: 0 auto;
		width: 50%;
		display: flex;
		justify-content: center;
		position: sticky;
		top: 0;
	}
</style>

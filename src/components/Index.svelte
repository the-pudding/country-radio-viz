<script>
	import { getContext } from "svelte";
	import ButtonSet from "$components/helpers/ButtonSet.svelte";
	import BlockChart from "$components/BlockChart.svelte";
	import SXSWChart from "$components/SXSWChart.svelte";

	const data = getContext("data");
	const SXSWStations = ["KASE-FM", "KVET-FM"]
	const chartVars = [
		{var: "b2b_gender", title: "Back-to-back women-only songs"},
		{var: "b2b_collabGender", title: "Back-to-back women + women/men collab songs"},
		{var: "b2b_combinedGender", title: "Back-to-back women + all mixed-gender songs"},
		{var: "b2b_race", title: "Back-to-back POC songs"},
		{var: "b2b_raceGender", title: "Back-to-back women of color songs"},
		{var: "b2b_lgbtq", title: "Back-to-back LGBTQ+ songs"}
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

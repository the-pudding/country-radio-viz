<script>
	import { getContext } from "svelte";
	import ButtonSet from "$components/helpers/ButtonSet.svelte";
	import BlockChart from "$components/BlockChart.svelte";

	const data = getContext("data");

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

<nav>
	<ButtonSet legend={"Color songs by"} {options} bind:value />
</nav>
{#each data as stationName}
	<BlockChart stationName={stationName} value={value}/>
{/each}
<!-- <Footer /> -->

<style>
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

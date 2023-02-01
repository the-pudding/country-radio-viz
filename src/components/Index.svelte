<script>
	import { getContext } from "svelte";
	import BlockChart from "$components/BlockChart.svelte";

	const data = getContext("data");
	//console.log()
</script>

<div id="tooltip">
	<p id="tt-date">Date</p>
	<p id="tt-time">Time</p>
	<p id="tt-artist">Artist</p>
	<p id="tt-title">Title</p>
</div>

{#each data as stationName}
	<BlockChart stationName={stationName}/>
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
		max-width: 20rem;
	}

	#tooltip p {
		margin: 0;
	}
</style>

<script>
	import { getContext } from "svelte";
	import BlockChart from "$components/BlockChart.svelte";
	import summaryData from "$data/summary.csv";

	console.log(summaryData);


	const stationList = ["SanAntonio_KAJA-FM", "Nashville_WSM-FM"]
</script>

<div id="tooltip">
	<p id="tt-date">Date</p>
	<p id="tt-time">Time</p>
	<p id="tt-artist">Artist</p>
	<p id="tt-title">Title</p>
</div>
<BlockChart stationName={"Austin_KASE-FM"}/>
<BlockChart stationName={"Austin_KVET-FM"}/>
<BlockChart stationName={"Charlotte_WKKT-FM"}/>
<BlockChart stationName={"Charlotte_WSOC-FM"}/>
<BlockChart stationName={"Cincinnati_WNNF-FM"}/>
<BlockChart stationName={"Cincinnati_WUBE-FM"}/>
<BlockChart stationName={"Cincinnati_WYGY-FM"}/>
<BlockChart stationName={"Columbus_WCOL-FM"}/>
<BlockChart stationName={"Greensboro_WPAW-FM"}/>
<BlockChart stationName={"Greensboro_WTQR-FM"}/>
<BlockChart stationName={"Indianapolis_WFMS-FM"}/>
<BlockChart stationName={"Indianapolis_WLHK-FM"}/>
<BlockChart stationName={"KansasCity_KBEQ-FM"}/>
<BlockChart stationName={"KansasCity_KFKF-FM"}/>
<BlockChart stationName={"KansasCity_WDAF-FM"}/>
<BlockChart stationName={"Nashville_WKDF-FM"}/>
<BlockChart stationName={"Nashville_WSM-FM"}/>
<BlockChart stationName={"SanAntonio_KAJA-FM"}/>
<BlockChart stationName={"SanAntonio_KCYY-FM"}/>
<BlockChart stationName={"Tampa_WFUS-FM"}/>
<BlockChart stationName={"Tampa_WQYK-FM"}/>
<!-- <Footer /> -->

<style>
	#tooltip {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		background: var(--color-white);
		border: 1px solid var(--color-gray-900);
		padding: 1rem;
		font-family: var(--sans);
		font-size: var(--14px);
	}

	#tooltip p {
		margin: 0;
	}
</style>

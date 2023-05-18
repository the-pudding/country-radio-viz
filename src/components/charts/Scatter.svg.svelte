<script>
	import { getContext } from "svelte";

	const { data, xGet, yGet, xScale, yScale } = getContext("LayerCake");

	export let r = 7;

	let scatterData = $data;
	let filterData = scatterData.map((d,i) => {
		return {
		value: d.values[0].value,
		date: d.values[0].year
		}
	});
</script>

<g class="dots-group">
	{#each filterData as d, i}
		{@const cx = $xGet(d)}
		{@const cy = $yGet(d)}
		<circle {cx} {cy} {r} id='circle-{i}' class='circle'/>
	{/each}
</g>

<style>
	circle {
		stroke: var(--color-country-bg);
		stroke-width: 2;
	}
	#circle-0 {
		display: none;
	}
	#circle-1 {
		fill: #3460E5;
	}
	#circle-2 {
		fill: #A18D7E;
	}
	#circle-3 {
		fill: #fda922;
	}
</style>

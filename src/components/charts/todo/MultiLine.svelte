<!--
	@component
	Generates an SVG multi-series line chart. It expects your data to be an array of objects, each with a `values` key that is an array of data objects.
 -->
<script>
	import { getContext } from 'svelte';
	import { draw } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';
	import { selectAll } from "d3";

	const { data, xGet, yGet, zGet, xScale, yScale, xRange, yRange } = getContext('LayerCake');
	// export let drawIn

	$: path = values => {
		return 'M' + values
			.map(d => {
				return $xGet(d) + ',' + $yGet(d);
			})
			.join('L');
	};

	// function popStat() {
	// 	const labels = selectAll("#line-chart .label")
	// 	labels.transition()
	// 		.delay(1000)
	// 		.duration(500)
	// 		.style("opacity", 1);
	// }
</script>

<!-- <g class="bg-block">
	<rect x="{blockWStart}" width="{blockWidth}" height="360"/>
</g> -->
<g class="line-group">
	{#each $data as group}
		<path
			class='path-line'
			d='{path(group.values.slice(0,2))}'
			stroke="{$zGet(group)}"
			stroke-dasharray="4 4"
		></path>
	{/each}
</g>

<style>
	.path-line {
		fill: none;
		stroke-width: 3px;
	}
	rect {
		fill: var(--color-country-tan);
		opacity: 0.3;
		mix-blend-mode: multiply;
	}
</style>

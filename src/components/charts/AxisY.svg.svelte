<script>
	import { getContext } from "svelte";

	const { padding, xRange, yScale } = getContext("LayerCake");

	export let gridlines = true;
	export let tickMarks = false;
	export let xTick = 0;
	export let yTick = 0;
	export let dxTick = 0;
	export let dyTick = -4;
	export let textAnchor = "start";
	export let formatTick = (d) => d;
	export let ticks = 4;
	/** If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return. */

	$: tickVals = Array.isArray(ticks)
		? ticks
		: typeof ticks === "function"
		? ticks($yScale.ticks())
		: $yScale.ticks(ticks);
</script>

<g class="axis y-axis" transform="translate({-$padding.left}, 0)">
	{#each tickVals as tick}
		<g
			class="tick tick-{tick}"
			transform="translate({$xRange[0]}, {$yScale(tick)})"
		>
			{#if gridlines !== false}
				<line class="gridline" x2="100%" y1={yTick} y2={yTick} />
			{/if}
			{#if tickMarks === true}
				<line class="tick-mark" x1="0" x2={6} y1={yTick} y2={yTick} />
			{/if}
			<text
				x={xTick}
				y={yTick}
				dx={dxTick}
				dy={dyTick}
				style="text-anchor:{textAnchor};">{formatTick(tick)}</text
			>
		</g>
	{/each}
</g>

<style>
	.tick {
		font-size: var(--14px);
		font-weight: 500;
	}

	.tick line {
		stroke: var(--color-country-tan);
	}

	.tick text {
		fill: var(--color-country-text);
		font-family: var(--sans-narrow);
	}
</style>

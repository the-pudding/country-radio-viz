<script>
	import { onMount } from "svelte";
	import { select, selectAll } from "d3";

	export let i;
	export let songClass;
	export let songHeight;
	export let value;
	export let w;

	let left;
	let bottom;
	let width;
	let height;
	let opacity;
	let scale;
	let marginLeft;
	let transitionMain;
	let transitionBlock;
	let transitionMargin;
	let delay;
	let marginDelay;
	let scrollY;
	let scrollDir;
	let lastY;
	let blockH;
	let h;

	onMount(() => {
		blockH = h > 1000 ? 3 : 2;
	})

	function calcOpacity(i, value) {
		opacity = 1 == 136 ? 1 : 0;
		if (i == 136) {
			opacity = 1;
		} else {
			if (value >= 1 && value <= 2) {
				opacity = i >= 136 && i <= 184 ? 1 : 0;
			} else if (value == 3) {
				opacity = i >= 136 && i <= 273 ? 1 : 0;
			} else if (value >= 4) {
				opacity = 1;
			}
		}
	}

	function calcBlockDelay(i, value) {
		if (value == 1 && i >= 136 && i <= 184) {
			if (scrollDir !== "up") {
				delay = ((i-136)*0.05)+1;
			} else {
				delay = 0.5;
			}
		} else if (value == 3 && i >= 136 && i <= 273) {
			if (scrollDir !== "up") {
				delay = ((i-184)*0.05)+1;
			} else {
				delay = 0.5;
			}
		} else {
			delay = 0.5;
		}
		return delay
	}

	function calcMargin(i, value) {
		if (value == 3 && i == 273) {
			marginLeft = "25%";
			scale = 1.5;
		} else if (value == 4) {
			marginLeft = "25%";
			scale = 1.5;
		} else {
			marginLeft = 0;
			scale = 1;
		}
	}

	function calcMarginDelay(value) {
		if (value == 4) {
			marginDelay = 5
		}
	}

	function showLabels(value) {
		if (value == 3) {
			select(".song-272").classed("show-label", true)
		} else if (value == 4) {
			selectAll(".song-4, .song-73, .song-272").classed("show-label", true)
		} else {
			selectAll(".song-4, .song-73, .song-272").classed("show-label", false)
		}
	}

	function checkScrollY(scrollY) {
        if (scrollY) {
            scrollDir = scrollY > lastY ? "down" : "up"
            lastY = scrollY;
        }
    }

	$: left = value == 0 || value == undefined ? `${w/2-100-32}px` : 0;
	$: bottom = value == undefined ? "-2000px" : 0;
	$: width = value == 0 || value == undefined  ? "200px" : "100%";
	$: height = value == 0 || value == undefined ? "200px" : `${blockH}px`;
	$: transitionMain = value == 1 ? "height 1s, width 1s 1s, left 1s 1s" : "all 1s";
	$: transitionBlock = value == 2 || value == 4 || scrollDir == "up" ? "opacity 0.5s" : "opacity 0s";

	$: value, showLabels(value);
	$: value, calcOpacity(i, value);
	$: value, calcBlockDelay(i, value);
	$: value, calcMargin(i, value);
	$: value, calcMarginDelay(value);
	$: scrollY, checkScrollY(scrollY)
</script>

<svelte:window bind:innerHeight={h} bind:scrollY/>

{#if i == 136}
	<div class="song song-{i} song-{songClass}" 
		style="height: {height}px; 
		opacity: {opacity};
		left: {left};
		bottom: {bottom};
		width: {width};
		height: {height};
		transition: {transitionMain}">
	</div>
{:else if i == 5 || i == 74 || i == 273}
	<div class="song song-{i} song-{songClass}" 
		style="height: {songHeight}px; 
		opacity: {opacity};
		transform: scaleX({scale});
		margin-left: {marginLeft};
		transition: {transitionBlock} {delay}s, scaleX 1s 5s, margin-left 0s">
	</div>
{:else}
	<div class="song song-{i} song-{songClass}" 
		style="height: {songHeight}px; 
		opacity: {opacity};
		margin-left: 0;
		transition: {transitionBlock} {delay}s">
	</div>
{/if}


<style>
	.song {
        width: 100%;
        margin: 0 0 1px 0;
        background: var(--color-country-tan);
		transition: all 0.5s;
		opacity: 0;
    }
	.song-B2Bmen{
		background: var(--color-country-brown);
	}
	.song-B2Bwomen{
		background: var(--color-country-blue);
	}
	.song-B2Bmixed{
		background: var(--color-country-orange);
	}
    .song-4, .song-73, .song-272 {
        position: relative;
    }    
    .song-4::after {
        position: absolute;
        width: 30rem;
        max-width: 30rem;
        top: 0.25rem;
        left: calc(100% + 0.25rem);
        content: '12:16am: Miranda Lambert "If I Was A Cowboy"';
        font-family: var(--sans-narrow);
        color: var(--color-country-blue);
        font-weight: 700;
        font-size: var(--14px);
        opacity: 0;
    }
    .song-73::after {
        position: absolute;
        width: 30rem;
        max-width: 30rem;
        top: 0.25rem;
        left: calc(100% + 0.25rem);
        content: '4:18am: Carly Pearce & Ashley McBryde "Never Wanted To Be That Girl"';
        font-family: var(--sans-narrow);
        color: var(--color-country-blue);
        font-weight: 700;
        font-size: var(--14px);
        opacity: 0;
    }
    .song-272::after {
        position: absolute;
        width: 30rem;
        max-width: 30rem;
        top: 0.25rem;
        left: calc(100% + 0.25rem);
        content: '5:51pm: Priscilla Block "Just About Over You"';
        font-family: var(--sans-narrow);
        color: var(--color-country-blue);
        font-weight: 700;
        font-size: var(--14px);
        opacity: 0;
    }
	.song-136 {
        background: "#e1d4ca";
        background: url("https://the-pudding.github.io/country-radio-viz/assets/images/brooks-and-dunn-bw.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        position: relative;
        border: 1px solid var(--color-country-tan);
    }

	.show-label::after  {
        opacity: 1
    }
</style>
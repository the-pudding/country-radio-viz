<script>
	import wordmark from "$svg/wordmark.svg";
	import Tip from "$components/helpers/Tip.svelte";
</script>

<header>
	<div class="wordmark">
		<a href="https://pudding.cool" aria-label="The Pudding" target="_self">{@html wordmark}</a>
	</div>
	<div class="tip_container">
		<Tip />
	</div>
</header>

<style>
	header {
		z-index: 1000;
		position: absolute;
		width: 100%;
	}
	.wordmark {
		max-width: 10em;
		margin: 0 auto;
		padding: 1em 0;
	}

	.wordmark a {
		border: none;
		display: block;
		color: var(--color-fg);
	}

	.wordmark a:hover {
		background-color: transparent;
	}

	:global(.wordmark svg path) {
		fill: var(--color-country-text);
		stroke: none;
	}

	@media only screen and (max-width: 500px) {
        .wordmark {
			max-width: 8em;
		}
    }
</style>

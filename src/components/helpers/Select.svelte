<script>
	import summaryData from "$data/summary.csv";

	export let options = [];
	export let label = "Choose a station";
	export let disabled = false;
	export let value = options.length ? options[0].value : "";

	const id = `station-city`;
</script>

<div class="select" aria-label={id}>
	{#if label}
		<label for={id}>{label}</label>
	{/if}
	<select {id} bind:value {disabled} aria-label={label} aria-labelledby="station dropdown">
		{#each options as option}
			<option>{option}</option>
		{/each}
	</select>
</div>

<style>
	.select {
		position: relative;
	}

	label {
		display: inline-block;
		font-family: inherit;
		font-weight: inherit;
		font-size: var(--14px);
		font-family: var(--sans-narrow);
		margin-bottom: 0.25em;
		color: var(--color-country-dark-brown);
	}

	select {
		width: 100%;
		height: 50px;
		font-family: inherit;
		font-size: 1em;
		cursor: pointer;
		background: var(--color-white);
		color: var(--color-gray-900);
		border: 2px solid var(--color-gray-900);
		border-radius: 4px;
		padding: 0.5em;
		appearance: none;
		line-height: 1.4;
	}

	select::-ms-expand {
		display: none;
	}

	.select::after {
		display: block;
		content: "";
		position: absolute;
		bottom: 1.25em;
		right: 0.75em;
		width: 1em;
		height: 1em;
		z-index: 1;
		background: var(--color-gray-900);
		clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
		border-radius: 4px;
		transform-origin: center center;
		transform: rotate(-45deg);
		pointer-events: none;
	}

	select:hover {
		background: var(--color-gray-100);
	}

	select:focus {
		box-shadow: 0 0 4px 0 var(--color-focus);
	}

	.select:disabled {
		cursor: not-allowed;
		background-color: var(--color-gray-300);
	}
	@media only screen and (max-width: 500px) {
        select {
            font-size: var(--14px);
        }
    }
</style>

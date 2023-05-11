<script>
	import * as d3 from "d3";
	export let options = [];
	export let legend = "";
	export let legendPosition = "top";
	export let labelClass = "";
	export let disabled = false;
	export let buttonVal = options.length ? options[0].value : "";

	const id = `legend-${Math.floor(Math.random() * 1000000)}`;
	const makeSlug = (str = "") => `${str}`.toLowerCase().replace(/\W/g, "");

	$: optionsWithSlug = options.map((d) => ({
		...d,
		val: d.value,
		slug: makeSlug(d.value)
	}));
	$: isTop = legendPosition === "top";
</script>

<div class="button-set">
	<div
		id={`group-${id}`}
		class="group"
		class:is-top={isTop}
		role="radiogroup"
		aria-labelledby={`label-${id}`}
	>
		{#if legend}<div class="legend" id="legend-{id}">{legend}</div>{/if}
		<div class="options">
			{#each optionsWithSlug as option}
				<div class="option">
					<input
						type="radio"
						id={`${id}-${option.slug}`}
						name="name-{id}"
						class="sr-only"
						value={option.value}
						{disabled}
						bind:group={buttonVal}
					/>
					<label class="option {labelClass}" for={`${id}-${option.slug}`}>
						{option.label || option.value}
					</label>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.button-set {
		display: inline-block;
		margin-bottom: 4px;
		font-family: var(--sans);
		width: 100%;
		flex-grow: 1;
		font-family: var(--sans-narrow);
	}

	.group {
		display: flex;
		flex-grow: 1;
	}

	.group.is-top {
		flex-direction: column;
	}

	.is-top .legend {
		padding-bottom: 0.5em;
		padding-right: 0;
	}

	.legend {
		padding-right: 0.5em;
		font-size: 1em;
	}

	.options {
		display: flex;
		width: 100%;
		justify-content: space-between;
		/* flex-direction: column; */
	}

	label {
		appearance: none;
		user-select: none;
		line-height: 1;
		margin: 0 0.25rem 0.5rem 0;
		padding: 0.5em 0.75rem;
		border-radius: 4px;
		border: 2px solid var(--color-country-text);
		outline: none;
		cursor: pointer;
		font-family: inherit;
		font-size: var(--12px);
		display: inline-block;
	}

	input[type="radio"] + label {
		background: var(--color-white);
		color: var(--color-country-text);
	}

	input[type="radio"]:checked + label,
	input[type="radio"]:checked:hover + label {
		background: var(--color-country-text);
		color: var(--color-white);
	}

	input[type="radio"]:hover + label {
		background: var(--color-country-text);
		color: var(--color-white);
	}

	input[type="radio"]:focus + label {
		box-shadow: 0 0 4px 0 var(--color-focus);
	}

	input[type="radio"]:disabled + label {
		color: var(--color-country-brown);
		background: var(--color-country-tan);
		cursor: not-allowed;
	}
</style>

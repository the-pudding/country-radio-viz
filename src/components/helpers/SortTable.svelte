<script>
	import { createEventDispatcher } from "svelte";
	export let caption = "";
	export let rows = []; // [{ class, style }]
	export let columns = []; // [{ label, prop, sort = true, type = "text", dir = undefined, sortFn: undefined }];

	const dispatch = createEventDispatcher();

	const sortFn = {
		asc: (a, b) =>
			a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN,
		desc: (a, b) =>
			a == null || b == null ? NaN : b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN
	};

	const onSort = ({ prop, i, same }) => {
		const dir = th[i].dir;
		const newDir = same ? dir : dir === "asc" ? "desc" : "asc";
		const customSort = th[i].sortFn;

		th.forEach((d) => (d.dir = undefined));
		th[i].dir = newDir;
		th = [...th];

		tr.sort((a, b) =>
			customSort
				? customSort(a, b, sortFn[newDir])
				: sortFn[newDir](a[prop], b[prop])
		);
		tr = [...tr];
	};

	const autoSort = () => {
		const match = th.find((d) => d.dir);
		if (match) {
			const { prop, i } = match;
			const same = true;
			onSort({ prop, i, same });
		}
	};

	$: th = columns.map((d, i) => ({ sort: true, type: "text", ...d, i }));
	$: tr = rows.map((d) => ({
		...d,
		style: d.style || "",
		class: d.class || ""
	}));
	$: autoSort(tr);
</script>

<table>
	<caption>{caption}</caption>
	<thead>
		<tr>
			{#each th as { label, prop, type, sort, dir }, i}
				<th
					class:is-sortable={sort}
					class:is-number={type === "number"}
					class:is-asc={dir === "asc"}
					class:is-desc={dir === "desc"}
				>
					{#if sort}
						<button on:click={() => onSort({ prop, i })}>{label}</button>
					{:else}
						{label}
					{/if}
				</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each tr as r}
			<tr on:click={() => dispatch("chart", r)}>
				{#each columns as { prop, type }}
					<td
						style={r.style}
						class={r.class}
						class:is-number={type === "number"}
					>
						{@html r[prop]}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		width: 100%;
		margin: 0 auto;
		table-layout: auto;
		color: var(--color-country-text);
	}

	thead:first-of-type {
		border-bottom: 1px solid var(--color-country-text);
	}

	th.is-number,
	td.is-number {
		text-align: right;
	}

	th,
	td {
		vertical-align: bottom;
		line-height: 1.2;
		font-weight: normal;
		padding: 0.75rem;
		text-align: right;
	}
	tr th, td:first-of-type {
		text-align: left;
	}
	th {
		font-weight: 700;
	}
	th:nth-of-type(1), th:nth-of-type(3), td:nth-of-type(1), td:nth-of-type(3) {
		border-right: 1px solid var(--color-country-text);
	}

	tr:nth-of-type(1) td:nth-of-type(3), tr:nth-of-type(1) td:nth-of-type(5), tr:nth-of-type(1) td:nth-of-type(7), tr:nth-of-type(1) td:nth-of-type(9) {
		background: var(--color-country-blue);
		color: var(--color-country-bg);
		font-weight: 700;
		position: relative;
		border-radius: 0.125rem;
	} 
	tr:nth-of-type(1) td:nth-of-type(3)::before, tr:nth-of-type(1) td:nth-of-type(5)::before, tr:nth-of-type(1) td:nth-of-type(7)::before, tr:nth-of-type(1) td:nth-of-type(9)::before {
		content: "";
        background-image: url("/assets/images/letterpress-texture1.png");
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        opacity: 0.125;
	}
	tr:nth-of-type(2) td:nth-of-type(3), tr:nth-of-type(2) td:nth-of-type(5), tr:nth-of-type(2) td:nth-of-type(7), tr:nth-of-type(2) td:nth-of-type(9) {
		background: var(--color-country-brown);
		color: var(--color-country-bg);
		font-weight: 700;
		position: relative;
		border-radius: 0.125rem;
	}
	tr:nth-of-type(2) td:nth-of-type(3)::before, tr:nth-of-type(2) td:nth-of-type(5)::before, tr:nth-of-type(2) td:nth-of-type(7)::before, tr:nth-of-type(2) td:nth-of-type(9)::before {
		content: "";
        background-image: url("/assets/images/letterpress-texture2.png");
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        opacity: 0.125;
	}
	tr:nth-of-type(3) td:nth-of-type(3), tr:nth-of-type(3) td:nth-of-type(5), tr:nth-of-type(3) td:nth-of-type(7), tr:nth-of-type(3) td:nth-of-type(9) {
		background: var(--color-country-orange);
		font-weight: 700;
		position: relative;
		border-radius: 0.125rem;
	}
	tr:nth-of-type(3) td:nth-of-type(3)::before, tr:nth-of-type(3) td:nth-of-type(5)::before, tr:nth-of-type(3) td:nth-of-type(7)::before, tr:nth-of-type(3) td:nth-of-type(9)::before {
		content: "";
        background-image: url("/assets/images/letterpress-texture3.png");
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        opacity: 0.125;
	}
	tr:nth-of-type(1) td:nth-of-type(1), tr:nth-of-type(2) td:nth-of-type(1), tr:nth-of-type(3) td:nth-of-type(1) {
		width: 5rem;
	}

	td {
		border-top: 1px solid var(--color-country-text);
	}

	th button {
		font-weight: inherit;
		color: inherit;
		padding: 0;
		margin: 0;
		background: transparent;
		border: none;
		border-radius: 0;
		appearance: none;
	}

	th.is-sortable button:after {
		content: "–";
		display: inline-block;
		text-align: center;
		margin-left: 0.5em;
		font-family: monospace;
		vertical-align: middle;
	}

	th.is-sortable.is-asc button:after {
		content: "▲";
		visibility: visible;
	}

	th.is-sortable.is-desc button:after {
		content: "▼";
		visibility: visible;
	}

	tr {
		cursor: auto;
	}
	@media only screen and (max-width: 700px) {
		td, th, tr {
			font-size: var(--14px);
		}
	}
	@media only screen and (max-width: 500px) {
		td, th, tr {
			font-size: var(--12px);
		}
	}
</style>

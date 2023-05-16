<!--
	@component
	Generates HTML text labels for a nested data structure. It places the label near the y-value of the highest x-valued data point. This is useful for labeling the final point in a multi-series line chart, for example. It expects your data to be an array of objects where each has `values` field that is an array of data objects. It uses the `z` field accessor to pull the text label.
 -->
<script>
  import { getContext } from 'svelte';
  import { max } from 'd3';

  const { data, x, y, xScale, yScale, xRange, yRange, z } = getContext('LayerCake');

  /* --------------------------------------------
	 * Title case the first letter
	 */
	const cap = val => val.replace(/^\w/, d => d.toUpperCase());

  /* --------------------------------------------
	 * Put the label on the highest value
	 */

  $: left = values => $xScale(max(values, $x)) /  Math.max(...$xRange);
  $: top = values => $yScale(max(values, $y)) / Math.max(...$yRange);

  function returnXPlacement(group) {
    if (group.gender == "mixed-gender") {
      return left(group.values) * 0
    } else {
      return left(group.values) * 100
    }
  }
</script>

{#each $data as group}
  <div
    class="label"
    style="
      top:{top(group.values) * 100}%;
      left:{returnXPlacement(group)}%;
    "
  >{cap($z(group))}</div>
{/each}

<style>
	.label {
		position: absolute;
		font-size: var(--16px);
    font-weight: 700;
    width: 10rem;
    text-align: left;
	}
  .label:nth-of-type(1) {
        display: none;
    }
    .label:nth-of-type(2) {
        color: var(--color-country-blue);
        left: 100%;
        transform: translate(-40%, 60%);
    }

    .label:nth-of-type(3) {
        color: var(--color-country-dark-brown);
        transform: translate(-20%, 140%);
    }

    .label:nth-of-type(4) {
        color: var(--color-country-orange);
        transform: translate(10%, -20%);
    }

    @media only screen and (max-width: 500px) {
      .label {
        font-size: var(--14px);
      }
    }
</style>
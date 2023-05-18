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
  $: note = values => $xScale(2012) / Math.max(...$xRange);

  function returnXPlacement(group) {
    if (group.gender == "XX") {
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
<div class="note" style="left:{note(2012)*100-7}%"><p>In 2012, Billboard started including other metrics like streaming data into its Hot Country Chart.</p></div>

<style>
  .note {
    position: absolute;
    padding: 0 1rem;
    top: -6rem;
    width: 15rem;
  }
  .note p {
    color: var(--color-country-dark-brown);
    font-size: var(--14px);
    font-style: italic;
    text-align: center;
  }
	.label {
		position: absolute;
		font-size: var(--16px);
    font-weight: 700;
    width: 10rem;
    text-align: left;
	}
    .label:nth-of-type(1) {
        color: var(--color-country-blue);
        left: 100%;
        transform: translate(-200%, -40%);
    }

    .label:nth-of-type(2) {
        color: var(--color-country-dark-brown);
        transform: translate(-100%, 140%);
    }

    .label:nth-of-type(3) {
        color: var(--color-country-orange);
        transform: translate(-120%, -20%);
    }

    @media only screen and (max-width: 500px) {
      .label {
        font-size: var(--14px);
      }
    }
</style>
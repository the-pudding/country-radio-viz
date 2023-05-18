<script>
    import { getContext } from "svelte";
    import { LayerCake, Svg, Html } from "layercake";
    import {
      select,
      scaleOrdinal,
      timeParse,
      timeFormat,
      format,
      precisionFixed
    } from "d3";
  
    import MultiLine from "$components/charts/todo/MultiLine.svelte";
    import MultiLine2 from "$components/charts/todo/MultiLine2.svelte";
    import AxisX from "$components/charts/AxisX.svg.svelte";
    import AxisY from "$components/charts/AxisY.svg.svelte";
    import Labels from "$components/charts/Labels.svelte";
    import Scatter from "$components/charts/Scatter.svg.svelte";
  
    import data from "$data/timeseries.csv";
    const copy = getContext("copy");

    let w;
  
    const xKey = "year";
    const yKey = "value";
    const zKey = "gender";
  
    const seriesNames = Object.keys(data[0]).filter((d, i) => d !== xKey);
    const seriesColors = ["#fda922", "#3460E5", "#A18D7E"];

    const parseDate = timeParse("%Y");
    const formatTick = function(string) { return `${string}%`};

    const dataLong = seriesNames.map((key) => {
      return {
        [zKey]: key,
        values: data.map((d) => {
          d[xKey] = typeof d[xKey] === "string" ? d[xKey] : d[xKey];
          return {
            [yKey]: +d[key],
            [xKey]: d[xKey]
          };
        })
      };
    });
  
    const flatten = (data) =>
      data.reduce((memo, group) => {
        return memo.concat(group.values);
      }, []);
  </script>

<section id="line-chart" bind:clientWidth={w}>
    <h3>Representation on airplay charts, 1996-2022</h3>
    <div class="line-container">
      <LayerCake
        padding={{ top: 20, right: 0, bottom: 40, left: 0 }}
        x={xKey}
        y={yKey}
        z={zKey}
        yDomain={[0, 100]}
        xDomain={[1999, 2022]}
        zScale={scaleOrdinal()}
        zDomain={seriesNames}
        zRange={seriesColors}
        flatData={flatten(dataLong)}
        data={dataLong}
      >
        <Svg>
          <AxisX 
              gridlines={false}
              ticks={8}
              snapTicks={true}
              tickMarks={false}
          />
          <AxisY 
              gridlines={true}
              ticks={5}
              formatTick={formatTick}
          />
          <MultiLine />
          <MultiLine2 />
          <Scatter />
        </Svg>
        <Html>
          <Labels />
        </Html>
      </LayerCake>
    </div>
    <p class="note">{@html copy.chartNote[0].text}</p>
  </section>

  <style>
    #line-chart {
      width: 100%;
      max-width: 50rem;
      margin: 2rem auto;
      padding: 0 0 1rem 0;
    }

    .note {
        font-size: var(--14px);
        font-style: italic;
        font-family: var(--sans-narrow);
        color: var(--color-country-dark-brown);
        margin: 0;
    }

    :global(.note a) {
      color: var(--color-country-dark-brown);
    }

    :global(.note a:hover) {
      color: var(--color-country-brown);
    }

    h3 {
      width: 100%;
      margin: 0 auto;
      padding: 1rem 0;
      color: var(--color-country-text);
      font-family: var(--sans-narrow);
      font-weight: 700;
      font-size: var(--20px);
    }
    .line-container {
      width: 100%;
      height: 400px;
      padding: 0;
    }

    @media only screen and (max-width: 700px) {
      :global(.x-axis .tick:nth-child(even)) {
        display: none;
      }
    }
  </style>
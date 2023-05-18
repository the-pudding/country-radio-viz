<script>
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
    import AxisX from "$components/charts/AxisX.svg.svelte";
    import AxisY from "$components/charts/AxisY.svg.svelte";
    import Labels from "$components/charts/Labels.svelte";
  
    import data from "$data/timeseries.csv";
    import data2 from "$data/timeseries2.csv";

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

    const dataLong2 = seriesNames.map((key) => {
      return {
        [zKey]: key,
        values: data2.map((d) => {
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

    const flatten2 = (data2) =>
      data2.reduce((memo, group) => {
        return memo.concat(group.values);
      }, []);
  </script>

<h3>Representation on the Billboard and Mediabase Airplay charts, 1958-2022</h3>
<section id="line-chart" bind:clientWidth={w}>
    <div class="line-container">
      <h5>Billboard<br>1958–2006</h5>
      <LayerCake
        padding={{ top: 20, right: 0, bottom: 60, left: 0 }}
        x={xKey}
        y={yKey}
        z={zKey}
        yDomain={[0, 100]}
        xDomain={[1958, 2006]}
        zScale={scaleOrdinal()}
        zDomain={seriesNames}
        zRange={seriesColors}
        flatData={flatten(dataLong2)}
        data={dataLong2}
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
        </Svg>
        <Html>
          <Labels />
        </Html>
      </LayerCake>
    </div>
    <div class="spacer">
      <p>In 2007, Billboard changed how it calculates the Hot Country Songs Chart</p>
    </div>
    <div class="line-container">
      <h5>Mediabase<br>2007–2022</h5>
      <LayerCake
        padding={{ top: 20, right: 0, bottom: 60, left: 0 }}
        x={xKey}
        y={yKey}
        z={zKey}
        yDomain={[0, 100]}
        xDomain={[2007, 2022]}
        zScale={scaleOrdinal()}
        zDomain={seriesNames}
        zRange={seriesColors}
        flatData={flatten(dataLong)}
        data={dataLong}
      >
        <Svg>
          <AxisX 
              gridlines={false}
              ticks={2}
              snapTicks={true}
              tickMarks={false}
          />
          <AxisY 
              gridlines={true}
              ticks={5}
              formatTick={formatTick}
          />
          <MultiLine />
        </Svg>
      </LayerCake>
    </div>
  </section>

  <style>
    #line-chart {
      width: 100%;
      display: flex;
      flex-direction: row;
      max-width: 50rem;
      margin: 0rem auto 5rem auto;
      height: 400px;
      padding: 0 0 1rem 0;
      pointer-events: none;
    }

    h3 {
      max-width: 50rem;
      margin: 0 auto;
      color: var(--color-country-text);
      font-family: var(--sans-narrow);
      font-weight: 700;
      font-size: var(--20px);
    }
    h5 {
      color: var(--color-country-text);
      font-family: var(--sans-narrow);
      font-weight: 700;
      font-size: var(--16px);
    }
    .line-container {
      height: 400px;
      padding: 0;
    }

    .line-container:first-of-type {
      width: calc(77% - 4rem);
    }

    .line-container:last-of-type {
      width: calc(23% - 4rem);
    }
    :global(.line-container:last-of-type .y-axis text) {
      display: none;
    }
    .spacer {
      width: 6rem;
      height: 450px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--color-country-tan);
      margin: 1rem 1rem 0 1rem;
    }
    .spacer p {
      color: var(--color-country-dark-brown);
      font-style: italic;
      font-size: var(--14px);
      text-align: center;
      padding: 1rem;
    }

    @media only screen and (max-width: 700px) {
      :global(.x-axis .tick:nth-child(even)) {
        display: none;
      }
    }
  </style>
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
    let w;
    // let drawIn = false;
  
    const xKey = "date";
    const yKey = "value";
    const zKey = "gender";
  
    const seriesNames = Object.keys(data[0]).filter((d, i) => d !== xKey);
    const seriesColors = ["#3460E5", "#78695E", "#fda922"];
  
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

    // function checkView() {
    //   drawIn = true;
    // }
  </script>

<section id="line-chart" bind:clientWidth={w}>
  <h3>Percentage of radio plays by gender</h3>
    <div class="line-container">
      <LayerCake
        padding={{ top: 20, right: 0, bottom: 60, left: 0 }}
        x={xKey}
        y={yKey}
        z={zKey}
        yDomain={[0, 100]}
        xDomain={[1958, 2022]}
        zScale={scaleOrdinal()}
        zDomain={seriesNames}
        zRange={seriesColors}
        flatData={flatten(dataLong)}
        data={dataLong}
      >
        <Svg>
          <AxisX 
              gridlines={false}
              ticks={10}
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
  </section>

  <style>
    #line-chart {
      width: 100%;
      max-width: 50rem;
      margin: 3rem auto;
      height: 400px;
      padding: 0 0 1rem 0;
      pointer-events: none;
    }

    h3 {
      color: var(--color-country-text);
      font-family: var(--sans-narrow);
      font-weight: 700;
      font-size: var(--20px);
    }
  
    .line-container {
      width: 100%;
      height: 400px;
      padding: 0 1rem 0 0;
    }

    @media only screen and (max-width: 700px) {
      :global(.x-axis .tick:nth-child(even)) {
        display: none;
      }
    }
  </style>
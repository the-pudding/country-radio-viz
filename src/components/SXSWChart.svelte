<script>
    import { base } from "$app/paths";
    import { getContext } from "svelte";
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import summaryData from "$data/summary.csv";

    export let variable;
    export let title;
    export let station;

    let data = [];
    let groupedData = [];
    let city;

    let callLetters = station;
    let stationSumData = summaryData.filter(d => d.stationName == callLetters)

    onMount(async () => {
        const response = await fetch(`./assets/Austin_${station}_withB2B.csv`);
        const text = await response.text();
        const parsed = d3.csvParse(text)
        data = parsed;
        groupedData = d3.groups(data, d => d.date);
        const firstData = data[0];
        city = firstData.city.replace(/([A-Z])/g, ' $1').trim();
        }
    )

    function formatDate(date) {
        const yearRemoved = date.split("/", 2).join("/");
        return yearRemoved;
    }

    function setClass(variable, song) {
        if (variable == "b2b_gender") {
            return `song-${song.b2b_gender}`
        } else if (variable == "b2b_collabGender") {
            return `song-${song.b2b_collabGender}`
        } else if (variable == "b2b_combinedGender") {
            return `song-${song.b2b_combinedGender}`
        } else if (variable == "b2b_race") {
            return `song-${song.b2b_race}`
        } else if (variable == "b2b_raceGender") {
            return `song-${song.b2b_raceGender}`
        } else if (variable == "b2b_lgbtq") {
            return `song-${song.b2b_lgbtq}`
        }
    }

    function handleMouseEnter(song) {
        const tt = d3.select("#tooltip").style("opacity", 1);
        const ttStation = d3.select("#tt-station");
        const ttDate = d3.select("#tt-date");
        const ttTime = d3.select("#tt-time");
        const ttArtist = d3.select("#tt-artist");
        const ttTitle = d3.select("#tt-title");


        ttDate.text(song.date)
        ttStation.text(song.station)
        ttTime.text(song.time)
        ttArtist.text(song.artist)
        ttTitle.text(song.title)
    }

    function handleMouseLeave() {
        const tt = d3.select("#tooltip").style("opacity", 0);
    }

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    }
</script>

<section id={variable}>
    <div class="chart">
        <div class="details">
            <div class="title">
                <p><strong>Austin</strong> {station}</p>
                <p>{title}</p>
            </div>
            <div class="stats">
                {#if variable == "b2b_gender"}
                    <div class="highlight-block"></div><p><strong>Women:</strong> {Math.round(stationSumData[0].b2bWomenSongs_PERCENT * 100)/100}%</p>
                    <div class="accent-block"></div><p><strong>Men:</strong> {Math.round(stationSumData[0].b2bMenSongs_PERCENT * 100)/100}%</p>
                    <div class="accent2-block"></div><p><strong>Mixed-gendered artists:</strong> {Math.round(stationSumData[0].b2bMixedGenderSongs_PERCENT * 100)/100}%</p>
                    <div class="no-block"></div><p>Not B2B</p>
                {:else if variable == "b2b_collabGender"}
                    <div class="highlight-block"></div><p><strong>Women + mixed-gendered collabs:</strong> {Math.round(stationSumData[0].b2bCollabGenderSongs_PERCENT * 100)/100}%</p>
                    <div class="accent-block"></div><p><strong>Men:</strong> {Math.round(stationSumData[0].b2bMenSongs_PERCENT * 100)/100}%</p>
                    <div class="accent2-block"></div><p><strong>Mixed-gendered artists no collabs:</strong> {Math.round(stationSumData[0].b2bMixedNOCollabGenderSongs_PERCENT * 100)/100}%</p>
                    <div class="no-block"></div><p>Not B2B</p>
                {:else if variable == "b2b_combinedGender"}
                    <div class="highlight-block"></div><p><strong>Women + all mixed-gendered artists:</strong> {Math.round(stationSumData[0].b2bCombinedGenderSongs_PERCENT * 100)/100}%</p>
                    <div class="accent-block"></div><p><strong>Men:</strong> {Math.round(stationSumData[0].b2bMenSongs_PERCENT * 100)/100}%</p>
                    <div class="no-block"></div><p>Not B2B</p>
                {:else if variable == "b2b_raceGender"}
                    <div class="highlight-block"></div><p><strong>Women + mixed-gendered artists of color:</strong> {Math.round(stationSumData[0].b2bPOCWomenSongs_PERCENT * 100)/100 + Math.round(stationSumData[0].b2bPOCMixedSongs_PERCENT * 100)/100}%</p>
                    <div class="accent2-block"></div><p><strong>Men artists of color:</strong> {Math.round(stationSumData[0].b2bPOCMenSongs_PERCENT * 100)/100}%</p>
                    <div class="accent-block"></div><p><strong>All white artists:</strong> {(Math.round(stationSumData[0].b2bWhiteWomenSongs_PERCENT * 100) + Math.round(stationSumData[0].b2bWhiteMenSongs_PERCENT * 100) + Math.round(stationSumData[0].b2bWhiteMixedGenderSongs_PERCENT * 100))/100}%</p>
                    <div class="no-block"></div><p>Not B2B</p>
                {:else if variable == "b2b_lgbtq"}
                    <div class="highlight-block"></div><p><strong>LGBTQ+ artists:</strong> {Math.round(stationSumData[0].b2bLGBTQSongs_PERCENT * 100)/100}%</p>
                    <div class="accent-block"></div><p><strong>Straight artists:</strong> {Math.round(stationSumData[0].b2bStraightSongs_PERCENT * 100)/100}%</p>
                    <div class="no-block"></div><p>Not B2B</p>
                {/if}
            </div>
        </div>
        <!-- <img src="./assets/images/letterpress-texture{getRandomIntInclusive(1, 3)}.png"> -->
        <svg>
            <defs>
                <pattern id="img1" patternUnits="userSpaceOnUse" width="20" height="20">
                    <image href="./assets/images/letterpress-texture-small1.png" x="0" y="0" width="20" height="20" />
                </pattern>
                <pattern id="img2" patternUnits="userSpaceOnUse" width="20" height="20">
                    <image href="./assets/images/letterpress-texture2.png" x="0" y="0" width="20" height="20" />
                </pattern>
                <pattern id="img3" patternUnits="userSpaceOnUse" width="20" height="20">
                    <image href="./assets/images/letterpress-texture3.png" x="0" y="0" width="20" height="20" />
                </pattern>
            </defs>
        {#each groupedData as dateBlock, i}
            <g class="date-block" transform="translate(0, {i*32})">
                <g>
                    <g class="date" transform="translate(35, 16)"><text text-anchor="end">{formatDate(dateBlock[0])}</text></g>
                    <g class="song-block" transform="translate(40, 0)">
                        {#each dateBlock[1] as song, i}
                        <g>
                            <rect class:hover={song.hover}
                                on:mouseenter={() => {
                                    (song.hover = true)
                                    handleMouseEnter(song)
                                    }
                                }
                                on:mouseleave={() => {
                                    (song.hover = false)
                                    handleMouseLeave()
                                    }
                                } 
                                class="song {setClass(variable, song)}"
                                x="{i*3}"
                                y="0"
                                width="2"
                                heigth="16">
                            </rect>
                            <rect
                                class="song"
                                x="{i*3}"
                                y="0"
                                width="2"
                                heigth="16"
                                fill="url(#img1)">
                            </rect>
                        </g>
                    {/each} 
                    </g>
                </g>
                <!-- <div class="song-block">
                    {#each dateBlock[1] as song}
                        <div class:hover={song.hover}
                            on:mouseenter={() => {
                                (song.hover = true)
                                handleMouseEnter(song)
                                }
                            }
                            on:mouseleave={() => {
                                (song.hover = false)
                                handleMouseLeave()
                                }
                            } 
                            class="song {setClass(variable, song)}"></div>
                    {/each}
                </div> -->
            </g>
        {/each}
        </svg>
    </div>
</section>

<style>
    .chart {
        width: 100%;
        border-top: 1px solid var(--color-gray-200);
        padding: 1rem 0 0 0;
        margin: 0 0 8rem 0;
        position: relative;
    }

    .chart img {
        position: absolute;
        left: 2.5rem;
        width: 100%;
    }
    .details {
        width: 100;
        display: flex;
        flex-direction: column;
        font-family: var(--sans);
    }
    svg {
        width : 100%;
        height: 640px;
    }
    .song-X {
        fill: var(--color-gray-200);
    }
    .title {
        display: flex;
        flex-direction: row;
        font-size: 24px;
    }
    .title p {
        margin: 0 2rem 0 0;
    }
    .title p:last-of-type {
        font-style: italic;
    }
    .stats {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .stats p {
        margin: 1rem 2rem 1rem 0;
    }
    .highlight-block {
        width: 1rem;
        height: 1rem;
        margin: 0 0.25rem 0 0;
        background-color: var(--color-country-highlight)
    }
    .accent-block {
        width: 1rem;
        height: 1rem;
        margin: 0 0.25rem 0 0;
        background-color: var(--color-country-accent)
    }
    .accent2-block {
        width: 1rem;
        height: 1rem;
        margin: 0 0.25rem 0 0;
        background-color: var(--color-country-accent-2)
    }
    .no-block {
        width: 1rem;
        height: 1rem;
        margin: 0 0.25rem 0 0;
        background-color: var(--color-gray-200)
    }
    .date-block {
        display: flex;
        flex-direction: row;
        width: 100%;
        margin: 0 0 0.25rem 0;
        align-items: center;
    }
    .date {
        margin: 0 0.25rem 0 0;
        font-family: var(--sans);
        padding: 0;
        font-size: var(--12px);
        text-align: right;
        width: 2.5rem;
    }
    .song-block {
        display: flex; 
        flex-direction: row;
        width: calc(100% - 2.5rem);
        justify-content: flex-start;
        flex-wrap: nowrap;

    }
    .song {
        background-color: var(--color-gray-200);
        height: 1.75rem;
        margin: 0 1px 0 0;
    }

    .song:hover {
        fill: black;
    }

    .song-B2Bwomen, .song-B2BCollabWomen, .song-B2BCombWomen, .song-B2BPOC {
        background: var(--color-country-highlight);
        fill: var(--color-country-highlight);
    }

    .song-B2Bmen, .song-B2BCollabMen, .song-B2BCombMen, .song-B2Bwhite {
        background: var(--color-country-accent);
        fill: var(--color-country-accent);
    }

    .song-B2Bmixed, .song-B2BCollabMixed, .song-B2BPOCMen,.song-B2BPOCMen {
        background: var(--color-country-accent-2);
        fill: var(--color-country-accent-2);
    }

    .song-B2BwhiteMen, .song-B2BwhiteWomen, .song-B2BwhiteMixed, .song-B2BStraight {
        background: var(--color-country-accent);
        fill: var(--color-country-accent);
    }
</style>
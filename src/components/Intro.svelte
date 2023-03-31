<script>
    import { getContext } from "svelte";
    const copy = getContext("copy");
</script>

<h1>{copy.hed}</h1>
<p class="byline">By {@html copy.byline}</p>

<style>
    h1 {
        text-align: center;
    }

    .byline {
        text-align: center;
    }

</style>
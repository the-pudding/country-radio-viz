<script>
	import { getContext, onMount } from "svelte";
	export let x1;
	export let y1;
    export let x2;
	export let y2;
	export let fill;


    function setFill(fill) {
        if (fill == "B2Bmen") { return ("#917c73") }
        else if (fill == "B2Bwomen") { return ("#5076e8") }
        else if (fill == "B2Bmixed") { return ("#fda922") }
        else { return ("#e1d4ca") }
    }
	const { register, unregister } = getContext("canvas");
	onMount(() => {
		register(draw);
		return () => {
			unregister(draw);
		};
	});
	function draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = setFill(fill);
		ctx.rect(x1, y1, x2, y2);
		ctx.fill();
	}
</script>
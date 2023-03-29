<script>
	import { getContext, onMount } from "svelte";
	export let x1;
	export let y1;
    export let x2;
	export let y2;
	export let fill;


    function setFill(fill) {
        if (fill == "B2Bmen") { return ("#1fc3aa") }
        else if (fill == "B2Bwomen") { return ("magenta") }
        else if (fill == "B2Bmixed") { return ("yellow") }
        else { return ("#c9c9c9") }
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
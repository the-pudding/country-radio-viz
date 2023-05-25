<script>
	import { getContext, onMount } from "svelte";
	export let x1;
	export let y1;
    export let x2;
	export let y2;
	export let fill;
	export let value;


    function setFill(fill) {
		if (!isNaN(fill)) {
			if (fill == 0) { return ("#e1d4ca") }
			else { return ("#3460E5") }
		} else {
			if (value < 7 || value == "Gender") {
				if (fill == "B2Bmen") { return ("#A18D7E") }
				else if (fill == "B2Bwomen") { return ("#3460E5") }
				else if (fill == "B2Bmixed") { return ("#fda922") }
				else { return ("#e1d4ca") }
			} else if (value >= 7) {
				if (fill == "B2BCombMen") { return ("#A18D7E") }
				else if (fill == "B2BCombWomen") { return ("#3460E5") }
				else { return ("#e1d4ca") }
			} else if (value == "Race") {
				if (fill == "B2BwhiteMen" || fill == "B2BwhiteWomen") { return ("#A18D7E") }
				else if (fill == "B2BPOCMen" || fill == "B2BPOCWomen") { return ("#3460E5") }
				else { return ("#e1d4ca") }
			} else if (value == "Sexual Orientation") {
				if (fill == "B2BStraight") { return ("#A18D7E") }
				else if (fill == "B2BLGBTQ") { return ("#3460E5") }
				else { return ("#e1d4ca") }
			}
		}
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
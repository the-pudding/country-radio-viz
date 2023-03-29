<script>
	import { onMount, setContext } from "svelte";
	
    let canvas;
	export let height;
	export let width;
	
    const drawFunctions = [];
	
    setContext("canvas", {
		register(drawFn) {
			drawFunctions.push(drawFn);
		},
		unregister(drawFn) {
			drawFunctions.splice(drawFunctions.indexOf(drawFn), 1);
		}
	});
	
    onMount(() => {
		const ctx = canvas.getContext("2d");
		canvas.height = height;
		canvas.width = width;
		
        ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.globalCompositeOperation='destination-over';
		
        function update() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			drawFunctions.forEach((drawFn) => {
				drawFn(ctx);
			});
			frameId = requestAnimationFrame(update);
		}
		
        let frameId = requestAnimationFrame(update);
		
        return () => {
			cancelAnimationFrame(frameId);
		};
	});
</script>

<canvas bind:this={canvas} />

<slot />
<script>
	import Option from './Option.svelte'
	
	let vizCofigPanel = true;
	let capCofigPanel = false;
	let band_count = 3

	function ApplyVizConfig(){ VizConfig() }
</script>

<div class="top_config">
	<button class="myButton frosted" style="float: left;" on:click={ApplyVizConfig}>Apply</button>
	<button class="myButton frosted" style="float: right;" on:click={()=>vizCofigPanel = !vizCofigPanel}>^</button>
	{#if vizCofigPanel}
		<br>
		<Option text='Color bands' type='num input box'/>
	{/if}
</div>

<style>

.top_config{
	padding-top: 5%;
	height: 10%;
	display: block;
	text-align: center;
	margin-left: 30%;
	margin-right: 30%;
}

</style>
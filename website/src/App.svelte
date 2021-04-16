<script>
	//import {StartVizualization, LoadSong} from "../public/scripts/app.js"
	//import app from "../public/scripts/app.js"

	let vizCofigPanel = true;
	let capCofigPanel = false;
	let band_count = 3

	function Start(){ StartVizualization() }
	function Load(song){ LoadSong(song) }
	function ApplyVizConfig(){ VizConfig() }
</script>

<main>
	<div class="top_config">
		<button class="myButton" style="float: left;" on:click={ApplyVizConfig}>Apply</button>
		<button class="myButton" style="float: right;" on:click={()=>vizCofigPanel = !vizCofigPanel}>^</button>
		{#if vizCofigPanel}
			<br>
			<div class="option">
				<p>Color Bands</p>
				<input type="number" min="1" max="5" class="numField" bind:value={band_count}/>
			</div>
		{/if}
	</div>
	
	<div id="vizualization_canvas">
		<label class="custom-file-upload" for="audio_file">Select audio file</label>
		<input type="file" id="audio_file" accept=".mp3" class="hidden" on:change={(song)=>Load(song)}/>
		
		<button class="myButton" on:click={Start}>Start</button>
	</div>

	<div class="bot_config">
		
	</div>
</main>

<style>

.top_config{
	height: 100px;
	display: block;
	text-align: center;
	margin-left: 30%;
	margin-right: 30%;
}

.option{
	padding-top: 3%;
	display: flex;
	vertical-align: middle;
}

.numField{
	height: 1%;
	vertical-align: middle;
}

input[type="file"] {
    display: none;
}

.myButton{
	border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
}
.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
}

.bot_config{
	height: 100px;
}
</style>
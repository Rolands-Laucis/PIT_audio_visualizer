<script>
	import TopPanel from './TopPanel.svelte'
	import BotPanel from './BotPanel.svelte'

	function Start(){ StartVizualization() }
	function Load(song){ LoadSong(song) }

</script>

<main>
	<TopPanel/>

	<div id="vizualization_canvas">
		<div class='canvas_panel'>
			<label class="myButton frosted" for="audio_file">Select audio file</label>
			<input type="file" id="audio_file" accept=".mp3" class="hidden" on:change={(song)=>Load(song)}/>
			
			<button class="myButton frosted" on:click={Start}>Start</button>
		</div>
	</div>

	<BotPanel/>
</main>

<style>

main{
	height: 100%;
}

input[type="file"] {
    display: none;
}

.canvas_panel{
	text-align: center;
	padding-top: 0vh;
	padding-bottom: var(--standard-padding);
}

</style>
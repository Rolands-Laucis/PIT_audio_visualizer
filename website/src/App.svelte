<!--
Author: Rolands Laucis
rolandslaucis.lv
-->
<script>
	import TopPanel from './TopPanel.svelte'
	import BotPanel from './BotPanel.svelte'

	function Start(){ StartVizualization() }
	function Load(song){ 
		if(IsPlaying()){
			console.log('Sorry, cannot load another song while a song is playing!')
			alert('Sorry, cannot load another song while a song is playing!')
		}else{
			LoadSong(song) 
		}
	}

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

	<a class="footer" href="https://github.com/Rolands-Laucis/PIT_audio_visualizer" target="blank">Source code available at https://github.com/Rolands-Laucis/PIT_audio_visualizer</a>
</main>

<style>

main{
	height: 100%;
	width: 100%;
}

input[type="file"] {
    display: none;
}

.canvas_panel{
	text-align: center;
	padding-top: 0vh;
	padding-bottom: var(--standard-padding);
}

.footer{
	text-align: center;
	color: black;
}

</style>
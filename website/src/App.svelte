<script>
	//import app from "../public/scripts/app.js"

	function Start(){
		StartVizualization()
	}
</script>

<main>
	<!--
		<script src="../scripts/p5.js"></script>
		<script src="../scripts/p5.sound.js"></script>
	-->
	<script src="../scripts/p5.js"></script>
	<script src="../scripts/p5.sound.js"></script>
	<script src="../scripts/LogOnce.js"></script>
	<script src="../scripts/Point.js"></script>
	<script src="../scripts/app.js"></script>

	<div class="top_config">

	</div>
	
	<div id="vizualization_canvas">
		<label class="custom-file-upload" for="audio_file">Select audio file</label>
		<input type="file" id="audio_file" accept=".mp3" class="hidden" on:change={(song)=>LoadSong(song)}/>
		
		<button class="myButton" on:click={Start}>Start</button>
	</div>

	<div class="bot_config">
		
	</div>
</main>

<style>

.top_config{
	height: 100px;
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
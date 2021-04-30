<script>
	
	//capture panel options
	let capCofigPanel = false;
	let FPS = 60
	let interval = 0
	let formats = ['WebM', 'GIF']
	let format = formats[0]

	let capOptions = {}

	function ApplyCapConfig(){ 
		capOptions = {"FPS":FPS,
						"interval":interval,
						"format":format
		}
		console.log(capOptions)
		CapConfig(capOptions) 
	}

	function SaveVideo(){

	}

</script>

<div class="bot_config">
	<button class="myButton frosted left" on:click={ApplyCapConfig}>Apply</button>
	<button class="myButton frosted right" on:click={()=>capCofigPanel = !capCofigPanel}>_</button>

	{#if capCofigPanel}
		<br>
		<div class="option">
			<p class="left">Video capture frame rate:</p>
			<input type="number" min="1" max="60" class="numField right frosted" bind:value={FPS}/>
		</div>

		<br>
		<div class="option">
			<p class="left">Video fragment download interval (sec):</p>
			<input type="number" min="0" max="300" class="numField right frosted" bind:value={interval}/>
		</div>

		<br>
		<div class="option">
			<p class="left">Frequency spectrum resolution:</p>
			<select bind:value={format} class='frosted'>
				{#each formats as f}
					<option value={f}>{f}</option>
				{/each}
			</select>
		</div>
	{/if}

	<button class="myButton frosted" on:click={SaveVideo}>Save Video</button>
</div>

<style>

.bot_config{
	padding-top: 5%;
	height: auto;

	display: block;
	text-align: center;
	margin-left: 30%;
	margin-right: 30%;
	padding-bottom: 5%;
	vertical-align: middle;
}

.option{
	padding-top: 3%;
	height: auto;
	display: flex;
	vertical-align: middle;
    margin: none;
}

.numField{
	margin-top: var(--field_marg_top);
	height: 30px;
	vertical-align: middle;
	width: 40px;
	border: none;
	border-radius: 10px;
}
</style>

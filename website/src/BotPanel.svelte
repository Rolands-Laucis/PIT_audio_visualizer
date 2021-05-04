<script>
	
	//capture panel options
	let capCofigPanel = false;
	let FPS = 60
	let interval = 0
	let formats = ['webm']
	let format = formats[0]
	let cap_video = false

	let capOptions = {}

	//wait for p5 and app to set up
	setTimeout(() => {
		ApplyCapConfig()
	}, 500)
	
	function ApplyCapConfig(){ 
		capOptions = {"FPS":FPS,
						"interval":interval,
						"format":format,
						'cap_video': cap_video
		}
		console.log(capOptions)
		CapConfig(capOptions) 
	}

	function SaveVideo(){
		ForceSaveVideo()
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

		<br>
		<div class="option">
			<p class="left">Capture video:</p>
			<label class="switch">
				<input type="checkbox" bind:checked={cap_video}>
				<span class="slider round"></span>
			</label>
		</div>
	{/if}

	<button class="myButton frosted" on:click={SaveVideo}>Save Video</button>
</div>

<style>

.bot_config{
	padding-top: var(--standard-padding);
	padding-bottom: var(--standard-padding);
	display: block;

	height: auto;
	width: 60%;
	margin: auto;
	text-align: center;
}

.option{
	padding-top: var(--standard-padding);
	display: flex;
	text-align: center;
	justify-content:center;
}

.numField{
	margin-top: var(--field_marg_top);
	margin-right: 10px;
	height: 30px;
	width: 40px;
	border: none;
	border-radius: 10px;
}

select{
	text-align: center;
	margin-top: var(--field_marg_top_2);
	height: 25px;
	width: 65px;
	border: none;
	border-radius: 10px;
}

</style>

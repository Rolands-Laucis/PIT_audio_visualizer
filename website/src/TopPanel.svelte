<script>	
	//visualization panel options
	let vizCofigPanel = false
	let Band_count = 5
	let Band_colors = []
	let Band_amps = []
	let FFT_resolutions = [16,32,64,128,256,512,1024]
	let FFT_res = 256
	let FPS = 60
	let band_spacing = false
	let taper = true

	//option defaults
	let def_colors = ['1A50B4','3DB8CA','a84fe3','e7802b','DA2930']
	let def_amp = 1;
	let vizOptions = {}

	ChangeBandColorCount()
	//wait for p5 and app to set up
	setTimeout(() => {
		ApplyVizConfig()
	}, 500)

	function ApplyVizConfig(){ 
		vizOptions = {"Band_count":Band_count,
						"Band_colors":Band_colors,
						"Band_amps":Band_amps,
						"FFT_res":FFT_res,
						"FPS":FPS,
						"band_spacing":band_spacing,
						'taper':taper
		}
		console.log(vizOptions) 
		VizConfig(vizOptions)
	}

	function ChangeBandColorCount(){ 
		Band_colors.length = Band_count; 
		Band_amps.length = Band_count 
		
		//set in default values for empty fields
		for(let i = 0; i < Band_count; i++){
			if(Band_colors[i] == null){
				Band_colors[i] = def_colors[i]
			}

			if(Band_amps[i] == 0){
				Band_amps[i] = def_amp
			}
		}
	}

</script>

<div class="top_config">
	<button class="myButton frosted left" on:click={ApplyVizConfig}>Apply</button>
	<button class="myButton frosted right" on:click={()=>vizCofigPanel = !vizCofigPanel}>_</button>
	{#if vizCofigPanel}
		<br>
		<div class="option">
			<p class="left">Color band count:</p>
			<input type="number" min="1" max="5" class="numField right frosted" bind:value={Band_count} on:change={ChangeBandColorCount}/>
		</div>

		<br>
		<div class="option">
			<p class="left">Color band colors:</p>
			{#each Band_colors as color} 
				<input type="text" class="textField right frosted" maxlength="6" placeholder='ffffff' bind:value={color}/>
			{/each}
		</div>

		<br>
		<div class="option">
			<p class="left">Color band amplitudes:</p>
			{#each Band_amps as amp} 
				<input type="number" min="0" max="1" class="numField right frosted" placeholder='0.5' bind:value={amp}/>
			{/each}
		</div>

		<br>
		<div class="option">
			<p class="left">Frequency spectrum resolution:</p>
			<select bind:value={FFT_res} class='frosted'>
				{#each FFT_resolutions as res}
					<option value={res}>{res}</option>
				{/each}
			</select>
		</div>

		<br>
		<div class="option">
			<p class="left">visualization frame rate:</p>
			<input type="number" min="1" max="60" class="numField right frosted" bind:value={FPS}/>
		</div>

		<br>
		<div class="option">
			<p class="left">Space out bands:</p>
			<label class="switch">
				<input type="checkbox" bind:checked={band_spacing}>
				<span class="slider round"></span>
			</label>
		</div>

		<br>
		<div class="option">
			<p class="left">Taper bands:</p>
			<label class="switch">
				<input type="checkbox" bind:checked={taper}>
				<span class="slider round"></span>
			</label>
		</div>

	{/if}
</div>

<style>

.top_config{
	padding-top: var(--standard-padding);
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
	height: 25px;
	width: 40px;
	border: none;
	border-radius: 10px;
}

.textField{
	margin-top: var(--field_marg_top_2);
	margin-right: 10px;
	height: 25px;
	width: 55px;
	border: none;
	border-radius: 10px;
}

select{
	margin-top: var(--field_marg_top_2);
	height: 25px;
	width: 55px;
	border: none;
	border-radius: 10px;
}

</style>
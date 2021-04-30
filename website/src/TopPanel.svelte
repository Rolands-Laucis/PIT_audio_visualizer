<script>	
	//visualization panel options
	let vizCofigPanel = true;
	let Band_count = 3
	let Band_colors = ['ffffff','ffffff','ffffff']
	let Band_amps = ['1','1','1']
	let FFT_resolutions = [16,32,64,128]
	let FFT_res = 64
	let FPS = 60
	let Changing_bg = false

	let vizOptions = {}

	ChangeBandColorCount()

	function ApplyVizConfig(){ 
		vizOptions = {"Band_count":Band_count,
						"Band_colors":Band_colors,
						"Band_amps":Band_amps,
						"FFT_res":FFT_res,
						"FPS":FPS,
						"Changing_bg":Changing_bg
		}
		console.log(vizOptions) 
		VizConfig(vizOptions)
	}

	function ChangeBandColorCount(){ Band_colors.length = Band_count; Band_amps.length = Band_count }//Band_colors.slice(0,band_count)
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
			<p class="left">Changing background:</p>
			<label class="switch">
				<input type="checkbox" checked bind:value={Changing_bg}>
				<span class="slider round"></span>
			</label>
		</div>


	{/if}
</div>

<style>

:root {
  --field_marg_top: 10px;
  --field_marg_top_2: 15px;
}

br{
	height: 0px;
}

.top_config{
	padding-top: 5%;
	height: auto;
	display: block;
	text-align: center;
	margin-left: 30%;
	margin-right: 30%;
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

.textField{
	margin-top: var(--field_marg_top_2);
	margin-left: 10px;
	height: 2%;
	vertical-align: middle;
	width: 6%;
	border: none;
	border-radius: 10px;
}

select{
	margin-top: var(--field_marg_top_2);
	height: 2%;
	vertical-align: middle;
	width: 6%;
	border: none;
	border-radius: 10px;
}

/* slider stuff */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
	background: rgb(213,51,105);
	background: -moz-linear-gradient(90deg, rgba(213,51,105,1) 0%, rgba(218,174,81,1) 100%);
	background: -webkit-linear-gradient(90deg, rgba(213,51,105,1) 0%, rgba(218,174,81,1) 100%);
	background: linear-gradient(90deg, rgba(213,51,105,1) 0%, rgba(218,174,81,1) 100%);
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>
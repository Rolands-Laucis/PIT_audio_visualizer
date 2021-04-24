<script>

    export let type, text;
    let val;

</script>


<div class="option">
    <p>{text}</p>
    <input type="number" min="1" max="5" class="numField" bind:value={val}/>
</div>

<style>
.option{
	padding-top: 3%;
	display: flex;
	vertical-align: middle;
    margin: none;
}

.numField{
	height: 2%;
	vertical-align: middle;
}
</style>

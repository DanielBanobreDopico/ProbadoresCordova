<script>
	var deviceReady = false;
	var flashlightAvailable = false;
	/*function cosa (isAvailable) {
		if (isAvailable) {
		
			// switch on
			window.plugins.flashlight.switchOn(
			function() {}, // optional success callback
			function() {}, // optional error callback
			{intensity: 0.3} // optional as well
			);
		
			// switch off after 3 seconds
			setTimeout(function() {
			window.plugins.flashlight.switchOff(); // success/error callbacks may be passed
			}, 3000);
		
		} else {
			alert("Flashlight not available on this device");
		}
	};*/
</script>

<main>
	{deviceReady}
	{flashlightAvailable}
	<button>Linterna</button>
</main>

<style>
	* {
		background-color: green;
	}
</style>
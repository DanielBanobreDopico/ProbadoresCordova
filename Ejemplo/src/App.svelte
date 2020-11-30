<script>
	export let name;
	export let ready = false;

	var callState = 0;

	document.addEventListener("deviceready", () => {
		ready = true;
	})

	function updateCallState () {
		an_sensors.getDeviceNetwokActivity(
			function(res) {
				callState = res;
			},
			function(res) {
				console.error("Error form cordova sensors plugin");
			}
		);
	}

	setInterval(updateCallState,1000);

</script>


<h1>Hello {name}!</h1>
{#if ready}
	<h2>Cordova deviceready fired!</h2>
{:else}
	<h2>Waiting for cordova deviceready</h2>
{/if}

{callState}

<style>
	h1 {
		color: purple;
	}
</style>

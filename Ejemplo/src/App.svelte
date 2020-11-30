<script>
	export let name;
	export let ready = false;

	var bioCompatible = false;
	var autenticado = false;

	document.addEventListener("deviceready", () => {
		ready = true;
		Fingerprint.isAvailable(isAvailableSuccess, isAvailableError);
 	})

	function isAvailableSuccess(result) {
		console.log('Compatible con autenticación biometrica');
		bioCompatible = true;
	}
	
	function isAvailableError(error) {
		console.log('NO coompatible con autenticación biometrica: ', error.message);
	}

	function autenticate () {
		Fingerprint.show({
		description: "Identifícate"
		}, successCallback, errorCallback);
	}

    function successCallback(){
		console.log("Autenticado correctamente");
		autenticado = true;
    }
 
    function errorCallback(error){
		console.log("Error en la autenticación:", error.message);
	}
	
</script>


<h1>Hello {name}!</h1>
{#if ready}
	<h2>Cordova deviceready fired!</h2>
{:else}
	<h2>Waiting for cordova deviceready</h2>
{/if}

{#if ready && bioCompatible}
<button on:click={autenticate}>Autenticate</button>
{:else}
<p>El dispositivo no es compatible con autenticación biométrica.</p>
{/if}

{#if autenticado}
<img alt="Autenticado" src="lockOpened.svg"/>
{:else}	
<img alt="No autenticado" src="lockClosed.svg"/>
{/if}

<style>
	h1 {
		color: purple;
	}
</style>

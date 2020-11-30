import App from './App.svelte';
console.log('start')

function onDeviceReady(){
	console.log('onDeviceReady')
    const app = new App({
        target: document.body,
        hydrate: true
    });
}
document.addEventListener('deviceready', onDeviceReady, false);

export default app;
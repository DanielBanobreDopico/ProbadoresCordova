# Android APK con Cordova en Ubuntu 12.04

## Instalación

### Prerequisitos

#### Java JDK

```bash
$ sudo apt install openjdk-8-jdk
```

#### Android Studio
Para la creación de las APK Cordova depende del *Android Development Kit*. Para poder probar nuestras APK nos interesa disponer de un emulador de Android en nuestro ordenador. La forma más sencilla en la actualidad de obtener estos dos elementos es instalar Android Studio.

La instalación de Android Studio varía en cada versión. Actualmente la forma más sencilla de instalarlo en Ubuntu es desde la tienda de aplicaciones de Ubuntu. La forma de hacerlo desde el terminal es:
```bash
$ sudo snap install android-studio --classic
```
Abrimos Android Studio por primera vez. Empezará a realizar una serie de descargas e instalaciones en segundo plano. Se tomará su tiempo. Aparecerán notificaciones indicandote que existen actualizaciones pendientes. Actualiza. Tendrás que aceptar algunas licencias para poder continuar. 

Busca este icono: ![](imgs/AVD%20manager.png). Es el administrador de virtualización de Android. Entra en el para crear una máquina virtual de Android. Te recomiendo seleccionar de la lista propuesta una versión que incluya el *Play Store*.

Ahora busca este otro icono: ![](imgs/SDK%20Manager.png). Es el administrador de SDK. Abrelo w instala una versión más o menos reciente. Durante la instalación se mostrará la ruta en la que se instala el SDK.  Será algo parecido a `/home/TuUsuario/Andorid/SDK`. Toma nota de ella.Te hará falta.

#### Gradle
```bash
$ sudo apt install gradle
```
#### Variables de entorno de sistema
Necesitamos establecer un par de variables de sistema para indicar a otras herramientas en donde encontrar el SDK de Android y el ejecutable de Gradle. Abrimos el archivo de configuración del entorno de usuario:
```bash
$ gedit ~/.bashrc
```
Añadimos al final del fichero unas lineas como las siguientes. La ruta del `ANDROID_SDK_ROOT` ha de ser la mostrada durante la instalación del mismo:
```
export ANDROID_SDK_ROOT=~/Android/Sdk/
export PATH=$PATH:/snap/android-studio/current/android-studio/plugins/gradle/lib/
export PATH=$PATH:~/Android/Sdk/emulator
```
Guardamos los cambios y cerramos el editor de texto. Para hacer efectivos los cambios sin reiniciar la sesión:
```bash
$ source ~/.bashrc
```
#### Node.js con NVM
Para la instalación de Cordova hemos de instalar el paquete **Cordova** de NPM de forma global.

Instalar un paquete de NPM de forma global significa que el paquete no se instala en un proyecto de Node específico, sino que está disponible para su uso de forma general. Este tipo de instalación suele emplearse para herramientas generales de desarrollo. En este caso Cordova.

La forma recomendada de realizar este tipo de instalaciones es instalando previamente *Node.js* mediante **NVM**. NVM es un gestor de versiones de Node.js. Nos permite tener diferentes versiones de Node en nuestro sistema y emplear una u otra según nuestro interés en cada momento.

NVM instala Node en el entorno de usuario, lo que implica que *no necesitamos accedo privilegiado al sistema para instalarlo*, lo que puede mejorar en algunos aspectos la seguridad del sistemay facilitar algunos procesos, como por ejemplo instalar paquetes a nivel global con NPM.

Asegurate de haber desinstalado Node.js de tu sistema. Al intentar ejecutar `node` desde el terminal, hemos de recibir un mensaje indicandonos que ese comando no existe, no se encuentra, no está disponible.

Seguimos las instrucciones en [la página de NVM](https://github.com/nvm-sh/nvm#install--update-script). **No seas loca**. Consulta la documentación del programa para saber lo que estás haciendo:
```bash
$ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
$ source ~/.bashrc
$ nvm list-remote
$ nvm install node
$ nvm list
$ node -v
$ npm -v
```
### Cordova
```bash
$ npm install cordova -g
$ cordova -v
```
## Ciclo de vida de un proyecto Cordova

### Creación del proyecto
Con el siguiente comando crearás una carpeta para tu proyecto de Cordova:
```bash
$ cordova create CordovaTest
$ cd CordovaTest
$ ls
config.xml  package.json  www
```
En el proyecto está incluida una pequeña aplicación de muestra que te encontrarás en la carpeta *www*. El concepto es muy sencillo. *Cordova* empaquetará el contenido de *www* en el formato correspondiente para la plataforma que le indiquemos (*APK para Android, por ejemplo*).
### Instalación de plataformas de destino
Vamos a especificar Android como una de las plataformas para nuestro proyecto:
```bash
$ cordova platform
$ cordova platform add android
    [...]
Installing "cordova-plugin-whitelist" for android
Adding cordova-plugin-whitelist to package.json
```
Podemos conprobar que se ha añadido:
```bash
$ cordova platform
Installed platforms:
  android 9.0.0
Available platforms: 
  browser ^6.0.0
  electron ^1.0.0
```
### Prueba en emuladores

#### En el navegador
```bash
$ cordova serve
```
#### En el emulador
Puede tomarle un buen rato:
```bash
$ cordova emulate
```
Se abrirá el emulador de Android. Si la aplicación no inicia dejar el emulador abierto y ejecuta el comando nuevamente. En ocasiones, el tiempo que el emulador necesita para abrir hace que la app no arranque en el primer intento.
### Construir el paquete
```bash
$ cordova build android
40 actionable tasks: 40 up-to-date
Built the following apk(s): 
        /home/usuario/.../proyecto/platforms/android/app/build/outputs/apk/debug/app-debug.apk
```
## Cordova plugins
Cordova no sólo nos permite empaquetar nuestros frontend para desplegarlas como aplicaciones nativas, sino que nos proporciona acceso a capadidades de los dispositivos que normalmente están vetados al navegador.

Esto se consigue mediante la adición de [plugins de Cordova](https://cordova.apache.org/plugins/). Estos plugins son pequeñas aplicaciones escritas en lenguajes nativos del dispositivo que ofrecen una interface a Cordova para que nuestro código JavaScript.

### Añadiendo plugins
```bash
$ cordova plugin add cordova-plugin-flashlight
$ cordova plugin
```
## Debug
Desde un navegador basado en Chromium puedes abrir la dirección [chrome://inspect/#devices](chrome://inspect/#devices) que te dará acceso a las aplicaciones web que ejecutes en el emulador de Android o en tus dispositivos físicos en los que hayas habilitado la [depuración USB](https://developer.android.com/studio/debug/dev-options?hl=es).

## Ejemplo Svelte-Cordova
Disponemos de plantillas para iniciar fácilmente proyectos Svelte para empaquetar en Cordova. Puedes encontrarlos en GitHub. Un ejemplo es yonip/svelte-cordova-template. Tienes las instrucciones en [la página del proyecto](https://github.com/syonip/svelte-cordova).

Veamos el proceso de creación del ejemplo adjunto en la carpeta *Ejemplo*:

Creamos un clon de la plantilla.
```bash
$ npx degit syonip/svelte-cordova-template Ejemplo
```
Instalamos los módulos mediante *NPM*:
```bash
$ cd Ejemplo
$ pwd
/home/.../Ejemplo
$ npm install
$ cd src-cordova
$ pwd
/home/.../Ejemplo/src-cordova
$ npm install
```
Instalamos la plataforma *Android* para *Cordova.*. Instalamos el plugin que necesitaremos para este proyecto.
```bash
$ pwd
/home/.../Ejemplo/src-cordova
$ cordova platform add android
$ cordova platform
$ cordova plugin add cordova-plugin-fingerprint-aio
$ cordova plugin
```
Arrancamos la plantilla de la aplicación en el simulador. Si en el primer intento no funciona, mantén el simulador iniciado y repite la instrucción.
```bash
$ cd ../
$ pwd
/home/.../Ejemplo
$ npm run dev-android
```
Puedes abrir un navegador basado en Chromium para depurar la aplicación accediendo a la dirección: [chrome://inspect/#devices](chrome://inspect/#devices)

Puedes consultar el código en el fichero `src/App.svelte` y la documentación del plugin [en su web](https://www.npmjs.com/package/cordova-plugin-ebw-fingerprint-aio) para ver el funcionamiento de la aplicación.

Especialmente importante es el uso de `document.addEventListener` que permite diferir la ejecución de métodos de los plugins de *Cordova* al momento en que se ha terminado de cargar la aplicación.

Cuando ejecutamos nuestras aplicaciones en dispositivos físicos nunca podemos saber a priori si el dispositivo soporta las capacidades necesarias para nuestra aplicación. Normalmente los plugins dispondrán de algún método que permite comprobar este extremo. En el ejemplo el método `Fingerprint.isAvailable` permite comprobar si el dispositivo dispone de mecanismos de reconocimiento biométricos y están configurados para poder ser empleados.

Finalizada la aplicación, podemos obtener el APK para la instalación de la misma 
```bash
Ctrl+C
$ pwd
/home/.../Ejemplo
$ npm run build-android
Built the following apk(s): 
        /home/.../Ejemplo/src-cordova/platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

# Aplicación para la reproducción de podcasts

En este repositorio se aloja el código de una mini-aplicación para escuchar podcasts musicales. Existen 2 modos de ejecución de la misma: modo _development_  y modo _production_. La idea es crear una _Single Page Application (SPA)_ que permite reproducir podcasts.

## Primer paso

Para construir y ejecutar la aplicación deberemos clonar el repositorio e instalar sus dependencias. Para clonar el repositorio es necesario tener instalado Git. Para instalar las dependencias es necesario tener instalado un gestor de dependencias como [npm][npm].

### Clonar el repositorio

Para clonar el repositorio se debe ejecutar la siguiente instrucción:

```
git clone https://github.com/marcosdarri/podcaster.git
```

### Instalar las dependencias

Para instalar las dependencias primero nos situaremos en la raíz del proyecto (donde se encuentra el `package.json`):

```
cd podcaster
```
Llegados a este punto lo único que faltaría sería instalar las dependencias, para ello:

```
npm install
```

## Ejecución de la aplicación
Tenemos dos modos de ejecución de la aplicación, modo _development_ y modo _production_. En el modo _development_ los assets se sirven sin minimizar y en el modo _production_ se sirven concatenados y minimizados.

### Modo _development_

Para ejecutar la aplicación en modo desarrollo debemos situarnos en la raíz del proyecto (donde se encuentra el fichero `package.json`) y ejecutar la siguiente orden:

```
npm start
```

Esto iniciará un servidor local de desarrollo. Haz clic en http://localhost:3000 para visualizar la SPA en tu navegador. El modo _development_ permite recargar la página en el momento que salvas los cambios realizados en el código.

### Modo _production_

Para ejecutar la aplicación en modo producción debemos situarnos en la raíz del proyecto (donde se encuentra el fichero `package.json`) y ejecutar la siguiente orden:

```
npm run build
```

Esta orden construye la aplicación minificada generando ficheros estáticos para producción optimizados para un mejor rendimiento y los coloca en el directorio `build`, el cual queda ya preparado para ser desplegado en producción.

Se puede servir con un servidor estático, por ejemplo con [serve][serve], podemos hacerlo pasándole el directorio `build` creado anteriormente de la siguiente manera:

```
npm install -g serve
serve -s build
```

Para visualizar la SPA en modo _production_ debemos acceder a la URL: http://localhost:3000.

[serve]: https://www.npmjs.com/package/serve
[npm]: https://www.npmjs.com/

### Importante a tener en cuenta

Le agregué un lapso de 0,5 segundos de espera cada vez que se carga una pantalla para simular la tardanza normal que lleva a los servicios traer la infomación de la base de datos. Esto también sirve para que se vean los componentes de espera (Loader) mientras carga la pagina.

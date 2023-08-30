# Multivende Coding Challenge

## Parte II: Uso API de Multivende

En esta segunda parte del reto de código, te enfocarás en el consumo de servicios de una API Rest con autenticación. Para completar la prueba, deberás proporcionar lo siguiente:

- Acceso al repositorio: Por favor, proporciona el enlace a tu repositorio en el que has realizado la prueba.
- Archivos de carga masiva: Se requieren archivos de carga masiva que contenga datos para crear productos y actualizar el stock. Este archivo se utilizará en las pruebas de la segunda fase.

Las tecnologías que deberás utilizar son:
- Express: Utiliza Express para construir la aplicación web que consumirá la API Rest con autenticación.
- RabbitMQ: Utiliza RabbitMQ para implementar la comunicación asincrónica entre diferentes partes de la aplicación.

Utilizando la API de Multivende

Link a la documentación de la API: https://dev.multivende.com/?version=latest
Usar como base url https://app.multivende.com

1. Crea una cuenta de Vendedor (Merchant) de prueba siguiendo los pasos de [¿Cómo crear una cuenta en Multivende?](https://help.multivende.com/knowledge/como-crear-una-cuenta)
2. Realiza el proceso de autenticación con OAuth2, siguiendo los pasos del artículo https://help.multivende.com/knowledge/autenticacion-con-oauth2 (la aplicación ya se encuentra registrada dentro de nuestra plataforma y las credenciales estan a continuación).
    a. Para el Oauth2 utiliza los siguientes datos:
        - client_id: 896123781342
        - client_secret: MjA5tPEuOkYS600yeJdDNCteBS5uKsHxdugztcXiWiOKqYmlYT
    b. La URL definida para redireccionar "redirect_uri" es: http://localhost:3000/configuration. Por lo que tu aplicación debe correr en el puerto 3000.
    c. En este paso, llega a una vista donde deberás hacer clic en el botón "si" y luego en "guardar". Esto te redireccionará a la URL mencionada en el punto anterior.

3. Asegúrate de que tu aplicación tenga implementado el proceso de refrescado de token.
4. Para obtener la información de tu aplicación y el merchant que te otorgó el acceso, usa el endpoint [Get app information](https://dev.multivende.com/#c9a3de4b-0c22-4402-af22-3a585f338d4f).
5. Crea un script que permita la creación masiva de productos a Multivende utilizando el endpoint [Create product](https://dev.multivende.com/#8782cc96-5f6c-48b9-b8e6-2bb80fc6cb56) con los campos mínimos requeridos.
    a. Estos productos deben ser almacenados en una base de datos de tu aplicación y guardar el estado de procesamiento de cada producto así como el estado del proceso en general. 
    b. Debe considerar la carga de al menos 50000 productos en un mismo proceso.
        
Consideraciones adicionales:
- El rps (peticiones por segundo) es de 5.
- En caso de error, realiza un reintento máximo de 3 veces, dejando un log del error.
- Crear una api para poder consultar el estado de la creación de los productos.

Si necesitas más ayuda o tienes alguna otra solicitud, no dudes en escribirnos. ¡Buena suerte con tu proyecto!



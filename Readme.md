# **KNIGHT BANK**

### Acerca del proyecto

Knight proyect es un proyecto didactico de uso meramente educativo que se enfoca en simular una banca online, en la que se ofrece una pagina visual a modo de web con un simulador de varios tipos de prestamo ademas de una app con la que disponemos de un gestor de finanzas, uno de movimientos y un sistema de gestion de usuarios (exclusivo de administradores).

### Integrantes 

- Gabriel Vargas (especialista Frontend)
- Josu Diez (especialista Backend)

### Tecnologias usadas

- Mysql
- PHP
- JavaScript
- Html
- Sass
- Css
- Angular
- JQuery
- Chartjs
- Git

### Componentes

- Servidor de hosting (guebs)
- Dominio knightbank.net
- Base de datos grupo2ze_banca
- Lenguajes de programacion (Html, css, Sass, JavaScript y PHP)

### Acerca del despliegue

La web se encuentra desplegada en el domino https://knightbank.net/ alojado dentro del hosting de guebs. Haciendo uso de la funcionalidad que Cpanel incluye dicho servico que nos permite actualizar el contenido de la web a traves de un repositorio de guitHub tanto de forma manual como automatica. En nuestro caso, se hacen los despluegues a partir de la rama master de forma manual. 

### Proceso de despluegue 

1. Preparativos previos 
   1. Habilitar el acceso SSH desde el hosting
   ![image](https://user-images.githubusercontent.com/95285641/214030162-d06450ba-ba4b-41cf-b627-9f7153b20dc5.png)

   2. Conectarnos mediante SSH y generar una una key ssh
   ![image](https://user-images.githubusercontent.com/95285641/214030495-e8f24d02-b530-4102-8a7c-fa7123ef1152.png)
   ![image](https://user-images.githubusercontent.com/95285641/214030512-4449c123-1bde-44e8-b3b7-97e4d56f92da.png)

   ![image](https://user-images.githubusercontent.com/95285641/214030525-bfeb47ef-13a7-4e4a-b492-699908c7e006.png)
   ![image](https://user-images.githubusercontent.com/95285641/214030547-fd8ee4ec-7d27-452e-acf4-5d31376dc52a.png)
   
   3. Introducir la key generada en github
  ![image](https://user-images.githubusercontent.com/95285641/214030670-596545d3-e692-4a76-825b-1c3426ba7a82.png)
  ![image](https://user-images.githubusercontent.com/95285641/214030685-0bb44987-57bc-456a-91dd-9c493dd4695e.png)

> NOTA: Los datos mostrados son de ejemplo y por tanto, no son los que realmente estan en funcionamiento

2. Accedemos al Cpanel
  ![image](https://user-images.githubusercontent.com/95285641/214031466-854d592c-c198-4956-aa02-350fd2082a08.png)

3. Entramos a la seccion de Git
![image](https://user-images.githubusercontent.com/95285641/214031619-808d646e-bebf-4ab4-b401-e9af07f7b930.png)

4. Rellenamos los datos
![image](https://user-images.githubusercontent.com/95285641/214031756-0418a041-cf06-4adc-b75c-5de116e5e4f4.png)

5. Al crear es posible que de error, eso se puede deber a varios motivos siendo los mas habituales fallos con la conexion ssh entre el hosting y github (hay ganan importancia los preparativos previos)

6. Crear un fichero cpanel.yml que contendra los comandos de despliegue
![image](https://user-images.githubusercontent.com/95285641/214032194-10a79107-8cf6-45e1-9bb6-2c474da27a5e.png)
![image](https://user-images.githubusercontent.com/95285641/214032209-3c9fce51-d54f-4957-91eb-1651747d669e.png)
![image](https://user-images.githubusercontent.com/95285641/214032224-fe6571ac-bc94-4017-863f-63df407d5f63.png)





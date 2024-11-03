# Pasos para la intalacion en entorno Local

## requisitos 

* Node
* npm
* Mysql

## Clonar repositorio

En la carpeta de su preferencia ejecutar desde la terminal 

```
git clone https://github.com/magoos140/Personal-Expenses.git
```

## Crear la base de datos 

Conectate a el servidor de base de datos que tengas en local y crea la base de datos.

```
CREATE DATABASE  IF NOT EXISTS `personal_expenses`
```

## Instalar y correr la api 

Abra la terminal estando en la raiz del proyecto y despues ingrese a la carpeta api

```
cd api
```

Instale las dependecias con npm install
```
npm install
```

Ingrese al archivo config.js y asegurese que la constante sequelize tenga los datos respectivos para la conexion a su base de datos **deben corresponder a la configuracion mysql que tenga en su local**
```
const sequelize = new Sequelize('name_data_base', 'user', 'pass', {
  host: 'localhost',
  dialect: 'mysql',
});
```

Adentro de la carpetya Api abra una terminal y ejecute :
```
node app.js
```

si todo sale bien deberia ver el mensaje **Servidor corriendo en http://localhost:3001**

## Instalar y correr Frontend

**Es necesario que la api este corriendo para poder hacer solicitudes**

Abra una nueva terminal en la raiz del proyecto y navegue a la carpeta ***front-expenses***
```
cd front-expenses
```

Instale las dependecias con npm install
```
npm install
```

Ejecute el comando npm start
```
npm start
```
si todo sale bien deberia abrirse su proyecto en el  http://localhost:3000 del navegador

## Agregar datos de prueba en la base de datos

desde el administrador de bases de datos o la terminal agrega los siguientes datos a las tablas 

```
INSERT INTO `Categories` VALUES (1,'Food','2024-11-01 14:39:35','2024-11-01 14:39:35'),(2,'Transportation','2024-11-01 14:39:35','2024-11-01 14:39:35'),(3,'Entertainment','2024-11-01 14:39:35','2024-11-01 14:39:35'),(4,'Health','2024-11-01 14:39:35','2024-11-01 14:39:35'),(5,'Housing','2024-11-01 14:39:35','2024-11-01 14:39:35'),(6,'casino','2024-11-02 15:13:11','2024-11-02 15:13:11');
INSERT INTO `Expenses` VALUES (20,40,2,'2024-10-30','Random','2024-11-02 17:00:00','2024-11-02 17:00:00'),(21,737.77,2,'2024-10-29','Description 59','2024-11-02 16:15:57','2024-11-02 21:57:47'),(22,223,3,'2024-10-02','Description 39','2024-11-02 16:15:57','2024-11-02 21:51:12'),(23,655.51,1,'2024-03-05','Description 96','2024-11-02 16:15:57','2024-11-02 21:50:33'),(24,795.06,1,'2024-09-30','Description 18','2024-11-02 16:15:57','2024-11-02 16:15:57'),(25,608.4,4,'2024-02-12','Description 10','2024-11-02 16:16:37','2024-11-02 16:16:37'),(26,281.93,1,'2024-01-01','Description 79','2024-11-02 16:16:37','2024-11-02 16:16:37'),(27,421.39,5,'2024-05-23','Description 1','2024-11-02 16:16:37','2024-11-02 16:16:37'),(28,699.59,3,'2024-07-27','Description 93','2024-11-02 16:16:37','2024-11-02 16:16:37'),(29,828.29,3,'2024-07-12','Description 48','2024-11-02 16:18:40','2024-11-02 16:18:40'),(30,437.09,5,'2024-04-29','Description 28','2024-11-02 16:18:40','2024-11-02 16:18:40'),(31,829.67,2,'2024-09-13','Description 72','2024-11-02 16:18:40','2024-11-02 16:18:40');
```
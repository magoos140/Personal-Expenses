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

## Instalar la base de datos 

En la raiz del proyecto encotrara un archivo llamado ***personal-expenses.sql*** Ejecute este dump en el editor de bases de datos de su preferencia

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
si todo sale bien deberia abrirse su proyecto en el localhost:3000 del navegador

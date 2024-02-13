# Saint Andrew's School

## Administración de Aulas

Este proyecto del lado del frontend ha sido desarrollado con el framework **Angular**

### Requisitos:

- **Tener el Backend en funcionamiento**
- **Node.js V 20.11 o superior**
- **Angular CLI V17.1 o superior**

### Ejecución:

1. Ejecutar en la consola el comando **"npm install"**
2. Ejecutar el comando **"ng serve"** esto ejecutará el proyecto en http://localhost:4200
3. Por defecto el proyecto consume la data del **API Laravel** en dirección http://localhost:8000/api puede modificar esto si se desea en src/environments/environment.development.ts se encuantran las variables de entorno que deberían verse de la siguiente manera.

```Typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api',
};
```

Modifique la propiedad **apiUrl** según se requiera

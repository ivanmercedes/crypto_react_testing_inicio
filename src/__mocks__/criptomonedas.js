// leer archivos
import { readFileSync } from 'fs';
// retornar la ubicacion del archivo
import  path from 'path';
// Leer el archivo json y convertilo en un objecto js
 export const criptos = JSON.parse(
     // leemos la ubicacion del archivo siempre
     readFileSync(path.join(__dirname,'api.json')).toString()
 );



export const monedas = [
    { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
    { codigo: 'MXN', nombre: 'Peso Mexicano' },
    { codigo: 'EUR', nombre: 'Euro' },
    { codigo: 'GBP', nombre: 'Libra Esterlina' }
];
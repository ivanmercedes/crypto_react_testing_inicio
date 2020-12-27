import React from 'react';
// importar siempre render y screen
import { render, screen } from '@testing-library/react';
import Formulario from '../components/Formulario';
// importar userEvent ( es una forma de trabajar con elementos )
import userEvent from '@testing-library/user-event';
// importo el mock para montar el fake server
import { monedas, criptos } from '../__mocks__/criptomonedas';
import axios from 'axios';

const mockAxios = axios;

// creando funciones falsas que se comportan como las reales
const guardarMoneda = jest.fn();
const guardarCriptomoneda = jest.fn();

test('<useCriptomodenas />', async ()=>{
    // consumir datos falsos
    mockAxios.get = jest.fn().mockResolvedValue({
        data: criptos
    })
    // montamos el formulario
    render(
       <Formulario 
       guardarMoneda={guardarMoneda}
       guardarCriptomoneda={guardarCriptomoneda}
       />
    );

    // Verificar las cantidades de monedas en las opciones del select
    const monedasDropdown = screen.getByTestId('select-monedas');
    // valido que solo sean 5 opciones incluyendo el option default 
    expect(monedasDropdown.children.length).toEqual(monedas.length + 1);

    // verificar la cantidad de opciones de criptomonedas
    const opciones = screen.findAllByTestId('option-cripto');
    expect( await opciones ).toHaveLength(10);

    expect( mockAxios.get).toHaveBeenCalled();
    expect( mockAxios.get).toHaveBeenCalledTimes(1);

    // Seleccionar Bitcoin y USD
    userEvent.selectOptions( screen.getByTestId('select-monedas'), 'USD');
    userEvent.selectOptions( screen.getByTestId('select-criptos'), 'BTC');
    
    // simular submit del formulario
    userEvent.click( screen.getByTestId('submit'));

    // verificar que las funciones se hayan llamado
    expect( guardarMoneda ).toHaveBeenCalled();
    expect( guardarMoneda ).toHaveBeenCalledTimes(1);
    expect( guardarCriptomoneda ).toHaveBeenCalled();
    expect( guardarCriptomoneda ).toHaveBeenCalledTimes(1);



});
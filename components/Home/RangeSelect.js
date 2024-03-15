import React, { useState } from 'react';

function RangeSelect({ onRadiusChange }) {
    const [radius, setRadius] = useState(10);

    const handleRadiusChange = (e) => {
        const valueInKilometers = e.target.value;
        setRadius(valueInKilometers);
        onRadiusChange(valueInKilometers);
    };
 
    return (
        <div className='mt-5'>
            <h2 className='font-bold px-2'>Selecciona el radio (en Kilómetros)</h2>
            <input
                type='range'
                className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
                min="0"
                max="10000"
                step="100"
                onChange={handleRadiusChange}
                defaultValue={radius}
            />
            <label className='text-gray-500 text-[15px]'>En {radius} Km</label>
        </div>
    );
}

export default RangeSelect;

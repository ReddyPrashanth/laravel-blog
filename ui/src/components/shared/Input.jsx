import React from 'react';
import InputError from './InputError';

const Input = ({name, label, error, ...rest}) => {
    return (
        <div className="mb-2">
            <label htmlFor={name} className="
                block
                text-sm
                font-bold
                mb-1
                text-gray-700
            ">
                {label}
            </label>
            <input 
                {...rest}
                id={name}
                name={name}
                className="
                    border
                    rounded
                    px-2
                    py-1
                    w-full
                "
            />
            {error && <InputError>{error}</InputError>}
        </div>
    )
}

export default Input;
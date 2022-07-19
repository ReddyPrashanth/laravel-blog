import React from 'react';
import InputError from './InputError';

const TextArea = ({name, label, rows, error, ...rest}) => {
    return (
        <div>
            {label && <label htmlFor={name} className="
                block
                text-sm
                font-bold
                mb-1
                text-gray-700
            ">
                {label}
            </label>}
            <textarea 
                {...rest}
                name={name}
                id={name}
                rows={rows}
                className="
                    border
                    rounded
                    px-2
                    py-1
                    w-full
                    text-sm
                "
            />
            {error && <InputError>{error}</InputError>}
        </div>
    )
}

export default TextArea;
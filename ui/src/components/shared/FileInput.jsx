import React from 'react';

const FileInput = ({name, label, ...rest}) => {
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
                    block
                    w-full
                    text-sm
                    text-gray-900
                    rounded
                    border
                    border-gray-300
                    cursor-pointer
                    dark:text-gray-400
                    focus:outline-none
                    dark:bg-gray-700
                    dark:border-gray-600
                    dark:placeholder-gray-500
                    p-1
                "
            />
        </div>
    )
}

export default FileInput;
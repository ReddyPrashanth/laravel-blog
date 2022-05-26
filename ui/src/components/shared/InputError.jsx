import React from 'react';

const InputError = (props) => {
    return (
        <span className="text-xs text-red-600 font-medium">{props.children}</span>
    )
}

export default InputError;
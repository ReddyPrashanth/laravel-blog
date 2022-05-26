import React from 'react';

const Button = ({text, styles, type, onClick}) => {
    return (
        <button className={styles} type={type} onClick={onClick}>
            {text}
        </button>
    )
}

Button.defaultProps = {
    text: 'Button',
    styles: 'border text-gray-800 font-medium text-sm rounded py-1 px-2',
    type: 'button'
}

export default Button;
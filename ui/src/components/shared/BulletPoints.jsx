import React from 'react';

const BulletPoints = ({listItems}) => {
    return (
        <ul className="text-sm mb-4 p-2 border rounded list-disc bg-gray-100 list-inside">
            {listItems.map((l, idx) => 
                <li className="mb-1" key={idx}>{l}</li>    
            )}
        </ul>
    )
}

export default BulletPoints;
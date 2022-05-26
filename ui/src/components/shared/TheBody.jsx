import React from 'react';
import Description from '../shared/Description';
import BulletPoints from './BulletPoints';

const TheBody = ({body}) => {
    return (
        <div>
            <Description description={body.content}/>
            {body?.list_items.length > 0 && <BulletPoints listItems={body.list_items}/>}
        </div>
    )
}

export default TheBody;
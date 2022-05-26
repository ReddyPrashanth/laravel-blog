import React from 'react';
import BlockQuote from './BlockQuote';
import SubTitle from "./SubTitle"
import TheBody from './TheBody';

const TheContent = ({content}) => {
    const {sub_title, annotation, body} = content;
    return (
        <div>
            <SubTitle subTitle={sub_title}/>
            {annotation && <BlockQuote quote={annotation}/>}
            {body.map((b, idx) => <TheBody key={idx} body={b}/>)}
        </div>
    )
}

export default TheContent;
import React from 'react';


const item = (props) => {

    return (

        <div className="item">
        <p> {props.name}: {props.quantity}</p>
        
        

        </div>
    )
};

export default item;
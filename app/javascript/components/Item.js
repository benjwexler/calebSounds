import React from 'react';

const item = (props) => {

    return (

        <div className="Item"
        
        >
        <button  
        
        onClick={props.click}
        onMouseOver={props.hover}
        >Add To cart:</button>
         {props.name}

        </div>
    )
};

export default item;
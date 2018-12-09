import React from 'react';


const cartBtn = (props) => {

    return (

      
        <button className="cartBtn" onClick={props.click} onMouseOver={props.hover}> 
            Add To cart:
        </button>
        
    )
};

export default cartBtn;
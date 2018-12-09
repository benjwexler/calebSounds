import React from 'react';


const cartBtn = (props) => {

    return (

        <div className="cartBtn">
        <button onClick={props.click} onMouseOver={props.hover}>
            Add To cart:
        </button>
        

        </div>
    )
};

export default cartBtn;
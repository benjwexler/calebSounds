import React from 'react';


const item = (props) => {

    return (

        <div className="item">
            <div className="shoppingCartItemContainer">
             <img className="cartPic" src={props.coverArtPic} />
                <p className="cartItemName"> {props.name} </p>
                <p className="cartItemQuantity"> {props.quantity}</p>
                <div className="trashIcon"> <i  onClick={props.deleteItem} data-kit-Id={props.kitId} className="fas fa-trash-alt"></i></div>
            </div>
        </div>
    )
};

export default item;
import React from 'react';


const item = (props) => {

    return (



        <div className="item">

            <div className="cartRow">
                <div className="itemQuantity"> {props.quantity} </div>
                <div className="itemTitle"> {props.name} </div>
                <div className="deleteItem">
                    <i onClick={props.deleteItem} data-kit-Id={props.kitId} className="fas fa-trash-alt"></i>
                </div>
                <div className="itemPrice"> {props.price} </div>
            </div>
          

            {/* <div id={props.kitId} data-kit-id={props.kitData} className="shoppingCartItemContainer">
                <img className="cartPic" src={props.coverArtPic} />
                <p className="cartItemName"> {props.name} </p>
                <div>{props.price}</div>
                <div className="subtractItem"> <i onClick={props.decreaseQuantity} class="fas fa-minus-square"></i></div>
                <p className="cartItemQuantity"> {props.quantity}</p>

                <div className="addItem"> <i onClick={props.increaseQuantity} class="fas fa-plus-square"></i></div>
                <div className="trashIcon"> <i onClick={props.deleteItem} data-kit-Id={props.kitId} className="fas fa-trash-alt"></i></div>
            </div> */}
        </div>
    )
};

export default item;
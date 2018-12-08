import React, { Component } from 'react';
import Item from './Item.js';
import ReactOnRails from 'react-on-rails';

class App extends React.Component {

  state = {
    cart: {}
  }



  addToCart = () => {

    console.log(this.props)

    let kitId = document.getElementById("addToCartButton").dataset.kitId

    console.log(kitId)
    console.log(this.state.cart)

    $.ajax({
      method: "POST",
      url: `/transactions/addToCart`,
      data: `authenticity_token=${ReactOnRails.authenticityToken()}`,
      dataType: 'script'
  });

    let cart = {...this.state.cart}

    if(cart[`${kitId}`] === undefined) {
      cart[`${kitId}`] = 1 
    } else {
      cart[`${kitId}`]++
    }

    this.setState({
      cart: cart
    });

  }

  hover = () => {
    document.getElementById("shoppingCartContainer").style.backgroundColor = "Black"

   

  }
  
  render () {
    return (
      <div className="App">
      <Item
        click={() => this.addToCart()}
       

      /> 
      </div>
    );
  }
}


export default App

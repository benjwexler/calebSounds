import ReactOnRails from 'react-on-rails';
import React, { Component } from 'react';
import CartBtn from './CartBtn.js';
import Item from './Item.js';



class App extends React.Component {

  constructor(props) {
    super(props);

  this.state = {
    cart: props
  }

}


  addToCart = () => {

    console.log(ReactOnRails.authenticityToken())
    let token = ReactOnRails.authenticityToken()

    let kitId = document.getElementById("addToCartButton").dataset.kitId

    console.log(kitId)

    let that = this
    
    var response = function (quantity) {

      let blah = JSON.parse(quantity)
      console.log(blah)

   
      // let cart = { ...that.state.cart }

      // if (cart[`${kitId}`] === undefined) {
      //   cart[`${kitId}`] = quantity
      // } else {
      //   // cart[`${kitId}`]++
      //   cart[`${kitId}`] = quantity
      // }

      that.setState({
        cart: blah
      });
      console.log(that.state.cart)
      console.log(Object.keys(that.state.cart))
    }

    $.ajax({
      method: "POST",
      url: `/transactions/addToCart`,
      data: `authenticity_token=${token}&kitId=${kitId}`,
      dataType: 'script',
      success: response
    })

  }

  render() {

    let items = (
      <div>
          
          {Object.keys(this.state.cart).map((item, index) => {
          return <Item
            quantity={this.state.cart[item]}
            name={item}
            key={item}
            
          />
        })}
      </div>
    );
    return (
      <div className="App">
        <CartBtn
          click={() => this.addToCart()}  
        />
        {items}
      </div>
    );
  }
}


export default App

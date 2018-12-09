import ReactOnRails from 'react-on-rails';
import React, { Component } from 'react';
// import './ShoppingCart.css';
import CartBtn from './CartBtn.js';
import Item from './Item.js';




class App extends React.Component {

  constructor(props) {
    super(props);

    this.compare = (a, b) => {
      console.log("Compare")
      const timestampA = this.state.cart[a].timestamp
      
      const timestampB = this.state.cart[b].timestamp

      let comparison = 0;

      if (timestampA > timestampB) {
        comparison = 1;
      } else if (timestampA <= timestampB) {
        comparison = -1;
      }
      return comparison;

    }

    this.state = {
      cart: props,
      date: new Date()
    }

  }


  addToCart = () => {
    let token = ReactOnRails.authenticityToken()

    let kitId = document.getElementById("addToCartButton").dataset.kitId
    let coverArtPic = document.getElementById("addToCartButton").dataset.pic


    let that = this

    var response = (quantity) => {

      let newCart = JSON.parse(quantity)
      console.log(that.state.cart)

      that.setState({
        cart: newCart
      });

    }



    $.ajax({
      method: "POST",
      url: `/transactions/cart/addToCart`,
      data: `authenticity_token=${token}&kitId=${kitId}&coverArtPic=${coverArtPic}`,
      dataType: 'script',
      success: response
    })

  }

  deleteItem = (e) => {
    console.log(e.target.dataset.kitId)

    let kitId = e.target.dataset.kitId
    console.log("about to delete")

    let token = ReactOnRails.authenticityToken()

    let that = this

    var response = (quantity) => {

      console.log(quantity)

      let newCart = JSON.parse(quantity)
      console.log("is delete processing")
      console.log(that.state.cart)

      // newCart = {...that.state.cart}
      // delete newCart[key]
      // delete newCart.kitId


      that.setState({
        cart: newCart,
        date: new Date()
      })

    }



    $.ajax({
      method: "POST",
      url: `/transactions/cart/deleteItemFromCart`,
      data: `authenticity_token=${token}&kitId=${kitId}`,
      dataType: 'script',
      success: response
    })


  }

  render() {

    let unsortedItems = Object.keys(this.state.cart)
    unsortedItems.sort(this.compare)

    let items = (
      <div>

        {unsortedItems.map((item, index) => {
          return <Item
            quantity={this.state.cart[item].quantity}
            name={`Kit ${item}`}
            key={item}
            coverArtPic={this.state.cart[item].pic}
            deleteItem={(e) => this.deleteItem(e)}
            kitId={item}
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

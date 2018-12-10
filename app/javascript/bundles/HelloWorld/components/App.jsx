import ReactOnRails from 'react-on-rails';
import React, { Component } from 'react';
// import './ShoppingCart.css';
import CartBtn from './CartBtn.js';
import Item from './Item.js';




class App extends React.Component {

  constructor(props) {
    super(props);

    this.railsToken = ReactOnRails.authenticityToken()

    this.compare = (a, b) => {
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

  increaseQuantity = (e) => {
    console.log(e.currentTarget.parentElement.parentElement.id)
    console.log(e.currentTarget.parentElement.getAttribute("class"))
    

  }


  addToCart = (e) => {
    let kitId
    let coverArtPic
    let data 
    // Conditional is to check whether click is from the "Add to Cart button" for the drum machine, or it's from the "plus1" counter for a kit already in the cart
    if(e.currentTarget.parentElement.getAttribute("class")=== "addItem") {
      kitId= e.currentTarget.parentElement.parentElement.id
      data = `authenticity_token=${this.railsToken}&kitId=${kitId}`
    } else {
      kitId = document.getElementById("addToCartButton").dataset.kitId
      coverArtPic = document.getElementById("addToCartButton").dataset.pic
      data = `authenticity_token=${this.railsToken}&kitId=${kitId}&coverArtPic=${coverArtPic}`
    }
     

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
      data: data,
      dataType: 'script',
      success: response
    })

  }

  decreaseQuantity = (e) => {

    let kitId= e.currentTarget.parentElement.parentElement.id
    let data = `authenticity_token=${this.railsToken}&kitId=${kitId}`

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
      url: `/transactions/cart/subtractFromCart`,
      data: data,
      dataType: 'script',
      success: response
    })

  }

  deleteItem = (e) => {
    console.log(e.target.dataset.kitId)

    let kitId = e.target.dataset.kitId
    console.log("about to delete")

    let that = this

    var response = (quantity) => {

      console.log(quantity)

      let newCart = JSON.parse(quantity)
      console.log("is delete processing")
      console.log(that.state.cart)

      that.setState({
        cart: newCart,
        date: new Date()
      })

    }

    $.ajax({
      method: "POST",
      url: `/transactions/cart/deleteItemFromCart`,
      data: `authenticity_token=${this.railsToken}&kitId=${kitId}`,
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
            kitData={item}
            increaseQuantity={(e) => this.addToCart(e)}
            decreaseQuantity={(e) => this.decreaseQuantity(e)}
          />
        })}
      </div>
    );

    return (
      <div className="App">
        <CartBtn
          click={(e) => this.addToCart(e)}
        />
        {items}
      </div>
    );
  }
}


export default App

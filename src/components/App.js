import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { FaAppleAlt, FaDrumstickBite, FaReceipt, FaShoppingCart, } from "react-icons/fa";
import '../style/App.css';
import Recepts from './Recepts';
import Menus from './Menus';
import ShopingList from './ShopingList';

class App extends Component {
  state = {
    products: [],
    recepts: [],
    menus: [],
    shopingListActiveItem: "nie dodano danych"
  }

  componentDidMount() {

    fetch(`http://localhost:5000/getfoods`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => this.setState({
        products: data
      }));

    fetch(`http://localhost:5000/getrecepts`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => this.setState({
        recepts: data
      }));

    fetch(`http://localhost:5000/getmenu`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => this.setState({
        menus: data
      }));
  };

  upgradeRecepts() {
    fetch(`http://localhost:5000/getrecepts`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => this.setState({
        recepts: data
      }));
  }

  upgradeMenus() {
    fetch(`http://localhost:5000/getmenu`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => { this.setState({ menus: data }) }
      );
  };

  setShopingListActiveItem(item) {
    this.setState({
      shopingListActiveItem: item
    })
  }

  render() {
    return (
      <Router>
        <div className="allSite">
          <div className="alwaysShow">
            <h1 className="appTitle">FOOD<FaAppleAlt />app</h1>
            <nav className="mainMenu">
              <NavLink to="/recepts" className='element'><FaDrumstickBite className="menuIcon" />Przepisy<div></div></NavLink>
              <NavLink to="/menu" className='element'><FaReceipt className="menuIcon" />Jadłospisy<div></div></NavLink>
              <NavLink to="/shopinglist" className='element'><FaShoppingCart className="menuIcon" />Lista zakupów<div></div></NavLink>
            </nav>
          </div>
          <div className="selectedOption">
            <Route path="/recepts" render={(props) => <Recepts {...props} upgradeRecepts={this.upgradeRecepts.bind(this)} setShopingListActiveItem={this.setShopingListActiveItem.bind(this)} products={this.state.products} recepts={this.state.recepts} />} />
            <Route path="/menu" render={(props) => <Menus {...props} upgradeMenus={this.upgradeMenus.bind(this)} setShopingListActiveItem={this.setShopingListActiveItem.bind(this)} recepts={this.state.recepts} menus={this.state.menus} />} />
            <Route path="/shopinglist" render={(props) => <ShopingList {...props} upgradeMenus={this.upgradeMenus.bind(this)} item={this.state.shopingListActiveItem} />} />
          </div>
          <div className="rightBorder"></div>
        </div>
      </Router >
    )
  }
}

export default App
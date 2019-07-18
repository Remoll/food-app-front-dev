import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { FaAppleAlt, FaDrumstickBite, FaReceipt, FaShoppingCart, FaRegSnowflake } from "react-icons/fa";
import '../style/App.css';
import Recepts from './Recepts';
import Menus from './Menus';
import ShopingList from './ShopingList';
import Fridge from './Fridge';

class App extends Component {
  state = {
    products: [],
    recepts: [],
    menus: [],
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

  render() {
    return (
      <Router>
        <div className="allSite">
          <div className="alwaysShow">
            <h1 className="appTitle">FOOD<FaAppleAlt />app</h1>
            <nav className="mainMenu">
              <NavLink to="/recepts" className='element'><FaDrumstickBite className="menuIcon" />Recepts<div></div></NavLink>
              <NavLink to="/menu" className='element'><FaReceipt className="menuIcon" />Menu<div></div></NavLink>
              <NavLink to="/shopinglist" className='element'><FaShoppingCart className="menuIcon" />Shoping Lists<div></div></NavLink>
              <NavLink to="/fridge" className='element'><FaRegSnowflake className="menuIcon" />Fridge<div></div></NavLink>
            </nav>
          </div>
          <div className="selectedOption">
            <Route path="/recepts" render={(props) => <Recepts {...props} upgradeRecepts={this.upgradeRecepts} products={this.state.products} recepts={this.state.recepts} />} />
            <Route path="/menu" render={(props) => <Menus {...props} upgradeMenus={this.upgradeMenus} recepts={this.state.recepts} menus={this.state.menus} />} />
            <Route path="/shopinglist" component={ShopingList} />
            <Route path="/fridge" component={Fridge} />
          </div>
          <div className="rightBorder"></div>
        </div>
      </Router >
    )
  }
}

export default App
// Nowa funkcjonalność: Wpisujesz jakie masz rzeczy w lodówce i program szuka jaką receptę możesz wykonać

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
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

    fetch(`http://localhost:3000/getfoods`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => this.setState({
        products: data
      }));

    fetch(`http://localhost:3000/getrecepts`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => this.setState({
        recepts: data
      }));

    fetch(`http://localhost:3000/getmenu`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => this.setState({
        menus: data
      }));
  };

  upgradeRecepts() {
    fetch(`http://localhost:3000/getrecepts`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => this.setState({
        recepts: data
      }));
  }

  upgradeMenus() {
    fetch(`http://localhost:3000/getmenu`, {
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
        <div className="allSite app">

          <h1 className="appTitle app__title">FOOD<FaAppleAlt />app</h1>
          <nav className="mainMenu app__main-menu">
            <NavLink to="/food-app-front-dev/recepts" className='element app__menu-element'><FaDrumstickBite className="menuIcon app__menu-icon" />Przepisy</NavLink>
            <NavLink to="/food-app-front-dev/menu" className='element app__menu-element'><FaReceipt className="menuIcon menuIcon app__menu-icon" />Jadłospisy</NavLink>
            <NavLink to="/food-app-front-dev/shopinglist" className='element app__menu-element'><FaShoppingCart className="menuIcon menuIcon app__menu-icon" />Zakupy</NavLink>
          </nav>

          <div className="selectedOption app__selected-option">
            <Switch>
              <Route path="/food-app-front-dev/recepts" render={(props) => <Recepts {...props} upgradeRecepts={this.upgradeRecepts.bind(this)} setShopingListActiveItem={this.setShopingListActiveItem.bind(this)} products={this.state.products} recepts={this.state.recepts} />} />
              <Route path="/food-app-front-dev/menu" render={(props) => <Menus {...props} upgradeMenus={this.upgradeMenus.bind(this)} setShopingListActiveItem={this.setShopingListActiveItem.bind(this)} recepts={this.state.recepts} menus={this.state.menus} />} />
              <Route path="/food-app-front-dev/shopinglist" render={(props) => <ShopingList {...props} upgradeMenus={this.upgradeMenus.bind(this)} item={this.state.shopingListActiveItem} />} />
              <Route path="/food-app-front-dev">Użyj munu do nawigacji</Route>
              <Route path="/">Użyj munu do nawigacji</Route>
            </Switch>
          </div>

        </div>
      </Router >
    )
  }
}

export default App
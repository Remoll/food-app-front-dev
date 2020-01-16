import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Link, Switch } from 'react-router-dom';
import { FaAppleAlt, FaDrumstickBite, FaReceipt, FaShoppingCart, } from "react-icons/fa";
import '../style/style.scss';
import Recepts from './Recepts';
import Menus from './Menus';
import ShopingList from './ShopingList';
import LoadingScreen from './LoadingScreen';

class App extends Component {
  state = {
    products: [],
    recepts: [],
    menus: [],
    shopingListActiveItem: "nie dodano danych",
    serverAdress: "https://foodapppp.herokuapp.com",
    dataLoaded: false
  }

  componentDidMount() {

    fetch(`${this.state.serverAdress}/getfoods`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => this.setState({
        products: data
      }));

    fetch(`${this.state.serverAdress}/getrecepts`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => this.setState({
        recepts: data
      }));

    fetch(`${this.state.serverAdress}/getmenu`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => this.setState({
        menus: data,
        dataLoaded: true
      }));
  };

  upgradeRecepts() {
    fetch(`${this.state.serverAdress}/getrecepts`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => this.setState({
        recepts: data
      }));
  }

  upgradeMenus() {
    fetch(`${this.state.serverAdress}/getmenu`, {
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
        {this.state.dataLoaded ?
          <div className="app">

            <h1 className="app__title">FOOD<FaAppleAlt />app</h1>
            <nav className="app__main-menu">
              <NavLink to="/food-app-front-dev/recepts" className='app__main-menu-element'><FaDrumstickBite className="app__main-menu-icon" />Przepisy</NavLink>
              <NavLink to="/food-app-front-dev/menu" className='app__main-menu-element'><FaReceipt className="app__main-menu-icon" />Jadłospisy</NavLink>
              <NavLink to="/food-app-front-dev/shopinglist" className='app__main-menu-element'><FaShoppingCart className="app__main-menu-icon" />Zakupy</NavLink>
            </nav>

            <Link to="/food-app-front-dev/"></Link>


            <div className="app__selected-option">
              <Switch>
                <Route path="/food-app-front-dev/recepts" render={(props) => <Recepts {...props} serverAdress={this.state.serverAdress} upgradeRecepts={this.upgradeRecepts.bind(this)} setShopingListActiveItem={this.setShopingListActiveItem.bind(this)} products={this.state.products} recepts={this.state.recepts} />} />
                <Route path="/food-app-front-dev/menu" render={(props) => <Menus {...props} serverAdress={this.state.serverAdress} upgradeMenus={this.upgradeMenus.bind(this)} setShopingListActiveItem={this.setShopingListActiveItem.bind(this)} recepts={this.state.recepts} menus={this.state.menus} />} />
                <Route path="/food-app-front-dev/shopinglist" render={(props) => <ShopingList {...props} upgradeMenus={this.upgradeMenus.bind(this)} item={this.state.shopingListActiveItem} />} />
                <Route path="/food-app-front-dev">Użyj menu do nawigacji</Route>
              </Switch>
            </div>

          </div> :
          <LoadingScreen />}
      </Router >
    )
  }
}

export default App
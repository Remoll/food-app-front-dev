// Nowa funkcjonalność: Wpisujesz jakie masz rzeczy w lodówce i program szuka jaką receptę możesz wykonać

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

    fetch(`https://git.heroku.com/foodapppp.git/getfoods`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => this.setState({
        products: data
      }));

    fetch(`https://git.heroku.com/foodapppp.git/getrecepts`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => this.setState({
        recepts: data
      }));

    fetch(`https://git.heroku.com/foodapppp.git/getmenu`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => this.setState({
        menus: data
      }));
  };

  upgradeRecepts() {
    fetch(`https://git.heroku.com/foodapppp.git/getrecepts`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => this.setState({
        recepts: data
      }));
  }

  upgradeMenus() {
    fetch(`https://git.heroku.com/foodapppp.git/getmenu`, {
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

          <h1 className="appTitle">FOOD<FaAppleAlt />app</h1>
          <nav className="mainMenu">
            <NavLink to="/food-app-front-dev/recepts" className='element'><FaDrumstickBite className="menuIcon" />Przepisy</NavLink>
            <NavLink to="/food-app-front-dev/menu" className='element'><FaReceipt className="menuIcon" />Jadłospisy</NavLink>
            <NavLink to="/food-app-front-dev/shopinglist" className='element'><FaShoppingCart className="menuIcon" />Zakupy</NavLink>
          </nav>

          <div className="selectedOption">
            <Route path="/food-app-front-dev/recepts" render={(props) => <Recepts {...props} upgradeRecepts={this.upgradeRecepts.bind(this)} setShopingListActiveItem={this.setShopingListActiveItem.bind(this)} products={this.state.products} recepts={this.state.recepts} />} />
            <Route path="/food-app-front-dev/menu" render={(props) => <Menus {...props} upgradeMenus={this.upgradeMenus.bind(this)} setShopingListActiveItem={this.setShopingListActiveItem.bind(this)} recepts={this.state.recepts} menus={this.state.menus} />} />
            <Route path="/food-app-front-dev/shopinglist" render={(props) => <ShopingList {...props} upgradeMenus={this.upgradeMenus.bind(this)} item={this.state.shopingListActiveItem} />} />
          </div>

        </div>
      </Router >
    )
  }
}

export default App
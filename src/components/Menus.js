import React, { Component } from 'react';
import Menu from './Menu';
import CreateMenu from './CreateMenu';
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';
import ShopingList from './ShopingList';
import { FaPlusCircle, FaArrowAltCircleLeft } from 'react-icons/fa';

class Menus extends Component {
    state = {
        searchMenu: "",
        showMenu: false,
        activeMenu: "",
        showReceptChangeClass: ""
    }
    handleCreateMenu = () => {
        this.setState({
            showMenu: true,
            activeMenu: -1,
            showReceptChangeClass: "rightSideElo"
        })
    }
    handleSearchMenu = (e) => {
        this.setState({
            searchMenu: e.target.value
        })
    }

    handleShowMenu = (e) => {
        this.setState({
            showMenu: true,
            activeMenu: (e.target.id - 1),
            showReceptChangeClass: "rightSideElo"
        })
    }

    handleHideRightSite = () => {
        this.setState({
            showReceptChangeClass: ""
        })
    }

    render() {
        const menus = this.props.menus.filter(menu => menu.name.toLowerCase().includes(this.state.searchMenu.toLowerCase()));
        return (
            <div className={`receptsMenu ${this.state.showReceptChangeClass} section`}>

                <div section__right-sidev className="leftSide section__left-side">
                    <button className="createReceptButton section__icon-button" onClick={this.handleCreateMenu}><FaPlusCircle /></button>
                    <div className="searchReceptSection section__search-section">
                        <form>
                            <label>Szukaj</label>
                            <input className="searchRecept section__search-inp" onChange={this.handleSearchMenu} value={this.state.searchMenu}></input>
                        </form>
                    </div>
                    <ul className="receptList section__list">
                        {menus.map(menu => (
                            <li className="receptListItem section__item" key={menu.id}>
                                <p className="receptListItemName section__item-name">{menu.name}, dni: {menu.days.length}</p>
                                <div className="listButtonSection section__item-btn-section">
                                    <Link to="/food-app-front-dev/shopinglist" className="receptListItemButton section__item-btn" onClick={() => this.props.setShopingListActiveItem(menu)} >Stwórz listę zakupów</Link>
                                    <button className="receptListItemButton section__item-btn" id={menu.id} onClick={this.handleShowMenu}>Pokaż</button>
                                </div>
                            </li>))}
                    </ul>
                </div>

                <div className="rightSide section__right-side">
                    {this.state.showMenu ?
                        (this.state.activeMenu === -1 ?
                            <CreateMenu handleHideRightSite={this.handleHideRightSite} upgradeMenus={this.props.upgradeMenus} menus={this.props.menus} recepts={this.props.recepts} />
                            : <Menu menu={this.props.menus[this.state.activeMenu]} />)
                        : <h2>Wybierz istniejący jadłospis lub stwórz nowy aby wyświetlić</h2>}
                    <button className="createReceptButton section__icon-button" onClick={this.handleHideRightSite}><FaArrowAltCircleLeft /></button>
                </div>

            </div>
        )
    }
}

export default Menus
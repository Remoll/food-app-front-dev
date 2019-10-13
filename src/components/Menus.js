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
            <div className={`receptsMenu ${this.state.showReceptChangeClass}`}>

                <div className="leftSide">
                    <button className="createReceptButton" onClick={this.handleCreateMenu}><FaPlusCircle /></button>
                    <div className="searchReceptSection">
                        <form>
                            <label>Szukaj</label>
                            <input className="searchRecept" onChange={this.handleSearchMenu} value={this.state.searchMenu}></input>
                        </form>
                    </div>
                    <ul className="receptList">
                        {menus.map(menu => (
                            <li className="receptListItem" key={menu.id}>
                                <p className="receptListItemName">{menu.name}, dni: {menu.days.length}</p>
                                <div className="listButtonSection">
                                    <Link to="/shopinglist" className="receptListItemButton" onClick={() => this.props.setShopingListActiveItem(menu)} >Stwórz listę zakupów</Link>
                                    <button className="receptListItemButton" id={menu.id} onClick={this.handleShowMenu}>Pokaż</button>
                                </div>
                            </li>))}
                    </ul>
                </div>

                <div className="rightSide">
                    {this.state.showMenu ? (this.state.activeMenu === -1 ? <CreateMenu handleHideRightSite={this.handleHideRightSite} upgradeMenus={this.props.upgradeMenus} menus={this.props.menus} recepts={this.props.recepts} /> : <Menu menu={this.props.menus[this.state.activeMenu]} />) : <h2>Wybierz istniejący jadłospis lub stwórz nowy aby wyświetlić</h2>}
                    <button className="createReceptButton" onClick={this.handleHideRightSite}><FaArrowAltCircleLeft /></button>
                </div>

            </div>
        )
    }
}

export default Menus
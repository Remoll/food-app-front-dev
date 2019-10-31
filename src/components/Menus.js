import React, { Component } from 'react';
import Menu from './Menu';
// import '../style/Section.scss';
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
            showReceptChangeClass: "section--create"
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
            showReceptChangeClass: "section--create"
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
            <div className={`section ${this.state.showReceptChangeClass}`}>

                <div className="section__left-side">
                    <button className="section__icon-button" onClick={this.handleCreateMenu}><FaPlusCircle /></button>
                    <div className="section__search-section">
                        <form className="section__search-section-form">
                            <label className="section__search-section-form-label">Szukaj</label>
                            <input className="section__search-section-form-inp" onChange={this.handleSearchMenu} value={this.state.searchMenu}></input>
                        </form>
                    </div>
                    <ul className="section__list">
                        {menus.map(menu => (
                            <li className="section__item" key={menu.id}>
                                <p className="section__item-name">{menu.name}, dni: {menu.days.length}</p>
                                <div className="section__item-btn-section">
                                    <Link to="/food-app-front-dev/shopinglist" className="section__item-btn" onClick={() => this.props.setShopingListActiveItem(menu)} >Stwórz listę zakupów</Link>
                                    <button className="section__item-btn" id={menu.id} onClick={this.handleShowMenu}>Pokaż</button>
                                </div>
                            </li>))}
                    </ul>
                </div>

                <div className="section__right-side">
                    {this.state.showMenu ?
                        (this.state.activeMenu === -1 ?
                            <CreateMenu handleHideRightSite={this.handleHideRightSite} upgradeMenus={this.props.upgradeMenus} menus={this.props.menus} recepts={this.props.recepts} />
                            : <Menu menu={this.props.menus[this.state.activeMenu]} />)
                        : <h2>Wybierz istniejący jadłospis lub stwórz nowy aby wyświetlić</h2>}
                    <button className="section__icon-button" onClick={this.handleHideRightSite}><FaArrowAltCircleLeft /></button>
                </div>

            </div>
        )
    }
}

export default Menus
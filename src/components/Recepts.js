import React, { Component } from 'react';
import Recept from './Recept';
import CreateRecept from './CreateRecept';
// import '../style/Section.scss';
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';
import ShopingList from './ShopingList';
import { FaPlusCircle, FaArrowAltCircleLeft } from 'react-icons/fa';

class Recepts extends Component {
    state = {
        searchRecept: "",
        mealTypeFilter: "",
        showRecept: false,
        activeRecept: "",
        showReceptChangeClass: ""
    }
    handleSearchRecept = (e) => {
        this.setState({
            searchRecept: e.target.value
        })
    }
    handleDishFilter = (e) => {
        this.setState({
            mealTypeFilter: e.target.value
        })
    }
    handleShowRecept = (e) => {
        this.setState({
            showRecept: true,
            activeRecept: (e.target.id - 1),
            showReceptChangeClass: "section--create"
        })
    }

    handleCreateRecept = () => {
        this.setState({
            showRecept: true,
            activeRecept: -1,
            showReceptChangeClass: "section--create"
        })
    }
    handleHideRightSite = () => {
        this.setState({
            showReceptChangeClass: ""
        })
    }
    render() {
        const recepts = this.props.recepts.filter(recept =>
            (recept.name.toLowerCase().includes(this.state.searchRecept.toLowerCase()) && recept.type.includes(this.state.mealTypeFilter)));
        return (
            <div className={`section ${this.state.showReceptChangeClass}`}>

                <div className="section__left-side">
                    <button className="section__icon-button" onClick={this.handleCreateRecept}><FaPlusCircle /></button>
                    <div className="section__search-section">
                        <form className="section__search-section-form">
                            <label className="section__search-section-form-label">Szukaj</label>
                            <input className="section__search-section-form-inp" onChange={this.handleSearchRecept} value={this.state.searchRecept}></input>
                        </form>
                        <form className="section__search-section-form" onChange={this.handleDishFilter}>
                            <label className="section__search-section-form-label">Rodzaj przepisu</label>
                            <select className="section__set-meal-type">
                                <option value=""></option>
                                <option value="breakfast">Śniadanie</option>
                                <option value="lunch">Drugie śniadanie</option>
                                <option value="diner">Obiad</option>
                                <option value="tea">Podwieczorek</option>
                                <option value="supper">Kolacja</option>
                            </select>
                        </form>
                    </div>
                    <ul className="section__list">
                        {recepts.map(recept => (
                            <li className="section__item" key={recept.id}>
                                <p className="section__item-name">{recept.name} kcal: {Math.floor(recept.kcal)}</p>
                                <div className="section__item-btn-section">
                                    <Link to="/food-app-front-dev/shopinglist" className="section__item-btn" onClick={() => this.props.setShopingListActiveItem(recept)} >Stwórz listę zakupów</Link>
                                    <button className="section__item-btn" id={recept.id} onClick={this.handleShowRecept}>Pokaż</button>
                                </div>
                            </li>))}
                    </ul>
                </div>

                <div className="section__right-side">
                    {this.state.showRecept ?
                        (this.state.activeRecept === -1 ?
                            <CreateRecept upgradeRecepts={this.props.upgradeRecepts} products={this.props.products} id={this.props.recepts.length} handleHideRightSite={this.handleHideRightSite.bind(this)} />
                            : <Recept recept={this.props.recepts[this.state.activeRecept]} />)
                        : <h2>Wybierz istniejący przepis lub stwórz nowy aby wyświetlić</h2>}
                    <button className="section__icon-button" onClick={this.handleHideRightSite}><FaArrowAltCircleLeft /></button>
                </div>

            </div >
        )
    }
}

export default Recepts
import React, { Component } from 'react';
import Recept from './Recept';
import CreateRecept from './CreateRecept';
import '../style/Recepts.css';
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';
import ShopingList from './ShopingList';

class Recepts extends Component {
    state = {
        searchRecept: "",
        mealTypeFilter: "",
        showRecept: false,
        activeRecept: "",
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
        })
    }
    handleCreateRecept = () => {
        this.setState({
            showRecept: true,
            activeRecept: -1
        })
    }
    render() {
        const recepts = this.props.recepts.filter(recept => (recept.name.toLowerCase().includes(this.state.searchRecept.toLowerCase()) && recept.type.includes(this.state.mealTypeFilter)));
        return (
            <div>
                <h2 className="selectedComponentName">Przepisy</h2>
                <div className="receptsMenu">
                    <div className="leftSide">
                        <button className="createReceptButton" onClick={this.handleCreateRecept}>dodaj nowy przepis</button>
                        <div className="searchReceptSection">
                            <form>
                                <label>Szukaj</label>
                                <input className="searchRecept" onChange={this.handleSearchRecept} value={this.state.searchRecept}></input>
                            </form>
                            <form onChange={this.handleDishFilter}>
                                <label>Rodzaj przepisu</label>
                                <select className="setMealType">
                                    <option value=""></option>
                                    <option value="breakfast">Śniadanie</option>
                                    <option value="lunch">Drugie śniadanie</option>
                                    <option value="diner">Obiad</option>
                                    <option value="tea">Podwieczorek</option>
                                    <option value="supper">Kolacja</option>
                                </select>
                            </form>
                        </div>
                        <ul className="receptList">
                            {recepts.map(recept => (
                                <li className="receptListItem" key={recept.id}>
                                    <p className="receptListItemName">{recept.name}</p>, kcal:{Math.round(Math.round(recept.kcal * Math.pow(10, 2 + 1)) / 10) / (Math.pow(10, 2 + 1) / 10)}
                                    <Link to="/shopinglist" className="receptListItemButton" onClick={() => this.props.setShopingListActiveItem(recept)} >Stwórz listę zakupów</Link>
                                    <button className="receptListItemButton" id={recept.id} onClick={this.handleShowRecept}>Pokaż</button>
                                </li>))}
                        </ul>
                    </div>
                    <div className="rightSide">
                        {this.state.showRecept ? (this.state.activeRecept === -1 ? <CreateRecept upgradeRecepts={this.props.upgradeRecepts} products={this.props.products} id={this.props.recepts.length} /> : <Recept recept={this.props.recepts[this.state.activeRecept]} />) : <h2>Wybierz istniejący przepis lub stwórz nowy aby wyświetlić</h2>}
                    </div>
                </div>
            </div>
        )
    }
}

export default Recepts
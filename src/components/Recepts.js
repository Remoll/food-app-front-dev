import React, { Component } from 'react';
import Recept from './Recept';
import CreateRecept from './CreateRecept';
import '../style/Recepts.css';

class Recepts extends Component {
    state = {
        searchRecept: "",
        mealTypeFilter: "",
        peopleNumber: 1,
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
    handleSetPeopleNumber = (e) => {
        if (e.target.value < 1) return
        this.setState({
            peopleNumber: e.target.value,
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
                <h2 className="selectedComponentName">Recepts</h2>
                <div className="receptsMenu">
                    <div className="leftSide">
                        <button className="createReceptButton" onClick={this.handleCreateRecept}>Create new recept</button>
                        <div className="searchReceptSection">
                            <form>
                                <label>Search</label>
                                <input className="searchRecept" onChange={this.handleSearchRecept} value={this.state.searchRecept}></input>
                            </form>
                            <form onChange={this.handleDishFilter}>
                                <label>Meal type</label>
                                <select className="setMealType">
                                    <option value=""></option>
                                    <option value="breakfast">Breakfast</option>
                                    <option value="lunch">Lunch</option>
                                    <option value="diner">Diner</option>
                                    <option value="tea">Tea</option>
                                    <option value="supper">Supper</option>
                                </select>
                            </form>
                            <form>
                                <label>People number</label>
                                <input className="setPeopleNumber" onChange={this.handleSetPeopleNumber} type="number" value={this.state.peopleNumber}></input>
                            </form>
                        </div>
                        <ul className="receptList">
                            {recepts.map(recept => <li className="receptListItem" key={recept.id}><p className="receptListItemName">{recept.name}</p>, kcal:{recept.kcal} <button className="receptListItemButton" id={recept.id} onClick={this.handleShowRecept}>Show</button></li>)}
                        </ul>
                    </div>
                    <div className="rightSide">
                        {this.state.showRecept ? (this.state.activeRecept === -1 ? <CreateRecept products={this.props.products} id={this.props.recepts.length} /> : <Recept recept={this.props.recepts[this.state.activeRecept]} peopleNumber={this.state.peopleNumber} />) : <h2>
                            Choose recipe or create a new one to display</h2>}
                    </div>
                </div>
            </div>
        )
    }
}

export default Recepts
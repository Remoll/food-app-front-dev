import React, { Component } from 'react';
// import '../style/Menu.scss';
import { FaTimesCircle } from 'react-icons/fa';

class Menu extends Component {
    state = {
        showRecept: false,
        showReceptName: "",
        showReceptComponents: "",
        showReceptRecepts: "",
        showReceptKcal: ""
    }

    handleShowRecept = (name, components, recepts, kcal) => {
        if (this.state.showRecept && name === this.state.showReceptName) {
            this.setState({
                showRecept: false,
            })
        } else {

            this.setState({
                showRecept: true,
                showReceptName: name,
                showReceptComponents: components,
                showReceptRecepts: recepts,
                showReceptKcal: kcal
            })
        }
    }

    handleExitRecept = () => {
        this.setState({
            showRecept: false,
            showReceptName: "",
            showReceptComponents: "",
            showReceptRecepts: ""
        })
    }
    render() {
        return (
            <div className={`menu ${this.state.showRecept ? 'menu--show-recipe' : ''}`}>
                <h2 className="menu__name">{this.props.menu.name}</h2>
                <div className="menu__days">
                    {this.props.menu.days.map((day, index) => (
                        <div className="menu__days-item">
                            <h2 className="menu__days-item-nr">Dzień {index + 1} </h2>
                            <h3>{Math.floor((day.breakfast.kcal + day.lunch.kcal + day.diner.kcal + day.tea.kcal + day.supper.kcal))} kcal</h3>
                            <ul className="menu__days-item-list">
                                <li className="menu__days-item-list-item" key={index + "1"}>
                                    <p className="menu__days-item-list-item-meal">Śniadanie</p>
                                    <p className="menu__days-item-list-item-name">{day.breakfast.name}</p>
                                    <p className="menu__days-item-list-item-kcal">kcal: {Math.floor(day.breakfast.kcal)}</p>
                                    <button className="menu__days-item-list-item-btn" onClick={() => this.handleShowRecept(day.breakfast.name, day.breakfast.components, day.breakfast.recept, day.breakfast.kcal)}>Szczegóły</button>
                                </li>
                                <li className="menu__days-item-list-item" key={index + "2"}>
                                    <p className="menu__days-item-list-item-meal">Drugie śniadanie</p>
                                    <p className="menu__days-item-list-item-name">{day.lunch.name}</p>
                                    <p className="menu__days-item-list-item-kcal">kcal: {Math.floor(day.lunch.kcal)}</p>
                                    <button className="menu__days-item-list-item-btn" onClick={() => this.handleShowRecept(day.lunch.name, day.lunch.components, day.lunch.recept, day.lunch.kcal)}>Szczegóły</button>
                                </li>
                                <li className="menu__days-item-list-item" key={index + "3"}>
                                    <p className="menu__days-item-list-item-meal">Obiad</p>
                                    <p className="menu__days-item-list-item-name">{day.diner.name}</p>
                                    <p className="menu__days-item-list-item-kcal">kcal: {Math.floor(day.diner.kcal)}</p>
                                    <button className="menu__days-item-list-item-btn" onClick={() => this.handleShowRecept(day.diner.name, day.diner.components, day.diner.recept, day.diner.kcal)}>Szczegóły</button>
                                </li>
                                <li className="menu__days-item-list-item" key={index + "4"}>
                                    <p className="menu__days-item-list-item-meal">Podwieczorek</p>
                                    <p className="menu__days-item-list-item-name">{day.tea.name}</p>
                                    <p className="menu__days-item-list-item-kcal">kcal: {Math.floor(day.tea.kcal)}</p>
                                    <button className="menu__days-item-list-item-btn" onClick={() => this.handleShowRecept(day.tea.name, day.tea.components, day.tea.recept, day.tea.kcal)}>Szczegóły</button>
                                </li>
                                <li className="menu__days-item-list-item" key={index + "5"}>
                                    <p className="menu__days-item-list-item-meal">Kolacja</p>
                                    <p className="menu__days-item-list-item-name">{day.supper.name}</p>
                                    <p className="menu__days-item-list-item-kcal">kcal: {Math.floor(day.supper.kcal)}</p>
                                    <button className="menu__days-item-list-item-btn" onClick={() => this.handleShowRecept(day.supper.name, day.supper.components, day.supper.recept, day.supper.kcal)}>Szczegóły</button>
                                </li>
                            </ul>
                        </div>))}
                </div>

                {this.state.showRecept ?
                    <div className="menu__recipe-section">
                        <div className="recipe">
                            <button className="section__icon-button" onClick={this.handleExitRecept}><FaTimesCircle /></button>
                            <h1 className="recipe__name">{this.state.showReceptName}</h1>
                            <h2 className="recipe__kcal">Kcal: {Math.floor(this.state.showReceptKcal)}</h2>
                            <div className="recipe__components">
                                <h2 className="recipe__components-title">Składniki:</h2>
                                <ul className="recipe__components-list">{(this.state.showRecept ? this.state.showReceptComponents.map(component =>
                                    <li className="recipe__components-item" key={component.name}>{component.name} x{component.number} {component.measure}</li>) : null)}
                                </ul>
                            </div>
                            <div className="recipe__recipe">
                                <h2 className="recipe__recipe-name">Przepis:</h2>
                                <p className="recipe__recipe-recipe">{this.state.showReceptRecepts}</p>
                            </div>
                        </div>
                    </div> : null}

            </div>
        )
    }
}

export default Menu
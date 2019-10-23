import React, { Component } from 'react';
import '../style/Menu.css';
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
                showRecept: false
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
            <div className="menuFile">
                <h2 className="nameInMenuFile">{this.props.menu.name}</h2>
                <div className="daysInMenuFile">
                    {this.props.menu.days.map((day, index) => (
                        <div className="dayInMenuFile">
                            <h2 className="daysNumbersInMenuFile">Dzień {index + 1} </h2>
                            <h3>{Math.floor((day.breakfast.kcal + day.lunch.kcal + day.diner.kcal + day.tea.kcal + day.supper.kcal))} kcal</h3>
                            <ul className="daysMealsInMenuFile">
                                <li key={index + "1"}>
                                    <p>Śniadanie</p>
                                    <p>{day.breakfast.name}</p>
                                    <p>kcal: {Math.floor(day.breakfast.kcal)}</p>
                                    <button onClick={() => this.handleShowRecept(day.breakfast.name, day.breakfast.components, day.breakfast.recept, day.breakfast.kcal)}>Szczegóły</button>
                                </li>
                                <li key={index + "2"}>
                                    <p>Drugie śniadanie</p>
                                    <p>{day.lunch.name}</p>
                                    <p>kcal: {Math.floor(day.lunch.kcal)}</p>
                                    <button onClick={() => this.handleShowRecept(day.lunch.name, day.lunch.components, day.lunch.recept, day.lunch.kcal)}>Szczegóły</button>
                                </li>
                                <li key={index + "3"}>
                                    <p>Obiad</p>
                                    <p>{day.diner.name}</p>
                                    <p>kcal: {Math.floor(day.diner.kcal)}</p>
                                    <button onClick={() => this.handleShowRecept(day.diner.name, day.diner.components, day.diner.recept, day.diner.kcal)}>Szczegóły</button>
                                </li>
                                <li key={index + "4"}>
                                    <p>Podwieczorek</p>
                                    <p>{day.tea.name}</p>
                                    <p>kcal: {Math.floor(day.tea.kcal)}</p>
                                    <button onClick={() => this.handleShowRecept(day.tea.name, day.tea.components, day.tea.recept, day.tea.kcal)}>Szczegóły</button>
                                </li>
                                <li key={index + "5"}>
                                    <p>Kolacja</p>
                                    <p>{day.supper.name}</p>
                                    <p>kcal: {Math.floor(day.supper.kcal)}</p>
                                    <button onClick={() => this.handleShowRecept(day.supper.name, day.supper.components, day.supper.recept, day.supper.kcal)}>Szczegóły</button>
                                </li>
                            </ul>
                        </div>))}
                </div>

                {this.state.showRecept ?
                    <div className="showReceptInMenuList">
                        <button className="hideReceptInMenuListButton" onClick={this.handleExitRecept}><FaTimesCircle /></button>
                        <h1 className="receptNameInMenuFile">{this.state.showReceptName}</h1>
                        <h2 className="receptKcalInMenuFile">Kcal: {Math.floor(this.state.showReceptKcal)}</h2>
                        <div className="receptComponentsInMenuFile">
                            <h2>Składniki:</h2>
                            <ul>{(this.state.showRecept ? this.state.showReceptComponents.map(component =>
                                <li key={component.name}>{component.name} x{component.number} {component.measure}</li>) : null)}
                            </ul>
                        </div>
                        <div className="receptReceptInMenuFile">
                            <h2>Przepis:</h2>
                            <p>{this.state.showReceptRecepts}</p>
                        </div>
                    </div> : null}

            </div>
        )
    }
}

export default Menu
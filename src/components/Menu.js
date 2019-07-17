import React, { Component } from 'react';
import '../style/Menu.css'

class Menu extends Component {
    state = {
        showRecept: false,
        showReceptName: "",
        showReceptComponents: "",
        showReceptRecepts: ""
    }

    handleShowRecept = (name, components, recepts) => {
        if (this.state.showRecept && name === this.state.showReceptName) {
            this.setState({
                showRecept: false
            })
        } else {

            this.setState({
                showRecept: true,
                showReceptName: name,
                showReceptComponents: components,
                showReceptRecepts: recepts
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
            <div>
                <h2>{this.props.menu.name}</h2>
                <div>
                    {this.props.menu.days.map((day, index) => (
                        <div>
                            <h3>Day {index + 1} kcal: {day.kcal}</h3>
                            <ul>
                                <li key={index + "1"}>{day.breakfast.name} kcal: {day.breakfast.kcal}<button onClick={() => this.handleShowRecept(day.breakfast.name, day.breakfast.components, day.breakfast.recepts)}>Show</button></li>
                                <li key={index + "2"}>{day.lunch.name} kcal: {day.lunch.kcal}<button onClick={() => this.handleShowRecept(day.lunch.name, day.lunch.components, day.lunch.recepts)}>Show</button></li>
                                <li key={index + "3"}>{day.diner.name} kcal: {day.diner.kcal}<button onClick={() => this.handleShowRecept(day.diner.name, day.diner.components, day.diner.recepts)}>Show</button></li>
                                <li key={index + "4"}>{day.tea.name} kcal: {day.tea.kcal}<button onClick={() => this.handleShowRecept(day.tea.name, day.tea.components, day.tea.recepts)}>Show</button></li>
                                <li key={index + "5"}>{day.supper.name} kcal: {day.supper.kcal}<button onClick={() => this.handleShowRecept(day.supper.name, day.supper.components, day.supper.recepts)}>Show</button></li>
                            </ul>
                        </div>))}
                </div>
                {this.state.showRecept ?
                    <div className="showReceptInMenuList">
                        <button onClick={this.handleExitRecept}>X</button>
                        <h1>{this.state.showReceptName}</h1>
                        <div><h2>Components:</h2><ul>{(this.state.showRecept ? this.state.showReceptComponents.map(component => <li key={component.name}>{component.name} x{component.number} {component.measure}</li>) : null)}</ul></div>
                        <div><h2>Recept:</h2><p>{this.state.showReceptRecepts}</p></div>
                    </div> : null}
            </div>
        )
    }
}

export default Menu
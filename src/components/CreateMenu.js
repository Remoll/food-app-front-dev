import React, { Component } from 'react';
import '../style/CreateMenu.css';

class CreateMenu extends Component {
    state = {
        name: "new menu",
        days: 1,
        kcal: 2000,
        breakfast: true,
        lunch: true,
        diner: true,
        tea: true,
        supper: true,
        newMenu: "",
        editMeal: false,
        editMealIndex: "",
        editMealType: "",
        editMealItem: "",
        editMealInput: "",
        editMealButton: false,
    }
    handleMenuName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    handleDeaysNumber = (e) => {
        if (e.target.value < 1) return
        this.setState({
            days: e.target.value
        })
    }
    handleKcalNumber = (e) => {
        this.setState({
            kcal: e.target.value
        })
    }
    handleMealsTypes = (e) => {
        if (e.target.id === "breakfast") {
            this.setState({
                breakfast: e.target.checked
            })
        } else if (e.target.id === "lunch") {
            this.setState({
                lunch: e.target.checked
            })
        } else if (e.target.id === "diner") {
            this.setState({
                diner: e.target.checked
            })
        } else if (e.target.id === "tea") {
            this.setState({
                tea: e.target.checked
            })
        } else if (e.target.id === "supper") {
            this.setState({
                supper: e.target.checked
            })
        }
    }
    handleCreateNewMenuButton = (e) => {
        e.preventDefault();
        const newMenu = {
            id: this.props.menus.length + 1,
            name: this.state.name,
            days: []
        }
        for (let i = 0; i < this.state.days; i++) { //dla każdego dnia filtruje przepisy które: a) są odpowiednim typem posiłku; b) mieszczącą się w przedziale kalorycznym; a następnie losuje jeden przepis z puli dla każdego dnia

            const invalidMeal = { id: -1, name: "no such meal", kcal: 0, components: [{ name: "no components", number: -1, measure: "-" }], type: "breakfast lunch diner tea supper" }

            const breakfasts = this.props.recepts.filter(item => item.type.includes("breakfast") && item.kcal > this.state.kcal * .25 && item.kcal < this.state.kcal * .35);
            const lunchs = this.props.recepts.filter(item => item.type.includes("lunch") && item.kcal > this.state.kcal * .1 && item.kcal < this.state.kcal * .2);
            const diners = this.props.recepts.filter(item => item.type.includes("diner") && item.kcal > this.state.kcal * .25 && item.kcal < this.state.kcal * .35);
            const teas = this.props.recepts.filter(item => item.type.includes("tea") && item.kcal > this.state.kcal * .05 && item.kcal < this.state.kcal * .15);
            const suppers = this.props.recepts.filter(item => item.type.includes("supper") && item.kcal > this.state.kcal * .15 && item.kcal < this.state.kcal * .25);

            const breakfast = breakfasts.length === 0 ? invalidMeal : breakfasts[Math.floor(Math.random() * breakfasts.length)]//JAK SPRAWDZIĆ CZY WYSZUKAŁO PRZAWIDŁOWY PRZEPIS? jak length === 0 to nie wyszykało
            const lunch = breakfasts.length === 0 ? invalidMeal : lunchs[Math.floor(Math.random() * lunchs.length)]
            const diner = breakfasts.length === 0 ? invalidMeal : diners[Math.floor(Math.random() * diners.length)]
            const tea = breakfasts.length === 0 ? invalidMeal : teas[Math.floor(Math.random() * teas.length)]
            const supper = breakfasts.length === 0 ? invalidMeal : suppers[Math.floor(Math.random() * suppers.length)]

            const kcal = (breakfast.kcal + lunch.kcal + diner.kcal + tea.kcal + supper.kcal);
            const day = {
                breakfast,
                lunch,
                diner,
                tea,
                supper,
                kcal
            };
            newMenu.days.push(day)
        }
        this.setState({
            newMenu
        })
    }
    handleEditMealShow = (index, type) => {
        let item;
        if (type === "breakfast") {
            item = this.state.newMenu.days[index].breakfast.name
        } else if (type === "lunch") {
            item = this.state.newMenu.days[index].lunch.name
        } else if (type === "diner") {
            item = this.state.newMenu.days[index].diner.name
        } else if (type === "tea") {
            item = this.state.newMenu.days[index].tea.name
        } else if (type === "supper") {
            item = this.state.newMenu.days[index].supper.name
        }
        this.setState({
            editMeal: true,
            editMealIndex: index,
            editMealType: type,
            editMealItem: item
        })
    }
    handleEditMealInputChange = (e) => {
        this.setState({
            editMealInput: e.target.value,
            editMealButton: true
        })
    }
    handleEditMealSelectButton = (e) => {
        this.setState({
            editMealInput: e.target.value,
            editMealButton: false
        })
    }
    handleEditMealConfirmButton = () => {
        const type = this.state.editMealType;
        const newMenu = this.state.newMenu;
        const mealName = this.props.recepts.filter(recept => recept.name === this.state.editMealInput)
        if (mealName.length === 0) {
            alert("Choose the right recipe");
            return;
        }
        if (type === "breakfast") {
            newMenu.days[this.state.editMealIndex].breakfast = mealName[0];
        } else if (type === "lunch") {
            newMenu.days[this.state.editMealIndex].lunch = mealName[0];
        } else if (type === "diner") {
            newMenu.days[this.state.editMealIndex].diner = mealName[0];
        } else if (type === "tea") {
            newMenu.days[this.state.editMealIndex].tea = mealName[0];
        } else if (type === "supper") {
            newMenu.days[this.state.editMealIndex].supper = mealName[0];
        }
        this.setState({
            newMenu,
            editMeal: false,
            editMealInput: ""

        })
    }
    handleEditMealCancelButton = () => {
        this.setState({
            editMeal: false
        })
    }
    handleConfirmMenu = () => {
        fetch('http://localhost:5000/addmenu', {
            method: 'POST',
            body: JSON.stringify(this.state.newMenu),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        this.setState({
            newMenu: ""
        })
    }

    render() {
        const { newMenu } = this.state;
        const inputSearch = this.props.recepts.filter(recept => recept.name.toLowerCase().includes(this.state.editMealInput.toLowerCase()));
        return (
            <div>
                <div>
                    <h1>CreateMenu</h1>
                    <form>
                        <label htmlFor="name"><input onChange={this.handleMenuName} value={this.state.name} type="text" id="name"></input>Name</label>
                        <label htmlFor="days"><input onChange={this.handleDeaysNumber} value={this.state.days} type="number" id="days"></input>Days</label>
                        <label htmlFor="kcal"><input onChange={this.handleKcalNumber} value={this.state.kcal} type="number" id="kcal"></input>Kcal per day</label>
                        <label htmlFor="breakfast">
                            <input onChange={this.handleMealsTypes} checked={this.state.breakfast} type="checkbox" id="breakfast" />Breakfast</label>
                        <label htmlFor="lunch">
                            <input onChange={this.handleMealsTypes} checked={this.state.lunch} type="checkbox" id="lunch" />Lunch</label>
                        <label htmlFor="diner">
                            <input onChange={this.handleMealsTypes} checked={this.state.diner} type="checkbox" id="diner" />Diner</label>
                        <label htmlFor="tea">
                            <input onChange={this.handleMealsTypes} checked={this.state.tea} type="checkbox" id="tea" />Tea</label>
                        <label htmlFor="supper">
                            <input onChange={this.handleMealsTypes} checked={this.state.supper} type="checkbox" id="supper" />Supper</label>
                        <button onClick={this.handleCreateNewMenuButton}>Create menu</button>
                    </form>
                </div>
                {
                    newMenu ?
                        <div>{this.state.editMeal ?
                            <div className="changeReceptOnNewMenu">
                                <p>Change: {this.state.editMealItem} to:</p>
                                <input value={this.state.editMealInput} onChange={this.handleEditMealInputChange}></input>
                                <div>{this.state.editMealButton && this.state.editMealInput.length > 2 ? <ul>{inputSearch.map((recept, index) => <li key={index}><button onClick={this.handleEditMealSelectButton} value={recept.name}>{recept.name}</button></li>)}</ul> : null}</div>
                                <button onClick={this.handleEditMealConfirmButton}>Confirm change</button><button onClick={this.handleEditMealCancelButton}>Cancel</button>

                            </div> : null}
                            <button onClick={this.handleConfirmMenu}>Confirm Menu</button>
                            <h2>{newMenu.name}</h2>
                            <div>
                                {newMenu.days.map((day, index) => (
                                    <div>
                                        <h3>Day {index + 1} kcal: {day.breakfast.kcal + day.lunch.kcal + day.diner.kcal + day.tea.kcal + day.supper.kcal}</h3>
                                        <ul>
                                            <li key={index + "1"}>Breakfast: {day.breakfast.name} kcal: {day.breakfast.kcal}<button onClick={() => this.handleEditMealShow(index, "breakfast")}>edit</button></li>
                                            <li key={index + "2"}>Lunch: {day.lunch.name} kcal: {day.lunch.kcal}<button onClick={() => this.handleEditMealShow(index, "lunch")}>edit</button></li>
                                            <li key={index + "3"}>Diner: {day.diner.name} kcal: {day.diner.kcal}<button onClick={() => this.handleEditMealShow(index, "diner")}>edit</button></li>
                                            <li key={index + "4"}>Tea: {day.tea.name} kcal: {day.tea.kcal}<button onClick={() => this.handleEditMealShow(index, "tea")}>edit</button></li>
                                            <li key={index + "5"}>Supper: {day.supper.name} kcal: {day.supper.kcal}<button onClick={() => this.handleEditMealShow(index, "supper")}>edit</button></li>
                                        </ul>
                                    </div>))}
                            </div>
                        </div> : null
                }

            </div >
        )
    }
}

export default CreateMenu
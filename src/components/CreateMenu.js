/* eslint-disable no-loop-func */
import React, { Component } from 'react';
import '../style/CreateMenu.scss';
import { FaTimesCircle } from 'react-icons/fa';

class CreateMenu extends Component {
    state = {
        name: "",
        days: "",
        kcal: "",
        // breakfast: true,
        // lunch: true,
        // diner: true,
        // tea: true,
        // supper: true,
        newMenu: "",
        editMeal: false,
        editMealIndex: "",
        editMealType: "",
        editMealItem: "",
        editMealInput: "",
        editMealButton: false,
        showRecept: false,
        showReceptName: "",
        showReceptComponents: "",
        showReceptRecepts: "",
        showReceptKcal: "",
        hideMenuGener: ""
    }
    handleMenuName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    handleDeaysNumber = (e) => {
        if (e.target.value < 0) return
        this.setState({
            days: e.target.value
        })
    }
    handleKcalNumber = (e) => {
        this.setState({
            kcal: e.target.value
        })
    }
    // handleMealsTypes = (e) => {
    //     if (e.target.id === "breakfast") {
    //         this.setState({
    //             breakfast: e.target.checked
    //         })
    //     } else if (e.target.id === "lunch") {
    //         this.setState({
    //             lunch: e.target.checked
    //         })
    //     } else if (e.target.id === "diner") {
    //         this.setState({
    //             diner: e.target.checked
    //         })
    //     } else if (e.target.id === "tea") {
    //         this.setState({
    //             tea: e.target.checked
    //         })
    //     } else if (e.target.id === "supper") {
    //         this.setState({
    //             supper: e.target.checked
    //         })
    //     }
    // }

    handleCreateNewMenuButton = (e) => {
        e.preventDefault();

        const { menus, recepts } = this.props
        const { name, days, kcal } = this.state

        if (name === "") {
            alert("Nie podałeś nazwy jadłospisu")
            return
        }
        if (days === "") {
            alert("Nie podałeś ilości dni")
            return
        }
        if (kcal === "") {
            alert("Nie podałeś dziennej kaloryczności")
            return
        }
        const newMenu = {
            id: menus.length + 1,
            name: name,
            days: []
        }
        for (let i = 0; i < days; i++) {

            const invalidMeal = {
                id: -1,
                name: "nie można dobrać posiłku do podanej kaloryczności",
                kcal: 0,
                components: [{
                    name: "no components",
                    number: -1, measure: "-"
                }],
                type: "breakfast lunch diner tea supper"
            }

            let breakfastCounter = .5
            let lunchCounter = .5
            let dinerCounter = .5
            let teaCounter = .5
            let supperCounter = .5

            let breakfasts = []
            let lunchs = []
            let diners = []
            let teas = []
            let suppers = []

            if (breakfasts.length === 0) {
                let kcal = this.state.kcal
                do {
                    breakfasts = recepts.filter(item =>
                        item.type.includes("breakfast")
                        && item.kcal > kcal * .28
                        && item.kcal < kcal * .32)
                    kcal /= 2
                    breakfastCounter *= 2
                } while (breakfasts.length === 0 && breakfastCounter < 100)
            }
            if (breakfasts.length === 0) {
                breakfastCounter = 2
                let kcal = this.state.kcal
                do {
                    breakfasts = recepts.filter(item =>
                        item.type.includes("breakfast")
                        && item.kcal > kcal * .28
                        && item.kcal < kcal * .32)
                    kcal *= 2
                    breakfastCounter /= 2
                } while (breakfasts.length === 0 && breakfastCounter > 0.06)
            }

            if (lunchs.length === 0) {
                let kcal = this.state.kcal
                do {
                    lunchs = recepts.filter(item =>
                        item.type.includes("lunch")
                        && item.kcal > kcal * .13
                        && item.kcal < kcal * .17)
                    kcal /= 2
                    lunchCounter *= 2
                } while (lunchs.length === 0 && lunchCounter < 100)
            }
            if (lunchs.length === 0) {
                lunchCounter = 2
                let kcal = this.state.kcal
                do {
                    lunchs = recepts.filter(item =>
                        item.type.includes("lunch")
                        && item.kcal > kcal * .13
                        && item.kcal < kcal * .17)
                    kcal *= 2
                    lunchCounter /= 2
                } while (lunchs.length === 0 && lunchCounter > 0.06)
            }

            if (diners.length === 0) {
                let kcal = this.state.kcal
                do {
                    diners = recepts.filter(item =>
                        item.type.includes("diner")
                        && item.kcal > kcal * .28
                        && item.kcal < kcal * .32)
                    kcal /= 2
                    dinerCounter *= 2
                } while (diners.length === 0 && dinerCounter < 100)
            }
            if (diners.length === 0) {
                dinerCounter = 2
                let kcal = this.state.kcal
                do {
                    diners = recepts.filter(item =>
                        item.type.includes("diner")
                        && item.kcal > kcal * .28
                        && item.kcal < kcal * .32)
                    kcal *= 2
                    dinerCounter /= 2
                } while (diners.length === 0 && dinerCounter > 0.06)
            }

            if (teas.length === 0) {
                let kcal = this.state.kcal
                do {
                    teas = recepts.filter(item =>
                        item.type.includes("tea")
                        && item.kcal > kcal * .08
                        && item.kcal < kcal * .12)
                    kcal /= 2
                    teaCounter *= 2
                } while (teas.length === 0 && teaCounter < 100)
            }
            if (teas.length === 0) {
                teaCounter = 2
                let kcal = this.state.kcal
                do {
                    teas = recepts.filter(item =>
                        item.type.includes("tea")
                        && item.kcal > kcal * .08
                        && item.kcal < kcal * .12)
                    kcal *= 2
                    teaCounter /= 2
                } while (teas.length === 0 && teaCounter > 0.06)
            }

            if (suppers.length === 0) {
                let kcal = this.state.kcal
                do {
                    suppers = recepts.filter(item =>
                        item.type.includes("supper")
                        && item.kcal > kcal * .18
                        && item.kcal < kcal * .22)
                    kcal /= 2
                    supperCounter *= 2
                } while (suppers.length === 0 && supperCounter < 100)
            }
            if (suppers.length === 0) {
                supperCounter = 2
                let kcal = this.state.kcal
                do {
                    suppers = recepts.filter(item =>
                        item.type.includes("supper")
                        && item.kcal > kcal * .18
                        && item.kcal < kcal * .22)
                    kcal /= 2
                    supperCounter *= 2
                } while (suppers.length === 0 && supperCounter > 0.06)
            }

            const breakfast = breakfasts.length === 0 ?
                invalidMeal
                : breakfasts[Math.floor(Math.random() * breakfasts.length)]

            const lunch = lunchs.length === 0 ?
                invalidMeal
                : lunchs[Math.floor(Math.random() * lunchs.length)]

            const diner = diners.length === 0 ?
                invalidMeal
                : diners[Math.floor(Math.random() * diners.length)]

            const tea = teas.length === 0 ?
                invalidMeal
                : teas[Math.floor(Math.random() * teas.length)]

            const supper = suppers.length === 0 ?
                invalidMeal
                : suppers[Math.floor(Math.random() * suppers.length)]

            breakfast.kcal *= breakfastCounter
            breakfast.components.forEach(component => component.number *= breakfastCounter)

            lunch.kcal *= lunchCounter
            lunch.components.forEach(component => component.number *= lunchCounter)

            diner.kcal *= dinerCounter
            diner.components.forEach(component => component.number *= dinerCounter)

            tea.kcal *= teaCounter
            tea.components.forEach(component => component.number *= teaCounter)

            supper.kcal *= supperCounter
            supper.components.forEach(component => component.number *= supperCounter)

            const dayKcal = (breakfast.kcal + lunch.kcal + diner.kcal + tea.kcal + supper.kcal);

            const day = {
                breakfast,
                lunch,
                diner,
                tea,
                supper,
                dayKcal
            }

            newMenu.days.push(day)
        }
        this.setState({
            newMenu,
            hideMenuGener: "hide"
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

    handleEditMealConfirmButton = (e) => {
        e.preventDefault();
        const type = this.state.editMealType;
        const newMenu = this.state.newMenu;
        const mealName = this.props.recepts.filter(recept => recept.name === e.target.value)
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
        fetch('http://localhost:3000/addmenu', {
            method: 'POST',
            body: JSON.stringify(this.state.newMenu),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(this.props.upgradeMenus)
            .then(this.props.handleHideRightSite);
        this.setState({
            newMenu: "",
            name: "",
            days: "",
            kcal: "",
            hideMenuGener: ""
        })
    }

    handleShowRecept = (name, components, recepts, kcal) => {
        if (this.state.showRecept && name === this.state.showReceptName) {
            this.setState({
                showRecept: false,
                showReceptName: "",
                showReceptComponents: "",
                showReceptRecepts: "",
                showReceptKcal: ""
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
        const { newMenu } = this.state;
        const inputSearch = this.props.recepts.filter(recept => recept.name.toLowerCase().includes(this.state.editMealInput.toLowerCase()));
        return (
            <div className="createMenuFile create-menu">

                <div className={this.state.hideMenuGener}>
                    <p>Nazwij swój nowy jadłospis, określ ilośc dni i dzienną kaloryczność. Następnie kliknij 'Generuj jadłospis'</p>
                    <form className="menuGener create-menu__form">
                        <label htmlFor="name"><input onChange={this.handleMenuName} value={this.state.name} type="text" id="name" placeholder="nazwa"></input></label>
                        <label htmlFor="days"><input onChange={this.handleDeaysNumber} value={this.state.days} type="number" id="days" placeholder="dni"></input></label>
                        <label htmlFor="kcal"><input onChange={this.handleKcalNumber} value={this.state.kcal} type="number" id="kcal" placeholder="kcal"></input></label>

                        {/* <label htmlFor="breakfast">
                            <input onChange={this.handleMealsTypes} checked={this.state.breakfast} type="checkbox" id="breakfast" />Breakfast</label>
                        <label htmlFor="lunch">
                            <input onChange={this.handleMealsTypes} checked={this.state.lunch} type="checkbox" id="lunch" />Lunch</label>
                        <label htmlFor="diner">
                            <input onChange={this.handleMealsTypes} checked={this.state.diner} type="checkbox" id="diner" />Diner</label>
                        <label htmlFor="tea">
                            <input onChange={this.handleMealsTypes} checked={this.state.tea} type="checkbox" id="tea" />Tea</label>
                        <label htmlFor="supper">
                            <input onChange={this.handleMealsTypes} checked={this.state.supper} type="checkbox" id="supper" />Supper</label> */}

                        <button onClick={this.handleCreateNewMenuButton}>Generuj jadłospis</button>
                    </form>
                </div>

                {
                    newMenu ?
                        <div className="generatedMenu create-menu__generated-menu">{this.state.editMeal ?

                            <div className="changeReceptOnNewMenu create-menu__change-recipe">
                                <button className="section__icon-button" onClick={this.handleEditMealCancelButton}><FaTimesCircle /></button>
                                <p>Zamień: <span>{this.state.editMealItem}</span>, na:</p>
                                <input value={this.state.editMealInput} onChange={this.handleEditMealInputChange} placeholder="szukaj"></input>
                                <div className="ListOfChangeReceptInNewMenu  create-menu__change-recipe-list">{
                                    <ul className="section__list">{inputSearch.map((recept, index) =>
                                        <li className="section__item" key={index}>
                                            <p className="section__item-name">{recept.name} kcal: {Math.floor(recept.kcal)}</p>
                                            <div className="section__item-btn-section">
                                                <button className="section__item-btn" onClick={this.handleEditMealConfirmButton} value={recept.name}>Wybierz</button>
                                                <button className="section__item-btn" onClick={() => this.handleShowRecept(recept.name, recept.components, recept.recept, recept.kcal)}>Szczegóły</button>
                                            </div>
                                        </li>)}
                                    </ul>}
                                </div>
                            </div> : null}

                            <button className="createMenuConfirmButton confirm-btn" onClick={this.handleConfirmMenu}>GOTOWE - DODAJ JADŁOSPIS</button>
                            <h2 className="createMenuName create-menu__name">{newMenu.name}</h2>

                            <div className="createMenuDays create-menu__days-list">
                                {newMenu.days.map((day, index) => (
                                    <div className="createMenuDay create-menu__day">
                                        <h3>Dzień {index + 1} kcal: {Math.floor(day.breakfast.kcal + day.lunch.kcal + day.diner.kcal + day.tea.kcal + day.supper.kcal)}</h3>
                                        <ul>
                                            <li key={index + "1"}>
                                                <p><span className="createMenuMealTypesName create-menu__day-item-type">Śniadanie</span> {Math.floor(day.breakfast.kcal)} kcal</p>
                                                <p className="createMenuMealName create-menu__day-item-name">{day.breakfast.name}</p>
                                                <div className="createMenuDayButtonsSection create-menu__day-item-btn-section">
                                                    <button onClick={() => this.handleEditMealShow(index, "breakfast")}>zamień</button>
                                                    <button onClick={() => this.handleShowRecept(day.breakfast.name, day.breakfast.components, day.breakfast.recept, day.breakfast.kcal)}>szczegóły</button>
                                                </div>
                                            </li>
                                            <li key={index + "2"}>
                                                <p><span className="createMenuMealTypesName create-menu__day-item-type">Drugie śniadanie</span> {Math.floor(day.lunch.kcal)} kcal</p>
                                                <p className="createMenuMealName create-menu__day-item-name">{day.lunch.name}</p>
                                                <div className="createMenuDayButtonsSection create-menu__day-item-btn-section">
                                                    <button onClick={() => this.handleEditMealShow(index, "lunch")}>zamień</button>
                                                    <button onClick={() => this.handleShowRecept(day.lunch.name, day.lunch.components, day.lunch.recept, day.lunch.kcal)}>szczegóły</button>
                                                </div>
                                            </li>
                                            <li key={index + "3"}>
                                                <p><span className="createMenuMealTypesName create-menu__day-item-type">Obiad</span> {Math.floor(day.diner.kcal)} kcal</p>
                                                <p className="createMenuMealName create-menu__day-item-name">{day.diner.name}</p>
                                                <div className="createMenuDayButtonsSection create-menu__day-item-btn-section">
                                                    <button onClick={() => this.handleEditMealShow(index, "diner")}>zamień</button>
                                                    <button onClick={() => this.handleShowRecept(day.diner.name, day.diner.components, day.diner.recept, day.diner.kcal)}>szczegóły</button>
                                                </div>
                                            </li>
                                            <li key={index + "4"}>
                                                <p><span className="createMenuMealTypesName create-menu__day-item-type">Podwieczorek</span> {Math.floor(day.tea.kcal)} kcal</p>
                                                <p className="createMenuMealName create-menu__day-item-name">{day.tea.name}</p>
                                                <div className="createMenuDayButtonsSection create-menu__day-item-btn-section">
                                                    <button onClick={() => this.handleEditMealShow(index, "tea")}>zamień</button>
                                                    <button onClick={() => this.handleShowRecept(day.tea.name, day.tea.components, day.tea.recept, day.tea.kcal)}>szczegóły</button>
                                                </div>
                                            </li>
                                            <li key={index + "5"}>
                                                <p><span className="createMenuMealTypesName create-menu__day-item-type">Kolacja</span> {Math.floor(day.supper.kcal)} kcal</p>
                                                <p className="createMenuMealName create-menu__day-item-name">{day.supper.name}</p>
                                                <div className="createMenuDayButtonsSection create-menu__day-item-btn-section">
                                                    <button onClick={() => this.handleEditMealShow(index, "supper")}>zamień</button>
                                                    <button onClick={() => this.handleShowRecept(day.supper.name, day.supper.components, day.supper.recept, day.supper.kcal)}>szczegóły</button>
                                                </div>
                                            </li>
                                        </ul>

                                    </div>))}
                            </div>

                            {this.state.showRecept ?
                                <div className="showReceptInMenuList recipe" >
                                    <button className="section__icon-button" onClick={this.handleExitRecept}><FaTimesCircle /></button>
                                    <h1 className="recipe__name">{this.state.showReceptName}</h1>
                                    <h2 className="receptKcalInMenuFile recipe__kcal">Kcal: {Math.floor(this.state.showReceptKcal)}</h2>
                                    <div className="receptComponentsInMenuFile  recipe__components">
                                        <h2>Składniki:</h2>
                                        <ul>{this.state.showReceptComponents.map(component =>
                                            <li className="recipe__components-item" key={component.name}>{component.name} x{component.number} {component.measure}</li>)}
                                        </ul>
                                    </div>
                                    <div className="receptReceptInMenuFile  recipe__recipe">
                                        <h2>Przepis:</h2>
                                        <p>{this.state.showReceptRecepts}</p>
                                    </div>
                                </div> : null}

                        </div> : <h1>Tu wyświetli się wygenerowany jadłospis</h1>
                }

            </div >
        )
    }
}

export default CreateMenu
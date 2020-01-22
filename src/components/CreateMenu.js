import React, { Component } from 'react';
import { FaTimesCircle } from 'react-icons/fa';

class CreateMenu extends Component {
    state = {
        name: "",
        days: "",
        kcal: "",
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
        hideMenuGener: false
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
        if (kcal < 1300) {
            alert("Dzienna kaloryczność powinna wynosić conajmniej 1300kcal")
            return
        }
        if (kcal > 4000) {
            alert("Dzienna kaloryczność powinna wynosić maksymalnie 4000kcal")
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
            hideMenuGener: true
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
        fetch(`${this.props.serverAdress}/addmenu`, {
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
            hideMenuGener: false
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
            <div className="create-menu">

                <div className={!this.state.hideMenuGener ? "create-menu__first-step" : "create-menu__first-step--hide"}>
                    <p className="create-menu__instruction">Nazwij swój nowy jadłospis, określ ilośc dni i dzienną kaloryczność. Następnie kliknij 'Generuj jadłospis'</p>
                    <form className="create-menu__form">
                        <label className="create-menu__form-name" htmlFor="name"><input className="create-menu__form-inp" onChange={this.handleMenuName} value={this.state.name} type="text" id="name" placeholder="nazwa"></input></label>
                        <label className="create-menu__form-days" htmlFor="days"><input className="create-menu__form-inp" onChange={this.handleDeaysNumber} value={this.state.days} type="number" id="days" placeholder="dni"></input></label>
                        <label className="create-menu__form-kcal" htmlFor="kcal"><input className="create-menu__form-inp" onChange={this.handleKcalNumber} value={this.state.kcal} type="number" id="kcal" placeholder="kcal na dzień"></input></label>
                        <button className="confirm-btn" onClick={this.handleCreateNewMenuButton}>Generuj jadłospis</button>
                    </form>
                </div>

                {
                    newMenu ?
                        <div className="create-menu__generated-menu">{this.state.editMeal ?

                            <div className="create-menu__change-recipe">
                                <button className="section__icon-button" onClick={this.handleEditMealCancelButton}><FaTimesCircle /></button>
                                <p className="create-menu__change-recipe-sentence">Zamień: <span className="create-menu__change-recipe-sentence-span">{this.state.editMealItem}</span>, na:</p>
                                <input className="create-menu__change-recipe-search-inp" value={this.state.editMealInput} onChange={this.handleEditMealInputChange} placeholder="szukaj"></input>
                                <div className="create-menu__change-recipe-list">{
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

                            <button className="confirm-btn" onClick={this.handleConfirmMenu}>GOTOWE - DODAJ JADŁOSPIS</button>
                            <h2 className="create-menu__name">{newMenu.name}</h2>

                            <div className="create-menu__days-list">
                                {newMenu.days.map((day, index) => (
                                    <div className="create-menu__day">
                                        <h3 className="create-menu__day-nr">Dzień {index + 1} kcal: {Math.floor(day.breakfast.kcal + day.lunch.kcal + day.diner.kcal + day.tea.kcal + day.supper.kcal)}</h3>
                                        <ul className="create-menu__day-meals-list">
                                            <li className="create-menu__day-meals-list-meal" key={index + "1"}>
                                                <p className="create-menu__day-item-kcal"><span className="create-menu__day-item-type">Śniadanie</span> {Math.floor(day.breakfast.kcal)} kcal</p>
                                                <p className="create-menu__day-item-name">{day.breakfast.name}</p>
                                                <div className="create-menu__day-item-btn-section">
                                                    <button className="create-menu__day-item-btn-section-btn" onClick={() => this.handleEditMealShow(index, "breakfast")}>zamień</button>
                                                    <button className="create-menu__day-item-btn-section-btn" onClick={() => this.handleShowRecept(day.breakfast.name, day.breakfast.components, day.breakfast.recept, day.breakfast.kcal)}>szczegóły</button>
                                                </div>
                                            </li>
                                            <li key={index + "2"}>
                                                <p className="create-menu__day-item-kcal"><span className="create-menu__day-item-type">Drugie śniadanie</span> {Math.floor(day.lunch.kcal)} kcal</p>
                                                <p className="create-menu__day-item-name">{day.lunch.name}</p>
                                                <div className="create-menu__day-item-btn-section">
                                                    <button className="create-menu__day-item-btn-section-btn" onClick={() => this.handleEditMealShow(index, "lunch")}>zamień</button>
                                                    <button className="create-menu__day-item-btn-section-btn" onClick={() => this.handleShowRecept(day.lunch.name, day.lunch.components, day.lunch.recept, day.lunch.kcal)}>szczegóły</button>
                                                </div>
                                            </li>
                                            <li key={index + "3"}>
                                                <p className="create-menu__day-item-kcal"><span className="create-menu__day-item-type">Obiad</span> {Math.floor(day.diner.kcal)} kcal</p>
                                                <p className="create-menu__day-item-name">{day.diner.name}</p>
                                                <div className="create-menu__day-item-btn-section">
                                                    <button className="create-menu__day-item-btn-section-btn" onClick={() => this.handleEditMealShow(index, "diner")}>zamień</button>
                                                    <button className="create-menu__day-item-btn-section-btn" onClick={() => this.handleShowRecept(day.diner.name, day.diner.components, day.diner.recept, day.diner.kcal)}>szczegóły</button>
                                                </div>
                                            </li>
                                            <li key={index + "4"}>
                                                <p className="create-menu__day-item-kcal"><span className="create-menu__day-item-type">Podwieczorek</span> {Math.floor(day.tea.kcal)} kcal</p>
                                                <p className="create-menu__day-item-name">{day.tea.name}</p>
                                                <div className="create-menu__day-item-btn-section">
                                                    <button className="create-menu__day-item-btn-section-btn" onClick={() => this.handleEditMealShow(index, "tea")}>zamień</button>
                                                    <button className="create-menu__day-item-btn-section-btn" onClick={() => this.handleShowRecept(day.tea.name, day.tea.components, day.tea.recept, day.tea.kcal)}>szczegóły</button>
                                                </div>
                                            </li>
                                            <li key={index + "5"}>
                                                <p className="create-menu__day-item-kcal"><span className="create-menu__day-item-type">Kolacja</span> {Math.floor(day.supper.kcal)} kcal</p>
                                                <p className="create-menu__day-item-name">{day.supper.name}</p>
                                                <div className="create-menu__day-item-btn-section">
                                                    <button className="create-menu__day-item-btn-section-btn" onClick={() => this.handleEditMealShow(index, "supper")}>zamień</button>
                                                    <button className="create-menu__day-item-btn-section-btn" onClick={() => this.handleShowRecept(day.supper.name, day.supper.components, day.supper.recept, day.supper.kcal)}>szczegóły</button>
                                                </div>
                                            </li>
                                        </ul>

                                    </div>))}
                            </div>

                            {this.state.showRecept ?
                                <div className="menu__recipe-section">
                                    <div className="recipe" >
                                        <button className="section__icon-button" onClick={this.handleExitRecept}><FaTimesCircle /></button>
                                        <h1 className="recipe__name">{this.state.showReceptName}</h1>
                                        <h2 className="recipe__kcal">Kcal: {Math.floor(this.state.showReceptKcal)}</h2>
                                        <div className="recipe__components">
                                            <h2 className="recipe__components-title">Składniki:</h2>
                                            <ul className="recipe__components-list">{this.state.showReceptComponents.map(component =>
                                                <li className="recipe__components-item" key={component.name}>{component.name} x{component.number} {component.measure}</li>)}
                                            </ul>
                                        </div>
                                        <div className="recipe__recipe">
                                            <h2 className="recipe__recipe-name">Przepis:</h2>
                                            <p className="recipe__recipe-recipe">{this.state.showReceptRecepts}</p>
                                        </div>
                                    </div>
                                </div> : null}

                        </div> : <h1>Tu wyświetli się wygenerowany jadłospis</h1>
                }

            </div >
        )
    }
}

export default CreateMenu
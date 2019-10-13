import React, { Component } from 'react';
import '../style/CreateMenu.css';
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
        if (this.state.name === "") {
            alert("Nie podałeś nazwy jadłospisu")
            return
        }
        if (this.state.days === "") {
            alert("Nie podałeś ilości dni")
            return
        }
        if (this.state.kcal === "") {
            alert("Nie podałeś dziennej kaloryczności")
            return
        }
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
        fetch('http://localhost:5000/addmenu', {
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
            <div className="createMenuFile">

                <div className={this.state.hideMenuGener}>
                    <p>Nazwij swój nowy jadłospis, określ ilośc dni i dzienną kaloryczność. Następnie kliknij 'Generuj jadłospis'</p>
                    <form className="menuGener">
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
                        <div className="generatedMenu">{this.state.editMeal ?

                            <div className="changeReceptOnNewMenu">
                                <button onClick={this.handleEditMealCancelButton}><FaTimesCircle /></button>
                                <p>Zamień: <span>{this.state.editMealItem}</span>, na:</p>
                                <input value={this.state.editMealInput} onChange={this.handleEditMealInputChange} placeholder="szukaj"></input>
                                <div className="ListOfChangeReceptInNewMenu">{
                                    <ul>{inputSearch.map((recept, index) =>
                                        <li key={index}>
                                            <p>{recept.name} kcal: {Math.round(Math.round(recept.kcal * Math.pow(10, 2 + 1)) / 10) / (Math.pow(10, 2 + 1) / 10)}</p>
                                            <button onClick={this.handleEditMealConfirmButton} value={recept.name}>Wybierz</button>
                                            <button onClick={() => this.handleShowRecept(recept.name, recept.components, recept.recept, recept.kcal)}>Szczegóły</button>
                                        </li>)}
                                    </ul>}
                                </div>
                            </div> : null}

                            <button className="createMenuConfirmButton" onClick={this.handleConfirmMenu}>GOTOWE - DODAJ JADŁOSPIS</button>
                            <h2 className="createMenuName">{newMenu.name}</h2>

                            <div className="createMenuDays">
                                {newMenu.days.map((day, index) => (
                                    <div className="createMenuDay">
                                        <h3>Dzień {index + 1} kcal: {day.breakfast.kcal + day.lunch.kcal + day.diner.kcal + day.tea.kcal + day.supper.kcal}</h3>
                                        <ul>
                                            <li key={index + "1"}>
                                                <p><span className="createMenuMealTypesName">Śniadanie</span> {day.breakfast.kcal} kcal</p>
                                                <p className="createMenuMealName">{day.breakfast.name}</p>
                                                <div className="createMenuDayButtonsSection">
                                                    <button onClick={() => this.handleEditMealShow(index, "breakfast")}>zamień</button>
                                                    <button onClick={() => this.handleShowRecept(day.breakfast.name, day.breakfast.components, day.breakfast.recept, day.breakfast.kcal)}>szczegóły</button>
                                                </div>
                                            </li>
                                            <li key={index + "2"}>
                                                <p><span className="createMenuMealTypesName">Drugie śniadanie</span> {day.lunch.kcal} kcal</p>
                                                <p className="createMenuMealName">{day.lunch.name}</p>
                                                <div className="createMenuDayButtonsSection">
                                                    <button onClick={() => this.handleEditMealShow(index, "lunch")}>zamień</button>
                                                    <button onClick={() => this.handleShowRecept(day.lunch.name, day.lunch.components, day.lunch.recept, day.lunch.kcal)}>szczegóły</button>
                                                </div>
                                            </li>
                                            <li key={index + "3"}>
                                                <p><span className="createMenuMealTypesName">Obiad</span> {day.diner.kcal} kcal</p>
                                                <p className="createMenuMealName">{day.diner.name}</p>
                                                <div className="createMenuDayButtonsSection">
                                                    <button onClick={() => this.handleEditMealShow(index, "diner")}>zamień</button>
                                                    <button onClick={() => this.handleShowRecept(day.diner.name, day.diner.components, day.diner.recept, day.diner.kcal)}>szczegóły</button>
                                                </div>
                                            </li>
                                            <li key={index + "4"}>
                                                <p><span className="createMenuMealTypesName">Podwieczorek</span> {day.tea.kcal} kcal</p>
                                                <p className="createMenuMealName">{day.tea.name}</p>
                                                <div className="createMenuDayButtonsSection">
                                                    <button onClick={() => this.handleEditMealShow(index, "tea")}>zamień</button>
                                                    <button onClick={() => this.handleShowRecept(day.tea.name, day.tea.components, day.tea.recept, day.tea.kcal)}>szczegóły</button>
                                                </div>
                                            </li>
                                            <li key={index + "5"}>
                                                <p><span className="createMenuMealTypesName">Kolacja</span> {day.supper.kcal} kcal</p>
                                                <p className="createMenuMealName">{day.supper.name}</p>
                                                <div className="createMenuDayButtonsSection">
                                                    <button onClick={() => this.handleEditMealShow(index, "supper")}>zamień</button>
                                                    <button onClick={() => this.handleShowRecept(day.supper.name, day.supper.components, day.supper.recept, day.supper.kcal)}>szczegóły</button>
                                                </div>
                                            </li>
                                        </ul>

                                    </div>))}
                            </div>

                            {this.state.showRecept ?
                                <div className="showReceptInMenuList" >
                                    <button onClick={this.handleExitRecept}><FaTimesCircle /></button>
                                    <h1>{this.state.showReceptName}</h1>
                                    <h2 className="receptKcalInMenuFile">Kcal: {Math.round(Math.round(this.state.showReceptKcal * Math.pow(10, 2 + 1)) / 10) / (Math.pow(10, 2 + 1) / 10)}</h2>
                                    <div className="first">
                                        <h2>Składniki:</h2>
                                        <ul>{this.state.showReceptComponents.map(component =>
                                            <li key={component.name}>{component.name} x{component.number} {component.measure}</li>)}
                                        </ul>
                                    </div>
                                    <div className="second">
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
import React, { Component } from 'react';
import '../style/CreateRecept.css'

class CreateRecept extends Component {
    state = {
        products: this.props.products,
        addedReceptName: "",
        expanded: false,
        breakfast: false,
        lunch: false,
        diner: false,
        tea: false,
        supper: false,
        addedProducts: [{ name: "", measure: "", number: "" }],
        addedProductIndex: -1,
        addedRecept: ""
    }
    handleShowCheckboxes = () => {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    handleSelectReceptType = (e) => {
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

    handleAddedReceptName = (e) => {
        this.setState({
            addedReceptName: e.target.value
        })
    }

    handleAddProduct = (e) => {
        e.preventDefault();
        const item = { name: "", measure: "", number: "" };
        const newList = this.state.addedProducts;
        newList.push(item);
        this.setState({
            addedProducts: newList
        })
    }

    handleChangeExactProduct = (e) => {
        let arr = this.state.addedProducts
        if (e.target.type === "text") {
            arr[e.target.id].name = e.target.value;
        } else if (e.target.type === "number") {
            if (e.target.value < 1) return
            arr[e.target.id].number = e.target.value;
        }
        this.setState({
            addedProducts: arr
        })
    }

    handleDeleteExactProduct = (e) => {
        e.preventDefault();
        const newList = this.state.addedProducts;
        newList.splice(e.target.id, 1);
        this.setState({
            addedProducts: newList
        })
    }

    handleAddedRecept = (e) => {
        this.setState({
            addedRecept: e.target.value
        })
    }

    handleConfirmAddedRecept = (e) => {
        e.preventDefault();
        const components = this.state.addedProducts;
        const addedRecept = {
            id: this.props.id + 1,
            name: this.state.addedReceptName,
            kcal: "",
            components: components.map(component => ({ name: component.name, measure: component.measure, number: component.number })),
            type: `${this.state.breakfast ? "breakfast " : ""}${this.state.lunch ? "lunch " : ""}${this.state.diner ? "diner " : ""}${this.state.tea ? "tea " : ""}${this.state.supper ? "supper" : ""}`,
            recept: this.state.addedRecept,
        }
        console.log(addedRecept)
        fetch('http://localhost:5000/addrecept', {
            method: 'POST',
            body: JSON.stringify(addedRecept),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        this.setState({
            addedReceptName: "",
            expanded: false,
            breakfast: false,
            lunch: false,
            diner: false,
            tea: false,
            supper: false,
            addedProducts: [{ name: "", measure: "", number: "" }],
            addedRecept: "",
        })
    }

    handleSelectProduct = (e) => {
        console.log("ok")
        // const arr = this.state.addedProducts;
        // arr[this.state.addedProductIndex] = this.state.products.filter(product => product.name.toLowerCase() === e.target.value.toLowerCase());
        // console.log(this.state.products.filter(product => product.name.toLowerCase() === e.target.value.toLowerCase()))
        // this.setState({
        //     addedProducts: arr
        // })
    }

    handleSetIndex = (index) => {
        this.setState({
            addedProductIndex: index
        })
    }

    handleCheckProductIndex = (index) => {
        return index
    }

    render() {
        const inputSearch = this.state.addedProductIndex === -1 ? null : this.state.products.filter(product => product.name.toLowerCase().includes(this.state.addedProducts[this.state.addedProductIndex].name.toLowerCase()));
        return (
            <div className="createReceptForm">
                <input className="createReceptName" value={this.state.addedReceptName} onChange={this.handleAddedReceptName} type="text" placeholder="Recept Name" />
                <div className="multiselect">
                    <div className="selectBox" onClick={this.handleShowCheckboxes}>
                        <select>
                            <option>Select recept types</option>
                        </select>
                        <div className="overSelect"></div>
                    </div>
                    {!this.state.expanded ? null : <div className="checkboxes">
                        <label htmlFor="breakfast">
                            <input onChange={this.handleSelectReceptType} checked={this.state.breakfast} type="checkbox" id="breakfast" />Breakfast</label>
                        <label htmlFor="lunch">
                            <input onChange={this.handleSelectReceptType} checked={this.state.lunch} type="checkbox" id="lunch" />Lunch</label>
                        <label htmlFor="diner">
                            <input onChange={this.handleSelectReceptType} checked={this.state.diner} type="checkbox" id="diner" />Diner</label>
                        <label htmlFor="tea">
                            <input onChange={this.handleSelectReceptType} checked={this.state.tea} type="checkbox" id="tea" />Tea</label>
                        <label htmlFor="supper">
                            <input onChange={this.handleSelectReceptType} checked={this.state.supper} type="checkbox" id="supper" />Supper</label>
                    </div>}
                </div>

                <button className="createReceptButtons" onClick={this.handleAddProduct}>add product</button>
                <ul className="addProductsList">{this.state.addedProducts.map((product, index) => (
                    <li className="addProductsItem" key={index}>
                        <input className="addProductsItemName" id={index} onChange={this.handleChangeExactProduct} onFocus={this.state.addedProductIndex !== index ? () => { this.handleSetIndex(index) } : null} onBlur={() => this.handleSetIndex(-1)} type="text" value={product.name} />
                        <div>{this.state.addedProductIndex === this.handleCheckProductIndex(index) && this.state.addedProducts[this.state.addedProductIndex].name.length > 2 ? <ul>{inputSearch.map((product, index) => <li key={index}><button onClick={console.log("ok")} value={product.name}>{product.name}</button></li>)}</ul> : null}</div>
                        <input className="addProductsItemNumber" id={index} onChange={this.handleChangeExactProduct} type="number" value={product.number} />
                        <button className="createReceptButtons" id={index} onClick={this.handleDeleteExactProduct}>X</button>
                    </li>))}
                </ul>
                <textarea className="addReceptTextField" value={this.state.addedRecept} onChange={this.handleAddedRecept} cols="40" rows="5"></textarea>
                <p>kcal: {}</p>
                <button className="createReceptButtons" onClick={this.handleConfirmAddedRecept}>Add your new recept</button>
            </div>
        )
    }
}

export default CreateRecept
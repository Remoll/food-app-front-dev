import React, { Component } from 'react';
import '../style/CreateRecept.css'

class CreateRecept extends Component {
    state = {
        itemSelected: false,
        newItemInputFocus: false,
        products: this.props.products,
        addedReceptName: "",
        expanded: false,
        breakfast: false,
        lunch: false,
        diner: false,
        tea: false,
        supper: false,
        addedProducts: [],
        newProduct: { name: "", measure: "", kcal: "", number: "" },
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
        if (this.state.products.filter(produkt => produkt.name === this.state.newProduct.name).length === 1) {
            const newProduct = this.state.products.filter(produkt => produkt.name === this.state.newProduct.name)[0];
            let addedProducts = this.state.addedProducts
            addedProducts.push(newProduct)
            console.log(newProduct)
            this.setState({
                addedProducts,
                newProduct: { name: "", measure: "", kcal: "", number: "" },
                newItemInputFocus: false,
                itemSelected: false
            })
        } else {
            alert("Podaj nazwę produktu i wybierz produkt z listy")
            this.setState({
                newItemInputFocus: true
            })
        }
    }

    handleChangeExactProduct = (e) => {
        let obj = this.state.newProduct
        if (e.target.type === "text") {
            obj.name = e.target.value;
        } else if (e.target.type === "number") {
            if (e.target.value < 0) return
            obj.number = e.target.value;
        }
        this.setState({
            newProduct: obj
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
        if (this.state.addedReceptName === "") {
            alert("Nie podałeś nazwy przepisu")
            return
        }
        if (this.state.addedProducts.length === 0) {
            alert("Nie dodałeś żadnych produktów")
            return
        }
        if (this.state.addedRecept === "") {
            alert("Nie podałeś przepisu")
            return
        }
        const components = this.state.addedProducts;
        let kcal = 0;
        components.forEach(component => kcal += component.kcal * component.number)
        const addedRecept = {
            id: this.props.id + 1,
            name: this.state.addedReceptName,
            kcal,
            components: components.map(component => ({ name: component.name, measure: component.measure, number: component.number })),
            type: `${this.state.breakfast ? "breakfast " : ""}${this.state.lunch ? "lunch " : ""}${this.state.diner ? "diner " : ""}${this.state.tea ? "tea " : ""}${this.state.supper ? "supper" : ""}`,
            recept: this.state.addedRecept,
        }
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
            addedProducts: [{ name: "", measure: "", kcal: "", number: "" }],
            addedRecept: "",
        })
    }

    handleSelectProduct = (e) => {
        const arr = this.state.addedProducts;
        const element = this.state.products.filter(product => product.name.toLowerCase() === e.target.value.toLowerCase())
        element[0].number = 1
        arr[this.state.addedProductIndex] = element[0];
        this.setState({
            addedProducts: arr,
            addedProductIndex: -1
        })
    }

    handleFocus = () => {
        this.setState({
            newItemInputFocus: true
        })
    }

    handleBlur = () => {
        setTimeout(() => {
            this.setState({
                newItemInputFocus: false
            })
        }, 200);
    }

    handleSelectProduct = (e) => {
        const newProduct = this.state.products.filter(produkt => produkt.name === e.target.value)[0]
        const alreadyExist = this.state.addedProducts.filter(produkt => produkt.name === e.target.value)
        if (alreadyExist.length > 0) {
            alert("Dodałeś już ten produkt");
            return
        }
        newProduct.number = 100;
        this.setState({
            newProduct,
            newItemInputFocus: false,
            itemSelected: true
        })
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
        const inputSearch = this.state.newProduct.name.length < 2 ? null : this.state.products.filter(product => product.name.toLowerCase().includes(this.state.newProduct.name.toLowerCase()));
        let kcal = 0;
        this.state.addedProducts.forEach(product => kcal += product.kcal * product.number)
        return (
            <div className="createReceptForm">
                <input className="createReceptName" value={this.state.addedReceptName} onChange={this.handleAddedReceptName} type="text" placeholder="nazwij przepis" />
                <div className="multiselect">
                    <div className="selectBox" onClick={this.handleShowCheckboxes}>
                        <select>
                            <option>Wybierz typ dania</option>
                        </select>
                        <div className="overSelect"></div>
                    </div>
                    {!this.state.expanded ? null : <div className="checkboxes">
                        <label htmlFor="breakfast">
                            <input onChange={this.handleSelectReceptType} checked={this.state.breakfast} type="checkbox" id="breakfast" />Śniadanie</label>
                        <label htmlFor="lunch">
                            <input onChange={this.handleSelectReceptType} checked={this.state.lunch} type="checkbox" id="lunch" />Drugie śniadanie</label>
                        <label htmlFor="diner">
                            <input onChange={this.handleSelectReceptType} checked={this.state.diner} type="checkbox" id="diner" />Obiad</label>
                        <label htmlFor="tea">
                            <input onChange={this.handleSelectReceptType} checked={this.state.tea} type="checkbox" id="tea" />Podwieczorek</label>
                        <label htmlFor="supper">
                            <input onChange={this.handleSelectReceptType} checked={this.state.supper} type="checkbox" id="supper" />Kolacja</label>
                    </div>}
                </div>

                <ul className="addProductsList">{this.state.addedProducts.map((product, index) => (
                    <li className="addProductsItem" key={index}>
                        <h3 className="addProductsItemName" id={index}>{product.name.toUpperCase()}</h3>
                        <h3 className="addProductsItemNumber" id={index}>{product.number} {product.measure}</h3>
                        <button className="createReceptButtons" id={index} onClick={this.handleDeleteExactProduct}>usuń</button>
                    </li>))}
                </ul>

                <input className="addProductsItemName" onChange={this.state.itemSelected ? null : this.handleChangeExactProduct} onFocus={this.handleFocus} onBlur={this.handleBlur} type="text" value={this.state.newProduct.name} placeholder="podaj nazwę produktu" />
                {this.state.newProduct.name.length > 2 && this.state.newItemInputFocus ? <div className="addProductsAutocompleteList">{inputSearch.map((product, index) => <button key={index} onClick={this.handleSelectProduct} value={product.name}>{product.name}</button>)}</div> : null}
                <input className="addProductsItemNumber" onChange={this.handleChangeExactProduct} type="number" value={this.state.newProduct.number} /><p>{this.state.newProduct.measure}</p>
                <button className="createReceptButtons" onClick={this.handleAddProduct}>dodaj produkt</button>

                <textarea className="addReceptTextField" value={this.state.addedRecept} onChange={this.handleAddedRecept} cols="40" rows="5" placeholder="wprowadź przepis"></textarea>
                <p>kcal: {Math.round(Math.round(kcal * Math.pow(10, 2 + 1)) / 10) / (Math.pow(10, 2 + 1) / 10)}</p>{//zaokrągla kalorie do 2 miejsc po przecinku
                }

                <button className="createReceptButtons" onClick={this.handleConfirmAddedRecept}>GOTOWE - DODAJ PRZEPIS</button>
            </div>
        )
    }
}

export default CreateRecept
import React, { Component } from 'react';

class CreateRecept extends Component {
    state = {
        itemSelected: false,
        newItemInputFocus: false,
        products: this.props.products,
        addedReceptName: "",
        expanded: false,
        breakfast: true,
        lunch: true,
        diner: true,
        tea: true,
        supper: true,
        addedProducts: [],
        newProduct: { name: "", measure: "", kcal: "", number: "" },
        addedProductIndex: -1,
        addedRecept: "",
        refreshReceptsBase: false
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
        fetch(`${this.props.serverAdress}/addrecept`, {
            method: 'POST',
            body: JSON.stringify(addedRecept),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(this.props.upgradeRecepts)
            .then(this.props.handleHideRightSite)
        this.setState({
            addedReceptName: "",
            expanded: false,
            breakfast: true,
            lunch: true,
            diner: true,
            tea: true,
            supper: true,
            addedProducts: [],
            addedRecept: "",
            refreshReceptsBase: true
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
            <div className="create-recipe">

                <div className="create-recipe__form-name">
                    <p className="create-recipe__step">1. Nazwij przepis oraz opcjonalnie wybierz jego typ</p>
                    <input className="create-recipe__form-name-name" value={this.state.addedReceptName} onChange={this.handleAddedReceptName} type="text" placeholder="nazwij przepis" />
                    <div className="create-recipe__form-name-multiselect">
                        <div className="create-recipe__form-name-multiselect-select-box" onClick={this.handleShowCheckboxes}>
                            <select className="create-recipe__form-name-multiselect-select-box-name">
                                <option>Wybierz typ dania</option>
                            </select>
                            <div className="create-recipe__form-name-multiselect-select-box-over-select"></div>
                        </div>
                        {!this.state.expanded ? null : <div className="create-recipe__form-name-multiselect-checkboxes">
                            <label className="create-recipe__form-name-multiselect-checkboxes-label" htmlFor="breakfast">
                                <input className="create-recipe__form-name-multiselect-checkboxes-label-inp" onChange={this.handleSelectReceptType} checked={this.state.breakfast} type="checkbox" id="breakfast" />Śniadanie</label>
                            <label className="create-recipe__form-name-multiselect-checkboxes-label" htmlFor="lunch">
                                <input className="create-recipe__form-name-multiselect-checkboxes-label-inp" onChange={this.handleSelectReceptType} checked={this.state.lunch} type="checkbox" id="lunch" />Drugie śniadanie</label>
                            <label className="create-recipe__form-name-multiselect-checkboxes-label" htmlFor="diner">
                                <input className="create-recipe__form-name-multiselect-checkboxes-label-inp" onChange={this.handleSelectReceptType} checked={this.state.diner} type="checkbox" id="diner" />Obiad</label>
                            <label className="create-recipe__form-name-multiselect-checkboxes-label" htmlFor="tea">
                                <input className="create-recipe__form-name-multiselect-checkboxes-label-inp" onChange={this.handleSelectReceptType} checked={this.state.tea} type="checkbox" id="tea" />Podwieczorek</label>
                            <label className="create-recipe__form-name-multiselect-checkboxes-label" htmlFor="supper">
                                <input className="create-recipe__form-name-multiselect-checkboxes-label-inp" onChange={this.handleSelectReceptType} checked={this.state.supper} type="checkbox" id="supper" />Kolacja</label>
                        </div>}
                    </div>
                </div>

                <div className="createReceptFormProdukts create-recipe__form-products">
                    <div>
                        <p className="create-recipe__step">2. Wyszukaj i dodaj potrzebne składniki</p>
                        <ul className="create-recipe__form-products-list">{this.state.addedProducts.map((product, index) => (
                            <li className="create-recipe__form-products-item" key={index}>
                                <p className="create-recipe__form-products-name" id={index}>{product.name.toUpperCase()}</p>
                                <p className="create-recipe__form-products-number" id={index}>{product.number} {product.measure}</p>
                                <button className="create-recipe__form-btn" id={index} onClick={this.handleDeleteExactProduct}>usuń</button>
                            </li>))}
                        </ul>
                        <p className="create-recipe__form-products-kcal">Kcal: {Math.floor(kcal)}</p>
                    </div>

                    <input className="create-recipe__form-products-input-name" onChange={this.state.itemSelected ? null : this.handleChangeExactProduct} onFocus={this.handleFocus} onBlur={this.handleBlur} type="text" value={this.state.newProduct.name} placeholder="podaj nazwę produktu" />
                    <input className="create-recipe__form-products-input-number" onChange={this.handleChangeExactProduct} type="number" value={this.state.newProduct.number} />
                    <p className="create-recipe__form-products-input-measure">{this.state.newProduct.measure}</p>

                    <div className="create-recipe__form-products-autocomplete-area">
                        {this.state.newProduct.name.length > 2 && this.state.newItemInputFocus ? <div className="create-recipe__form-products-autocomplete-area-list">{inputSearch.map((product, index) => <button className="create-recipe__form-products-autocomplete-area-list-btn" key={index} onClick={this.handleSelectProduct} value={product.name}>{product.name}</button>)}</div> : null}
                    </div>
                    <button className="create-recipe__form-btn" onClick={this.handleAddProduct}>dodaj produkt</button>
                </div>

                <div className="create-recipe__form-recipe">
                    <p className="create-recipe__step">3. Podaj sposób przygotowania nowego przepisu</p>
                    <textarea className="create-recipe__form-recipe-recipe" value={this.state.addedRecept} onChange={this.handleAddedRecept} cols="40" rows="5" placeholder="wprowadź przepis"></textarea>
                </div>

                <button className="confirm-btn" onClick={this.handleConfirmAddedRecept}>GOTOWE - DODAJ PRZEPIS</button>
            </div>
        )
    }
}

export default CreateRecept
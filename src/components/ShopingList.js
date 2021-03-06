import React, { Component } from 'react';

class ShopingList extends Component {
    state = {
        shopingList: []
    }

    componentDidMount() {
        if (this.props.item === "nie dodano danych") return
        else {
            if (this.props.item.days === undefined) {
                let shopingList = this.props.item.components
                shopingList.forEach((element, index) => {
                    element.checked = false;
                    element.key = index
                });
                this.setState({
                    shopingList
                })
            } else {
                let shopingList = [];

                this.props.item.days.map(day =>
                    day.breakfast.components.map(component =>
                        (shopingList.filter(item => item.name === component.name)).length === 0 ? shopingList.push(component) : shopingList[shopingList.findIndex(item => item.name === component.name)].number = Number(shopingList[shopingList.findIndex(item => item.name === component.name)].number) + Number(component.number)))
                this.props.item.days.map(day =>
                    day.lunch.components.map(component =>
                        (shopingList.filter(item => item.name === component.name)).length === 0 ? shopingList.push(component) : shopingList[shopingList.findIndex(item => item.name === component.name)].number = Number(shopingList[shopingList.findIndex(item => item.name === component.name)].number) + Number(component.number)))
                this.props.item.days.map(day =>
                    day.diner.components.map(component =>
                        (shopingList.filter(item => item.name === component.name)).length === 0 ? shopingList.push(component) : shopingList[shopingList.findIndex(item => item.name === component.name)].number = Number(shopingList[shopingList.findIndex(item => item.name === component.name)].number) + Number(component.number)))
                this.props.item.days.map(day =>
                    day.tea.components.map(component =>
                        (shopingList.filter(item => item.name === component.name)).length === 0 ? shopingList.push(component) : shopingList[shopingList.findIndex(item => item.name === component.name)].number = Number(shopingList[shopingList.findIndex(item => item.name === component.name)].number) + Number(component.number)))
                this.props.item.days.map(day =>
                    day.supper.components.map(component =>
                        (shopingList.filter(item => item.name === component.name)).length === 0 ? shopingList.push(component) : shopingList[shopingList.findIndex(item => item.name === component.name)].number = Number(shopingList[shopingList.findIndex(item => item.name === component.name)].number) + Number(component.number)))

                shopingList.forEach((element, index) => {
                    element.checked = false;
                    element.key = index
                });
                this.props.upgradeMenus()
                this.setState({
                    shopingList
                });
            }
        }

    }

    handleChecked(key) {
        let shopingList = this.state.shopingList;
        shopingList[key].checked = !shopingList[key].checked
        this.setState({
            shopingList
        })
    }

    render() {
        return (
            <div className="shoping-list">
                {this.props.item === "nie dodano danych" ?
                    <h2>Wyszukaj odpowiednią receptę lub jadłospis i następnie wygeneruj listę zakupów aby wyświetlić</h2>
                    : <h2 className="shoping-list__name">{this.props.item.name}</h2>}
                {this.state.shopingList === [] ? null : <ul className="shoping-list__list">
                    {this.state.shopingList.map(component => (
                        <li className="shoping-list__item" key={component.key}>
                            <p className="shoping-list__item-name">{component.name}</p>
                            <p className="shoping-list__item-number">{component.number} {component.measure}</p>
                            <input className="shoping-list__item-checkbox" type="checkbox" onChange={() => this.handleChecked(component.key)} checked={component.checked}></input>
                        </li>
                    ))}
                </ul>}
            </div>
        )
    }
}

export default ShopingList
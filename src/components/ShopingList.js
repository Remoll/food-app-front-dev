import React, { Component } from 'react';

class ShopingList extends Component {
    state = {
        days: ""
    }

    handleDaysNumber = (e) => {
        console.log(e.target.value)
        this.setState({
            days: e.target.value,
        })
    }

    handleRenderList = e => {
        e.preventDefault();
        console.log("render shoping list");
        this.setState({
            days: "",
        })
    }
    render() {
        return (
            <div>
                <h1>Generuj listę zakupów: </h1>
                <form onSubmit={this.handleRenderList}>
                    <label>Wybierz ilość dni: </label>
                    <input type="number" value={this.state.days} onChange={this.handleDaysNumber}></input>
                    <button>OK</button>
                </form>
            </div>
        )
    }
}

export default ShopingList
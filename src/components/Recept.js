import React from 'react'
import '../style/Recept.css'

const Recept = (props) => {
    const components = props.recept.components.map(component =>
        <li className="componentInReceptFile recipe__components-item" key={component.name}>{component.name} {component.number} {component.measure}</li>);
    return (
        <div className="receptFile recipe">
            <h1 className="nameInReceptFile recipe__name">{props.recept.name}</h1>
            <h2 className="kcalInReceptFile recipe__kcal">Kcal: {Math.floor(props.recept.kcal)}</h2>
            <div className="componentsInReceptFile recipe__components">
                <h2>Składniki:</h2>
                <ul>{components}</ul>
            </div>
            <div className="receptInReceptFile recipe__recipe">
                <h2>Przepis:</h2>
                <p>{props.recept.recept}</p>
            </div>
        </div>
    )
}

export default Recept;
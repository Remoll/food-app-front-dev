import React from 'react'
import '../style/Recept.css'

const Recept = (props) => {
    const components = props.recept.components.map(component =>
        <li className="componentInReceptFile" key={component.name}>{component.name} {component.number} {component.measure}</li>);
    return (
        <div className="receptFile">
            <h1 className="nameInReceptFile">{props.recept.name}</h1>
            <h2 className="kcalInReceptFile">Kcal: {Math.floor(props.recept.kcal)}</h2>
            <div className="componentsInReceptFile"><h2>Składniki:</h2><ul>{components}</ul></div>
            <div className="receptInReceptFile"><h2>Przepis:</h2><p>{props.recept.recept}</p></div>
        </div>
    )
}

export default Recept;
import React from 'react'

const Recept = (props) => {
    const components = props.recept.components.map(component => <li key={component.name}>{component.name} x{component.number} {component.measure}</li>);
    return (
        <div>
            <h1>{props.recept.name}</h1>
            <div><h2>Składniki:</h2><ul>{components}</ul></div>
            <div><h2>Przepis:</h2><p>{props.recept.recept}</p></div>
            <div><h2>Kcal:</h2><p>{Math.round(Math.round(props.recept.kcal * Math.pow(10, 2 + 1)) / 10) / (Math.pow(10, 2 + 1) / 10)}</p></div>
        </div>
    )
}

export default Recept;
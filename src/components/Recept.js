import React from 'react'

const Recept = (props) => {
    const components = props.recept.components.map(component => <li key={component.name}>{component.name} x{component.number * props.peopleNumber} {component.measure}</li>);
    return (
        <div>
            <h1>{props.recept.name}</h1>
            <div><h2>Components:</h2><ul>{components}</ul></div>
            <div><h2>Recept:</h2><p>{props.recept.recept}</p></div>
        </div>
    )
}

export default Recept;
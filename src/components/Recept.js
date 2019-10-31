import React from 'react'
// import '../style/Recipe.scss'

const Recept = (props) => {
    const components = props.recept.components.map(component =>
        <li className="recipe__components-item" key={component.name}>{component.name} {component.number} {component.measure}</li>);
    return (
        <div className="recipe">
            <h1 className="recipe__name">{props.recept.name}</h1>
            <h2 className="recipe__kcal">Kcal: {Math.floor(props.recept.kcal)}</h2>
            <div className="recipe__components">
                <h2 className="recipe__components-title">Składniki:</h2>
                <ul className="recipe__components-list">{components}</ul>
            </div>
            <div className="recipe__recipe">
                <h2 className="recipe__recipe-name">Przepis:</h2>
                <p className="recipe__recipe-recipe">{props.recept.recept}</p>
            </div>
        </div>
    )
}

export default Recept;
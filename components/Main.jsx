import {useEffect, useState, useRef} from "react"
import IngredientsList from "./IngredientsList"
import CookingAIRecipe from "./CookingAIRecipe"
import {getRecipeFromHuggingFace} from "../ai"

export default function Main() {
    const [ingredients, setIngredients] = useState(
        ["olive oil"]
    )
    const [recipe, setRecipe] = useState("")
    const recipeSection = useRef(null)

    useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            const yCoordinate = recipeSection.current.getBoundingClientRect().top + window.scrollY
            window.scrollTo({top: yCoordinate, behavior: "smooth"})
        }
    }, [recipe])

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromHuggingFace(ingredients)
        setRecipe(recipeMarkdown)
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. milk"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ref={recipeSection}
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            }

            {recipe && <CookingAIRecipe recipe={recipe}/>}
        </main>
    )
}
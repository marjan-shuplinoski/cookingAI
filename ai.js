import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
Given a list of ingredients, suggest a recipe using some or all of them. Include a reasonable number of additional common ingredients if needed. Format the recipe in Markdown.
`

const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN)
console.log(import.meta.env.VITE_HF_ACCESS_TOKEN)
export async function getRecipeFromHuggingFace(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                {role: "system", content: SYSTEM_PROMPT},
                {role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`},
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}




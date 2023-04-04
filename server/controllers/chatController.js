import { Configuration, OpenAIApi } from 'openai'

const openAIConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openapi = new OpenAIApi(openAIConfig)

export const chatCompletion = async (req, res) => {
  try {
    const { prompt } = req.body

    const answer = await openapi.completions({
      model: 'gpt-3.5-turbo',
      prompt: prompt,
      temperature: 0,
      max_tokens: 3000,
    })

    const text = answer.data.choices[0].text

    res.status(200).json({ text })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
import axiosClient from './axiosClient'

export const chatCompletion = async ({ prompt }) => {
  try {
    const response = await axiosClient.post('/chats', {
      prompt,
    })
    return { response }
  } catch (error) {
    return error
  }
}

import openai from './api.js'

const generateSQL = async (queryDescription) => {

    //davinci model
    const daVinci = async (qDesc) => {
        const res = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Convert the following natural language description into a SQL query: \n\n${qDesc}`,
            max_tokens: 100,
            temperature: 0,
         })
        
        return res.data.choices[0].text
    }
    
    //gpt-3.5 model
    const chatGptApi = async (qDesc) => {
        const messages = [
            { role: "system", content: `You job is to translate plain English into SQL.`},
            { role: "user", content: `Convert the following natural language description into a SQL query: \n\nshow all users' id from the user table`},
            { role: "assistant", content: `select id from user`},
            { role: "user", content: `Convert the following natural language description into a SQL query: \n\n${qDesc}`}
        ];

        const res = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: messages,
        })

        return res.data.choices[0].message.content
    }

    return await chatGptApi(queryDescription) 
}

export default generateSQL
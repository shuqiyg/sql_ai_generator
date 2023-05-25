import { Configuration, OpenAIApi} from "openai";
import dotenv from 'dotenv'

dotenv.config()

const openaiAPIKEY = process.env.OPENAI_API_KEY

if(!openaiAPIKEY) {
    console.log("OPENAI API KEY is missing!");
    //close the backend
    process.exit(1)
}

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

export default openai
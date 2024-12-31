import { Configuration, OpenAIApi } from "openai"
import { env } from "@/lib/env"

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
  organization: env.OPENAI_ORGANIZATION_ID,
})

export const openai = new OpenAIApi(configuration)
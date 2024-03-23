import axios from "axios"

const apiURL = import.meta.env.API_URL

const api = axios.create({
  baseURL: apiURL,
})

export { api }

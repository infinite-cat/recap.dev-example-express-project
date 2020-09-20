import fetch from 'node-fetch'

export class CatFactsService {
  async getFact() {
    const response = await fetch('https://cat-fact.herokuapp.com/facts')
    return response.json()
  }
}

export const catFactsService = new CatFactsService()

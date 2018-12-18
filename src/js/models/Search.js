import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    const proxy = 'http://cors-anywhere.herokuapp.com/';
    const key = '89aa1d84e87420f34a31e7e2255fecdc';
    try {
      const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
      this.result = res.data.recipes;
    } catch (error) {
      alert(error);
    }
  }
}

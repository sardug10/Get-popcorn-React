import axios from 'axios';

export default class Search {
    constructor(query, category) {
      this.query = query;
      this.category = category
    }
  
    async getResults() {

      try {
        const res = await axios(
          `https://api.themoviedb.org/3/search/${this.category}?query=${this.query}&api_key=c91d3d20007ff0c906df7ed5e6ca1e86&`
        );
        this.result = res.data.results;
        // console.log(this.result);
        return this.result
        //console.log(res.data.results);
      } catch (error) {
        console.log(error);
      }
    }
  }
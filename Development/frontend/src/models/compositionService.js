import axios from "axios";

export default class CompositionSearch {
  constructor(id,category) {
    this.id = id;
    this.category = category
  }

  async getDetails() {
    try {

      const res = await axios(
        `https://api.themoviedb.org/3/${this.category}/${this.id}?api_key=c91d3d20007ff0c906df7ed5e6ca1e86&`
      );
      this.result = res.data;
      // console.log(this.result);
      return this.result;
      
    } catch (error) {
      console.log(error);
    }
  }
}
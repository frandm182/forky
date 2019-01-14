import axios from 'axios';
import { key, proxy } from '../config';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
      const { title, publisher: author, image_url: img, source_url: url, ingredients } = res.data.recipe;
      this.author = author;
      this.title = title;
      this.img = img;
      this.url = url;
      this.ingredients = ingredients;

      console.log(this);
    } catch (error) {
      alert(error);
    }
  }

  calcTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;

  }

  calcServings() {
    this.servings = 4;
  }
}

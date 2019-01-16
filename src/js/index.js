import Search from './models/Search';
import Recipe from './models/Recipe';
import { elements, renderLoader, clearLoader, renderButtons } from './views/base';
import * as searchView from './views/searchView';

/** Global state
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {

};

// Search controller
const controlSearch = async () => {
  const query = searchView.getInput();
  if (query) {
    state.search = new Search(query);
    searchView.clearInput();
    searchView.clearResults();

    renderLoader(elements.searchRes);
    try {
      await state.search.getResults();
      clearLoader();  
      searchView.renderResults(state.search.result)
    } catch (error) {
      alert(error);
      clearLoader(); 
    }
    
  }

}

// Search events
elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});


// Recipe controller
const controlRecipe = async () => {
  const id = window.location.hash.replace('#', '');

  if (id) {
    state.recipe = new Recipe(id);

    try {
      await state.recipe.getRecipe();

      state.recipe.calcTime();
      state.recipe.calcServings();
  
      console.log(state.recipe);
    } catch (error) {
      alert(error);
    }
    

  }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
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

const controlSearch = async () => {
  const query = searchView.getInput();
  console.log(query)
  if (query) {
    state.search = new Search(query);
    searchView.clearInput();
    searchView.clearResults();

    renderLoader(elements.searchRes);

    await state.search.getResults();

    clearLoader();

    searchView.renderResults(state.search.result)
  }

}

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



const r = new Recipe('47746');
r.getRecipe();
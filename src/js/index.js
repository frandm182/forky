import Search from './models/Search';
import { elements } from './views/base';
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
    await state.search.getResults();

    searchView.renderResults(state.search.result)
  }

}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});


// search.getResults();

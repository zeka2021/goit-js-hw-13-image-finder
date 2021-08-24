import NewApiService from './apiService';
import cardImeges from '../templates/templates.hbs';
import refs from './refs';

const servise = new NewApiService();
console.log(service);

refs.searchForm.addEventListener('submit', imageSearchInputHandler);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

function imageSearchInputHandler(e) {

  e.preventDefault();

  const form = e.currentTarget;
  const input = form.elements.query;

  clearListItems();

  servise.resetPage();
  servise.searchQuery = input.value;

  servise.fethcArticles().then(hits => {
    const markup = buildListItemsTemplate(hits);
    iserListItems(markup);
  });
  input.value = '';
}

function loadMoreBtnHandler() {
  servise.fethcArticles().then(hits => {
    const markup = buildListItemsTemplate(hits);
    iserListItems(markup);
    window.scrollTo(0, 1000);
    window.scrollTo({
      top: 1000,
      behavior: 'smooth',
    });
  });
}
function iserListItems(items) {
  refs.gallery.insertAdjacentHTML('beforeend', items);
}
function buildListItemsTemplate(items) {
  return cardImeges(items);
}
function clearListItems() {
  refs.gallery.innerHTML = '';
}
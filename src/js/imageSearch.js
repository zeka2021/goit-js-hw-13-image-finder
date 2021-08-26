import NewApiService from './apiService';
import cardImeges from '../templates/templates.hbs';
import refs from './refs';
import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const servise = new NewApiService();

refs.searchForm.addEventListener('submit', imageSearchInputHandler);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

function imageSearchInputHandler(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const input = form.elements.query;

  clearListItems();

  servise.resetPage();
  servise.searchQuery = input.value;

  if (input.value === '') {
     return alert({
      text: "You must enter query parameters!"
    });
  }
  
  servise.fethcArticles().then(hits => {
    if (hits.length < 1) {
    alert({
      text: "You must enter query parameters!"
    });
return;
  }
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

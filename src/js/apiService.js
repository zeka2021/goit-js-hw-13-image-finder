const baseUrl = 'https://pixabay.com/api/';

export default class NewApiService{
  constructor() {
    this.page = 1;
      this.searchQuery = '';
}
 
   fethcArticles = async () => {
    const keyapi = `23014981-34d5a6a0e1a39309eb24c48f7`;
    const requestparams = `?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${keyapi}`;
    const res = await fetch(baseUrl + requestparams);
    const parseRes = await res.json();
    this.incrementPage();
    return parseRes.hits;
    // console.log(parseRes.hits);
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
};
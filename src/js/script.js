/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    templateOf: {
      booksList: '#template-book',
    },
    containerOf: {
      list: '.books-list',
      filters: '.filters',
    },
    bookTemp: {
      container: '.book',
      header: {
        title: '.book .book__name',
        price: '.book .product__base-price',
      },
      cover: {
        href: '.book__image',
        img: '.book__image img',
      },
      rating: '.book book__rating__fill',
      favorite: 'favorite',
      hidden: 'hidden',
    },
  };

  const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML)
  };  

  let favoriteBooks = [];
  let filters = [];
  let shouldBeHidden = '';

  class BooksList {
    constructor() {
      const thisApp = this;
      thisApp.initData();
      thisApp.render();
      thisApp.initActions();
      thisApp.determineRatingBgc();
      thisApp.filterBooks();  
    }
  
    initData() {
      const thisApp = this;
      thisApp.data  = dataSource;  
    }

    render(){
      const thisApp = this;
      const books = thisApp.data.books;
      for (let book of books) {
        const ratingWidth = book.rating * 10;
        const bookHTMLData = {name: book.name, price: book.price, id: book.id, image: book.image, rating: book.rating, ratingBgc: thisApp.determineRatingBgc(ratingWidth), ratingWidth: ratingWidth};
        const generatedHTML = templates.templateBook(bookHTMLData);
        thisApp.element = utils.createDOMFromHTML(generatedHTML);
        const booksContainerList = document.querySelector(select.containerOf.list);
        booksContainerList.appendChild(thisApp.element);
  
      }
    }
  
    initActions() {
      const thisApp = this;
      document.querySelector(select.containerOf.list).addEventListener('dblclick', function(event) {
        if(event.target.offsetParent.classList.contains('book__image')) {
          const bookHREF = event.target.offsetParent;
          bookHREF.id = bookHREF.getAttribute('data-id');
          if (favoriteBooks.includes(bookHREF.id)) {
            bookHREF.classList.remove(select.bookTemp.favorite);
            favoriteBooks = favoriteBooks.filter(function(e) {
              return e !== bookHREF.id;
            });
          }
          else {
            favoriteBooks.push(bookHREF.id);
            bookHREF.classList.add(select.bookTemp.favorite);
          }
        }
      }); 
  
      document.querySelector(select.containerOf.filters).addEventListener('click', function(event) {
        if(event.target.tagName == 'INPUT' && event.target.name == 'filter' && event.target.type == 'checkbox'){
          if (event.target.checked === false){
            filters = filters.filter(function(e) {
              return e !== event.target.value;
            });
          }
          if (event.target.checked === true){
            filters.push(event.target.value);
          }
          thisApp.filterBooks();
        }
      });
    }
  
    filterBooks() {
      const thisApp = this;
      const books = thisApp.data.books;
      for (const book of books) { 
        const bookId = book.id;
        const bookFilterSelector = document.querySelector('[data-id="' + bookId + '"]');
        for (const filter of filters) {
          if (book.details[filter] === true){
            shouldBeHidden = true;
            break;
          }
          if (book.details[filter] === false){
            shouldBeHidden = false;
          }
        }
        if (shouldBeHidden === true) {
          bookFilterSelector.classList.add(select.bookTemp.hidden);
        }
        if (shouldBeHidden === false) {
          bookFilterSelector.classList.remove(select.bookTemp.hidden);
        }
        console.log(filters);
      }
    }
  
    determineRatingBgc(ratingWidth) {
      let ratingColor = '';
      console.log('ratingWidth', ratingWidth);
      if (ratingWidth > 90) {
        ratingColor = '#C090A6';
      }
      else if (ratingWidth > 80 && ratingWidth <= 90) {
        ratingColor = '#96D3D7';
      }
      else if (ratingWidth > 70 && ratingWidth <= 80) {
        ratingColor = '#DFE5C6';
      }
      else if (ratingWidth > 60 && ratingWidth <= 70) {
        ratingColor = '#FCCBC5';
      }
      else  {
        ratingColor = '#F49B99';
      } 
      let ratingBGC = 'linear-gradient(to bottom, ' + ratingColor + ' 0%, ' + ratingColor + ' ' + ratingWidth + '%)';
      ratingBGC = ratingBGC.toString();
      return ratingBGC;
    }
  }
  
  const app = {
    init(){
      console.log('*** App starting ***');
      new BooksList();
    }
  };

  app.init();
}

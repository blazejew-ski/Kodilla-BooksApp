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

  // global

  const thisApp = this;
  thisApp.data  = dataSource;
  const books = thisApp.data.books;
 
  // rednering books

  function render(){
    
    for (let book of books) {

      const ratingWidth = book.rating * 10;

      const bookHTMLData = {name: book.name, price: book.price, id: book.id, image: book.image, rating: book.rating, ratingBgc: determineRatingBGC(ratingWidth), ratingWidth: ratingWidth};

      const generatedHTML = templates.templateBook(bookHTMLData);
      thisApp.element = utils.createDOMFromHTML(generatedHTML);
      const booksContainerList = document.querySelector(select.containerOf.list);
      booksContainerList.appendChild(thisApp.element);

    }
  }

  render();

  //adding favorites

  let favoriteBooks = [];

  function initActions() {    
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
      if(event.target.tagName == 'LABEL' && event.target.firstElementChild.value == 'adults'){
        if (event.target.firstElementChild.checked === true){
          filters = filters.filter(function(e) {
            return e !== event.target.firstElementChild.value;
          });
        }
        if (event.target.firstElementChild.checked === false){
          filters.push(event.target.firstElementChild.value);
        }
        filterbooks();
      }
      if(event.target.tagName == 'LABEL' && event.target.firstElementChild.value == 'nonFiction'){
        if (event.target.firstElementChild.checked === true){
          filters = filters.filter(function(e) {
            return e !== event.target.firstElementChild.value;
          });
        }
        if (event.target.firstElementChild.checked === false){
          filters.push(event.target.firstElementChild.value);
        }
        filterbooks();
      }
    });
  }

  initActions();

  // filters 

  let filters = [];

  function filterbooks() {
    for (book of books) {
      let shouldBeHidden = false;
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

  function determineRatingBGC(ratingWidth) {
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


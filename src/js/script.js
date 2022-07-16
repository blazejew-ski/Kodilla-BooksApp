/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    templateOf: {
      booksList: '#template-book',
    },
    containerOf: {
      list: '.books-list',
    },
    book: {
      container: '.book',
      header: {
        title: '.book .book__name',
        price: '.book product__base-price',
      },
      cover: {
        img: '.book book__image img',
      },
      rating: '.book book__rating__fill'
    }
  };

  const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML)
  };  

  function render(){
    const thisApp = this;
    thisApp.data  = dataSource;
    console.log('.thisApp.data', thisApp.data);
    const books = thisApp.data.books;

    for (let book of books) {

      const bookHTMLData = {name: book.name, price: book.price, id: book.id, image: book.image, rating: book.rating}

      const generatedHTML = templates.templateBook(bookHTMLData);
      thisApp.element = utils.createDOMFromHTML(generatedHTML);
      const booksContainerList = document.querySelector(select.containerOf.list);
      booksContainerList.appendChild(thisApp.element);

    }
  }

  render();










}



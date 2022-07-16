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
    }
  };

  const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML)
  };  

  // global

  const thisApp = this;
  thisApp.data  = dataSource;
  console.log('.thisApp.data', thisApp.data);
  const books = thisApp.data.books;
 
  // rednering books

  function render(){
    
    for (let book of books) {

      const bookHTMLData = {name: book.name, price: book.price, id: book.id, image: book.image, rating: book.rating};

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
        console.log('bookHREF.id:', bookHREF.id);
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
        console.log('favoriteBooks:', favoriteBooks);
      }
    }); 
  }

  initActions();

}



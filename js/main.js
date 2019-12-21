let table = document.getElementById('pagination');
let prevPageButton = document.querySelector('.pagination__item-prev');
let nextPageButton = document.querySelector('.pagination__item-next');
let currentPage = document.querySelector('.pagination__item-active');
let sortBtn = document.querySelector('.pagination__sort-button');
let url = `https://rickandmortyapi.com/api/character/?page=1`;
getPagination(url);
async function getPagination(url){
   let response = await fetch(url);
   let responseJson = await response.json();
   let prevPageUrl = responseJson.info.prev || null;
   let nextPageUrl = responseJson.info.next || null;
   let characters = responseJson.results;
   let pages = responseJson.info.pages;
   let numberCurrentPage = url.match(/\d+/g)[0];
   let currentUrl = url;
   getCharacters(characters);
   sortBtn.addEventListener('click', e => {
      characters = characters.sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0));
      table.innerHTML = '';
      getCharacters(characters);
   });  
   currentPage.textContent = `Current Page ${numberCurrentPage}`;
   nextPageButton.addEventListener('click', e => {
      if (pages > numberCurrentPage){
         currentPage.textContent = `Current Page ${++numberCurrentPage}`;
         f(nextPageUrl);
      }      
   });
   prevPageButton.addEventListener('click', e => {
      if (1 < numberCurrentPage){
         currentPage.textContent = `Current Page ${--numberCurrentPage}`;
         f(prevPageUrl);
      }  
   });
   async function f(url){
      response = await fetch(url);
      responseJson = await response.json();
      characters = responseJson.results;
      prevPageUrl = responseJson.info.prev || null;
      nextPageUrl = responseJson.info.next || null;
      table.innerHTML = '';
      getCharacters(characters);    
   }
}

function getCharacters(characters){
   characters.forEach(character => {
      let name = character.name;
      let imageLink = character.image;
      createRowBlock(name, imageLink);
   });      
}

function createRowBlock(name, imageLink){
   let row = document.createElement('tr');
   let img = document.createElement('img');
   [img.src, img.alt] = [imageLink, name];
   let imageCol = document.createElement('td');
   imageCol.append(img); 
   let nameCol = document.createElement('td');
   nameCol.textContent = name;
   row.append(imageCol, nameCol);
   table.append(row);
}


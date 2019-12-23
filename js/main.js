let table = document.getElementById('pagination'),
    modal = document.querySelector('.modal'),
    modalContainer = document.querySelector('.modal-container'),
    closeModal = document.querySelector('.modal-container__close'),
    prevPageButton = document.querySelector('.pagination__item-prev'),
    nextPageButton = document.querySelector('.pagination__item-next'),
    currentPage = document.querySelector('.pagination__item-active'),
    sortBtn = document.querySelector('.pagination__sort-button'),
    url = `https://rickandmortyapi.com/api/character/?page=1`;

getPagination(url);

async function getPagination(url){
   let response = await fetch(url);
   let responseJson = await response.json();
   let [prevPageUrl, nextPageUrl] = [responseJson.info.prev || null, responseJson.info.next || null];
   let characters = responseJson.results,
       pages = responseJson.info.pages,
       numberCurrentPage = url.match(/\d+/g)[0],
       currentUrl = url;
   currentPage.textContent = `Current Page ${numberCurrentPage}`;
   getCharacters(characters);

   sortBtn.addEventListener('click', e => {
      characters = characters.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
      table.innerHTML = '';
      getCharacters(characters);
   });  
   
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
   characters.forEach(character => createRowBlock(character.name, character.image, character));      
}

function createRowBlock(name, imageLink, character){
   let [row, img] = [document.createElement('tr'), document.createElement('img')];
   [img.src, img.alt] = [imageLink, name];
   img.addEventListener('click', () => createModal(character));
   let [imageCol, nameCol] = [document.createElement('td'), document.createElement('td')]
   imageCol.append(img); 
   nameCol.textContent = name;
   row.append(imageCol, nameCol);
   table.append(row);
}

function createModal(obj){
   if (modalContainer.lastChild.tagName === 'DIV') modalContainer.lastChild.remove();
   let container = document.createElement('div');
   container.classList.add('modal-content');
   let image = document.createElement('img');
   [image.src, image.alt] = [obj.image, obj.name];
   let modalInfo = document.createElement('div');
   modalInfo.classList.add('modal-content__info');
   let title = document.createElement('h4');
   title.textContent = obj.name;
   modalInfo.append(title);
   let info = ['status', 'species', 'gender'];
   for (let i = 0; i < info.length; i++){
      let p = document.createElement('p');
      p.textContent = `${info[i]}: ${obj[info[i]]}`;
      modalInfo.append(p);
   }
   container.append(image);
   container.append(modalInfo);
   modalContainer.append(container);
   modal.style.display = 'block';
}

window.addEventListener('click', e => {
   if (e.target == modal) modal.style.display = 'none';
});
closeModal.addEventListener('click', () => modal.style.display = 'none');




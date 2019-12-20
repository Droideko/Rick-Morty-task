let table = document.getElementById('pagination');
let lists = document.querySelectorAll('.pagination__item');
let sortBtn = document.querySelector('.pagination__sort-button');
const url = `https://rickandmortyapi.com/api/character/`
async function getPagination(url){
   let response = await fetch(url);
   let responseJson = await response.json();
   let nextPage = responseJson.info.next;
   let characters = responseJson.results;
   getCharacters(characters);
   sortBtn.addEventListener('click', e => {
      characters = characters.sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0));
      table.innerHTML = '';
      getCharacters(characters);
   });
}
getPagination(url);




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


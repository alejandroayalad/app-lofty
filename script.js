const API_URL = 'http://localhost:4010/api/pets'; 

let pets = [];
let currentIndex = 0;

const cardContainer = document.getElementById('card-container');
const likeButton = document.getElementById('like-button');
const dislikeButton = document.getElementById('dislike-button');


async function loadPets() {
  try {
    const response = await fetch(API_URL); 
    pets = await response.json();        
    displayCard();                        
  } catch (error) {
    console.error("Error loading pets:", error); 
  }
}


function displayCard() {
  if (currentIndex >= pets.length) {
   
    cardContainer.innerHTML = '<p>No hay mascotas martín!!!</p>';
    return;
  }


  const pet = pets[currentIndex];
  cardContainer.innerHTML = `
    <div class="card">
      <img src="${pet.image}" alt="${pet.name}">
      <h3>${pet.name}</h3>
      <p>${pet.species}, ${pet.age}</p>
      <p>${pet.description}</p>
    </div>
  `;
}


likeButton.addEventListener('click', () => {
  currentIndex++; 
  displayCard();  
});


dislikeButton.addEventListener('click', () => {
  currentIndex++;
  displayCard();  
});


loadPets();
const API_URL = 'http://localhost:4010/api/pets'; // Endpoint del backend para obtener los datos

let pets = [];
let currentIndex = 0;

const cardContainer = document.getElementById('card-container');
const likeButton = document.getElementById('like-button');
const dislikeButton = document.getElementById('dislike-button');

// Función para cargar los datos de las mascotas
async function loadPets() {
  try {
    const response = await fetch(API_URL); // Fetch al API
    pets = await response.json();         // Parseamos el JSON de respuesta
    displayCard();                        // Mostramos la primera tarjeta
  } catch (error) {
    console.error("Error loading pets:", error); // Mostramos el error en caso de fallo
  }
}

// Función para mostrar una tarjeta de mascota
function displayCard() {
  if (currentIndex >= pets.length) {
    // Si no hay más mascotas, mostramos un mensaje
    cardContainer.innerHTML = '<p>No more pets to show!</p>';
    return;
  }

  // Mostramos la mascota actual
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

// Evento para cuando el usuario da "Me gusta"
likeButton.addEventListener('click', () => {
  currentIndex++; // Avanzamos al siguiente índice
  displayCard();  // Mostramos la siguiente tarjeta
});

// Evento para cuando el usuario da "No me gusta"
dislikeButton.addEventListener('click', () => {
  currentIndex++; // Avanzamos al siguiente índice
  displayCard();  // Mostramos la siguiente tarjeta
});

// Cargamos las mascotas al iniciar
loadPets();
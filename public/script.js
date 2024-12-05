const API_URL = 'https://app-lofty-9c44d4f31c3c.herokuapp.com/api/pets'; 

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
    enableSwipe(); 
  } catch (error) {
    console.error("Error loading pets:", error); 
  }
}

function displayCard() {
  if (currentIndex >= pets.length) {
    cardContainer.innerHTML = '<div class="errmess"><p>¡No quedan mascotas!</p></div>';
    return;
  }

  const pet = pets[currentIndex];
  cardContainer.innerHTML = `
    <div class="card">
      <img src="${pet.image}" alt="${pet.name}">
      <h3>${pet.name}</h3>
      <p>• ${pet.species} <br> • ${pet.race} <br> • ${pet.age} <br> • Vacunas: ${pet.vaccines} <br> • ${pet.description}</p> 
    </div>
  `;
  enableSwipe(); 
}

function enableSwipe() {
  const card = document.querySelector('.card');
  let startX, currentX;
  let isDragging = false;

  const onDragStart = (e) => {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    card.style.transition = 'none';
  };

  const onDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault(); 
    currentX = (e.type.includes('mouse') ? e.clientX : e.touches[0].clientX) - startX;
    const rotation = currentX / 20;
    card.style.transform = `translateX(${currentX}px) rotate(${rotation}deg)`;
  };

  const onDragEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    card.style.transition = 'transform 0.3s ease';

    if (currentX > 100) {
      card.style.transform = 'translateX(300px) rotate(30deg)';
      setTimeout(() => {
        currentIndex++;
        displayCard();
      }, 300);
    } else if (currentX < -100) {
      card.style.transform = 'translateX(-300px) rotate(-30deg)';
      setTimeout(() => {
        currentIndex++;
        displayCard();
      }, 300);
    } else {
      card.style.transform = '';
    }
    startX = null;
    currentX = 0;
  };

  card.addEventListener('mousedown', onDragStart);
  document.addEventListener('mousemove', onDragMove);
  document.addEventListener('mouseup', onDragEnd);

  card.addEventListener('touchstart', onDragStart);
  card.addEventListener('touchmove', onDragMove);
  card.addEventListener('touchend', onDragEnd);

  card.addEventListener('dragstart', (e) => e.preventDefault());
}

likeButton.addEventListener('click', () => {
  const card = document.querySelector('.card');
  card.style.transition = 'transform 0.3s ease';
  card.style.transform = 'translateX(300px) rotate(30deg)';
  setTimeout(() => {
    currentIndex++; 
    displayCard();  
  }, 300);
});

dislikeButton.addEventListener('click', () => {
  const card = document.querySelector('.card');
  card.style.transition = 'transform 0.3s ease';
  card.style.transform = 'translateX(-300px) rotate(-30deg)';
  setTimeout(() => {
    currentIndex++;
    displayCard();  
  }, 300);
});

loadPets();
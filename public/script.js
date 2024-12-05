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
    cardContainer.innerHTML = '<div class="errmess"><p>¡No quedan mascotas Martín!</p></div>';
    return;
  }

  const pet = pets[currentIndex];
  cardContainer.innerHTML = `
    <div class="card">
      <img src="${pet.image}" alt="${pet.name}">
      <h3>${pet.name}</h3>
      <p>• ${pet.species} <br> • ${pet.race} <br> • ${pet.age} <br> • Vacunas: ${pet.vaccines} <br> • ${pet.description}</p> 
      <div class="swipe-indicator like-indicator">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
      </div>
      <div class="swipe-indicator dislike-indicator">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </div>
    </div>
  `;
  enableSwipe();
}

function enableSwipe() {
  const card = document.querySelector('.card');
  const likeIndicator = card.querySelector('.like-indicator');
  const dislikeIndicator = card.querySelector('.dislike-indicator');
  let startX, currentX;
  let isDragging = false;

  const onDragStart = (e) => {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    card.style.transition = 'none';
    likeIndicator.style.transition = 'none';
    dislikeIndicator.style.transition = 'none';
  };

  const onDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault(); 
    currentX = (e.type.includes('mouse') ? e.clientX : e.touches[0].clientX) - startX;
    const rotation = currentX / 20;
    const opacity = Math.min(Math.abs(currentX) / 100, 1);
    card.style.transform = `translateX(${currentX}px) rotate(${rotation}deg)`;
    
    if (currentX > 0) {
      likeIndicator.style.opacity = opacity;
      dislikeIndicator.style.opacity = 0;
    } else {
      dislikeIndicator.style.opacity = opacity;
      likeIndicator.style.opacity = 0;
    }
  };

  const onDragEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    card.style.transition = 'transform 0.3s ease';
    likeIndicator.style.transition = 'opacity 0.3s ease';
    dislikeIndicator.style.transition = 'opacity 0.3s ease';

    if (currentX > 100) {
      card.style.transform = 'translateX(300px) rotate(30deg)';
      likeIndicator.style.opacity = 1;
      setTimeout(() => {
        currentIndex++;
        displayCard();
      }, 300);
    } else if (currentX < -100) {
      card.style.transform = 'translateX(-300px) rotate(-30deg)';
      dislikeIndicator.style.opacity = 1;
      setTimeout(() => {
        currentIndex++;
        displayCard();
      }, 300);
    } else {
      card.style.transform = '';
      likeIndicator.style.opacity = 0;
      dislikeIndicator.style.opacity = 0;
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
  const likeIndicator = card.querySelector('.like-indicator');
  card.style.transition = 'transform 0.3s ease';
  likeIndicator.style.transition = 'opacity 0.3s ease';
  card.style.transform = 'translateX(300px) rotate(30deg)';
  likeIndicator.style.opacity = 1;
  setTimeout(() => {
    currentIndex++; 
    displayCard();  
  }, 300);
});

dislikeButton.addEventListener('click', () => {
  const card = document.querySelector('.card');
  const dislikeIndicator = card.querySelector('.dislike-indicator');
  card.style.transition = 'transform 0.3s ease';
  dislikeIndicator.style.transition = 'opacity 0.3s ease';
  card.style.transform = 'translateX(-300px) rotate(-30deg)';
  dislikeIndicator.style.opacity = 1;
  setTimeout(() => {
    currentIndex++;
    displayCard();  
  }, 300);
});

loadPets();


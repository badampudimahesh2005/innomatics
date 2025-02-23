const menu = document.getElementById('menu');
const gameContainer = document.getElementById('game-container');
const gameBoard = document.getElementById('game-board');
const timeDisplay = document.getElementById('time');
const movesDisplay = document.getElementById('moves');
const restartButton = document.getElementById('restart');
const backButton = document.getElementById('back');



const overlay = document.getElementById('overlay');
const finalTime = document.getElementById('finalTime');
const finalMoves = document.getElementById('finalMoves');
const playAgainButton = document.getElementById('playAgain');

let flipSound = new Audio('sounds/card-flip.mp3');
let matchSound = new Audio('sounds/correctSound.mp3');
let gameOverSound = new Audio('sounds/winSound.wav');

let categories = {
    fruits: ['🍎', '🍊', '🍋', '🍉', '🍇', '🍓', '🍒', '🥝',],
    vegetables: ['🥕', '🍆', '🌽', '🥦', '🧅', '🍅', '🥒','🫑'],
    animals: ['🐶', '🐱', '🐭', '🐰', '🦁', '🐯', '🐸', '🐵',],
    emojis: ['😀', '😂', '😎', '😍', '🤩', '😡', '😱','🤡']
};

let selectedCategory = [];
let cards = [];
let flippedCards = [];
let matchedCards = [];
let moves = 0;
let time = 0;
let timer;

function showOverlay() {
    finalTime.textContent = time;
    finalMoves.textContent = moves;
    overlay.style.display = 'flex';
}

document.querySelectorAll('.category').forEach(button => {
    button.addEventListener('click', () => {
        selectedCategory = [...categories[button.dataset.category], ...categories[button.dataset.category]];
        startGame();
    });
});

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startGame() {
    menu.classList.add('hidden');
    overlay.style.display = 'none';
    gameContainer.classList.remove('hidden');

    gameBoard.innerHTML = '';
    moves = 0;
    time = 0;
    matchedCards = [];
    flippedCards = [];
    clearInterval(timer);
    timeDisplay.textContent = time;
    movesDisplay.textContent = moves;

    shuffle(selectedCategory);
    cards = selectedCategory.map(image => createCard(image));
    cards.forEach(card => gameBoard.appendChild(card));

    timer = setInterval(() => {
        time++;
        timeDisplay.textContent = time;
    }, 1000);
}

function createCard(image) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');
    
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.textContent = '❓';

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.textContent = image;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener('click', () => onCardClick(card));
    return card;
}

function onCardClick(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flipSound.play();
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            moves++;
            movesDisplay.textContent = moves;
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    const image1 = card1.querySelector('.card-back').textContent;
    const image2 = card2.querySelector('.card-back').textContent;

    if (image1 === image2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchSound.play();

        matchedCards.push(card1, card2);
        flippedCards = [];

        if (matchedCards.length === cards.length) {
            clearInterval(timer);
            gameOverSound.play();
            setTimeout(showOverlay, 300);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

restartButton.addEventListener('click', startGame);

playAgainButton.addEventListener('click', () => {
    overlay.style.display = 'none';
    gameContainer.classList.add('hidden');
    menu.classList.remove('hidden');
}
);
backButton.addEventListener('click', () => {
    menu.classList.remove('hidden');
    gameContainer.classList.add('hidden');
});

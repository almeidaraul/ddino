const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

const jumpDelta = 20;
const highestPosition = 150;
const intervalTime = 20;
const jumpKeyCodes = [32, 38]; //space, arrow up
const cactusStartPosition = 1000;
const cactusDelta = 10;

let isJumping = false;
let isGameOver = false;
let position = 0;

const handleKeyUp = (event) => {
	if (jumpKeyCodes.includes(event.keyCode) && (!isJumping))
		jump();
}

const updateDinoPosition = (delta) => {
	position += delta;
	dino.style.bottom = position + 'px';
}

const jump = () => {
	isJumping = true;
	let upInterval = setInterval(() => {
		if (position >= highestPosition) {
			clearInterval(upInterval);
			let downInterval = setInterval(() => {
				if (position <= 0) {
					clearInterval(downInterval);
					isJumping = false;
				} else {
					updateDinoPosition(-jumpDelta);
				}
			}, intervalTime);
		} else {
			updateDinoPosition(jumpDelta);
		}
	}, intervalTime);
}

const endGame = () => {
	isGameOver = true;
	document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
}

const createCactus = () => {
	const cactus = document.createElement('div');
	let cactusPosition = cactusStartPosition;
	//o max evita que 2 cactos spawnem juntos
	let randomTime = Math.max(2000, Math.random() * 6000);

	if (isGameOver) return;

	cactus.classList.add('cactus');
	background.appendChild(cactus);
	cactus.style.left = cactusPosition + 'px';

	let leftTimer = setInterval(() => {
		if (cactusPosition < -60) {
			clearInterval(leftTimer);
			background.removeChild(cactus);
		} else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
			clearInterval(leftTimer);
			endGame();
		} else {
			cactusPosition -= cactusDelta;
			cactus.style.left = cactusPosition + 'px';
		}
	}, intervalTime);

	setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);

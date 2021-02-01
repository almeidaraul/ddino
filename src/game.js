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

const getBackground = () => {
	return document.getElementsByClassName("background")[0];
}

const getGameOverMsg = () => {
	return document.getElementsByClassName("game-over")[0];
}

const startGame = () => {
	let background = getBackground();
	let gameOverMsg = getGameOverMsg();
	var cactuses = document.getElementsByClassName('cactus');

	while(cactuses[0]) {
			cactuses[0].parentNode.removeChild(cactuses[0]);
	}

	background.className = background.className.split(' ')[0] + " show";
	gameOverMsg.className = gameOverMsg.className.split(' ')[0] + " hide";
	isGameOver = false;
	createCactus();
}

const endGame = () => {
	let background = getBackground();
	let gameOverMsg = getGameOverMsg();
	background.className = background.className.split(' ')[0] + " hide";
	gameOverMsg.className = gameOverMsg.className.split(' ')[0] + " show";
	isGameOver = true;
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

startGame();
document.addEventListener('keyup', handleKeyUp);
document.getElementById("restartButton").addEventListener("click", startGame, false);

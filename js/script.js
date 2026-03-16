document.addEventListener('DOMContentLoaded', function() {
    const jogador = document.querySelector('.jogador');
    const timerEl = document.querySelector('.timer');
    const gameBoard = document.querySelector('.game-board');
    const pauseOverlay = document.querySelector('.pause-overlay');

    let posX = 50; // porcentagem da largura da tela
    let direction = null; // 'left' ou 'right'
    let moving = false;
    let moveInterval;

    const speed = 0.3; // velocidade de movimento em %

    let secondsPassed = 0;
    let timerInterval;

    let isPaused = false;

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        const pad = (n) => String(n).padStart(2, '0');
        return `${pad(minutes)}:${pad(secs)}`;
    }

    function startTimer() {
        timerEl.textContent = "TIMER: " + formatTime(secondsPassed);
        timerInterval = setInterval(() => {
            secondsPassed += 1;
            timerEl.textContent = "TIMER: " + formatTime(secondsPassed);
        }, 1000);
    }

    function pauseGame() {
        isPaused = true;
        clearInterval(moveInterval);
        clearInterval(timerInterval);
        gameBoard.classList.add('paused');
        pauseOverlay.style.display = 'flex';
        moving = false;
        direction = null;
        // Para GIF, volta para PNG
        if (jogador.src.includes('gif')) {
            const dir = jogador.src.includes('left') ? 'left' : 'right';
            jogador.src = `/Mario_invaders-/img/mario-${dir}.png`;
        }
    }

    function resumeGame() {
        isPaused = false;
        clearInterval(timerInterval);
        startTimer();
        gameBoard.classList.remove('paused');
        pauseOverlay.style.display = 'none';
    }

    function togglePause() {
        if (isPaused) {
            resumeGame();
        } else {
            pauseGame();
        }
    }

    startTimer();

    function updatePosition() {
        if (direction === 'left' && posX > 0) {
            posX -= speed;
        } else if (direction === 'right' && posX < 100) {
            posX += speed;
        }
        jogador.style.left = posX + '%';
    }

    function startMoving(dir) {
        if (moving && direction === dir) return;
        direction = dir;
        moving = true;
        clearInterval(moveInterval);
        moveInterval = setInterval(updatePosition, 16); // ~60fps
        // Muda para GIF
        jogador.src = `/Mario_invaders-/img/mario-${dir}.gif`;
    }

    function stopMoving() {
        moving = false;
        clearInterval(moveInterval);
        // Muda para PNG baseado na última direção
        if (direction) {
            jogador.src = `/Mario_invaders-/img/mario-${direction}.png`;
        }
    }

    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            event.preventDefault();
            togglePause();
            return;
        }
        if (isPaused) return;

        if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
            startMoving('left');
        } else if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
            startMoving('right');
        }
    });

    document.addEventListener('keyup', function(event) {
        if (isPaused) return;

        if ((event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') && direction === 'left') {
            stopMoving();
        } else if ((event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') && direction === 'right') {
            stopMoving();
        }
    });
});

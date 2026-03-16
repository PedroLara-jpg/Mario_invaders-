document.addEventListener('DOMContentLoaded', function() {
    const jogador = document.querySelector('.jogador');
    let posX = 50; // porcentagem da largura da tela
    let direction = null; // 'left' ou 'right'
    let moving = false;
    let moveInterval;

    const speed = 0.3; // velocidade de movimento em %

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
        if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
            startMoving('left');
        } else if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
            startMoving('right');
        }
    });

    document.addEventListener('keyup', function(event) {
        if ((event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') && direction === 'left') {
            stopMoving();
        } else if ((event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') && direction === 'right') {
            stopMoving();
        }
    });
});

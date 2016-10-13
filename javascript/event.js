
function playerEvent(event) {
    switch (event.key) {
        case "ArrowLeft":
            playerMove(-1, 0,event.key);
            break;
        case "ArrowUp":
            playerMove(0, -1,event.key);
            break;
        case "ArrowRight":
            playerMove(1, 0,event.key);
            break;
        case "ArrowDown":
            playerMove(0, 1,event.key);
            break;
    }
}

function playerMove(x, y,status) {
    if (!canMove(x, y)) {
        return;
    };
    player.gotoAndPlay(status);
    playerInfo.position.x += x;
    playerInfo.position.y += y;
    player.x = playerInfo.position.x * imgCellWidth;
    player.y = playerInfo.position.y * imgCellHeight;
}

function canMove(x, y) {
    var tempX = playerInfo.position.x + x,
        tempY = playerInfo.position.y + y;
    if (tempX < 0 || tempY < 0) {
        return false;
    }
    if(!senceData.map[tempY][tempX]){
        return false;
    }
    if (senceData.map[tempY][tempX] !== 2) {
        return false;
    }
    return true;
}
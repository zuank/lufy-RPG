function playerEvent(event) {
    switch (event.key) {
        case "ArrowLeft":
            playerMove(-1, 0, event.key);
            break;
        case "ArrowUp":
            playerMove(0, -1, event.key);
            break;
        case "ArrowRight":
            playerMove(1, 0, event.key);
            break;
        case "ArrowDown":
            playerMove(0, 1, event.key);
            break;
    }
}

function playerMove(x, y, status) {
    if (!canMove(x, y)) {
        return;
    };
    player.gotoAndPlay(status);
    globalData.playerInfo.position.x += x;
    globalData.playerInfo.position.y += y;
    player.x = globalData.playerInfo.position.x * imgCellWidth;
    player.y = globalData.playerInfo.position.y * imgCellHeight;
}

function canMove(x, y) {
    var tempX = globalData.playerInfo.position.x + x,
        tempY = globalData.playerInfo.position.y + y;
    //限制行动区域
    if (tempX < 0 || tempY < 0 || tempY >= globalData.mapRow || tempX >= globalData.mapCol) {
        return false;
    }
    //撞墙检测
    if (senceData.map[tempY][tempX] !== 2) {
        return false;
    }
    //碰撞npc
    return collideCharacter();

    function collideCharacter() {
        for (var i = 0, j = 0; i < senceData.character.length; i++) {
            if (senceData.character[i].show) {
                j++;
            }
            if (tempX == senceData.character[i].position.x && tempY == senceData.character[i].position.y && senceData.character[i].show) {
                var Chara = senceData.character[i];
                switch (Chara.type) {
                    case "npc":
                        return false;
                    case "monster":
                        return killMonster(j-1); // j-1 因为j++ 才表示当前
                }
            }
        }
        return true;
    }
}

function killMonster(i) {
    layers.chara.removeChild(layers.chara.childList[i]);
    senceData.character[i].show = false;
    return true;
}
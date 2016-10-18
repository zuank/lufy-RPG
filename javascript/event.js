function playerEvent(event) {
    switch (event.keyCode) {
        case 37:
            playerMove(-1, 0, "ArrowLeft");
            break;
        case 38:
            playerMove(0, -1, "ArrowUp");
            break;
        case 39:
            playerMove(1, 0, "ArrowRight");
            break;
        case 40:
            playerMove(0, 1, "ArrowDown");
            break;
    }
}
//移动角色并做相应的操作
function playerMove(x, y, status) {
    var charaInfo = canMove(x, y);

    if (charaInfo === false) {
        return;
    };

    if (charaInfo.chara === "monster") {
        if (charaInfo.move === true) {
            layers.chara.removeChild(layers.chara.childList[charaInfo.index]);
            senceData.character[charaInfo.index].show = false;
            LEvent.removeEventListener(window, LKeyboardEvent.KEY_DOWN, playerEvent);
            var timer = new LTimer(1000, 1);
            timer.addEventListener(LTimerEvent.TIMER, function () {
                LEvent.addEventListener(window, LKeyboardEvent.KEY_DOWN, playerEvent);
            });
            timer.start();
        }
        if (charaInfo.move === false) {
            return;
        }
    }

    player.gotoAndPlay(status);
    globalData.playerInfo.position.x += x;
    globalData.playerInfo.position.y += y;
    player.x = globalData.playerInfo.position.x * imgCellWidth;
    player.y = globalData.playerInfo.position.y * imgCellHeight;
}
//判断是否可以移动
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
    for (var i = 0, j = 0; i < senceData.character.length; i++) {
        if (senceData.character[i].show) {
            j++;
        }
        if (tempX == senceData.character[i].position.x && tempY == senceData.character[i].position.y && senceData.character[i].show) {
            var Chara = senceData.character[i];
            switch (Chara.type) {
                case "npc":
                    return {
                        chara: "npc",
                        move: false
                    };
                case "monster":
                    return killMonster(j - 1); // j-1 因为j++ 才表示当前
            }
        }
    }
    return true;
}
//不能杀死的怪物 角色不能移动
function killMonster(i) {
    return {
        chara: "monster",
        move: true,
        index: i
    };
}
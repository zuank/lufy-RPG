//移动角色并做相应的操作
var playerMove=function(x, y, status,player,playPosition,senceData,imgCellWidth,imgCellHeight) {
    console.log(playPosition);
    var charaInfo = canMove(x, y,playPosition,senceData);

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
    playPosition.x += x;
    playPosition.y += y;
    player.x = playPosition.x * imgCellWidth;
    player.y = playPosition.y * imgCellHeight;
}
//判断是否可以移动
function canMove(x, y,playPosition,senceData) {
    var tempX = playPosition.x + x,
        tempY = playPosition.y + y;
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

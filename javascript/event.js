//移动角色并做相应的操作
var playerMove = function (x, y, status) {
    var moveInfo = canMove(x, y);
    console.log(moveInfo)
    if (moveInfo === false) {
        return;
    }
    if (moveInfo.type === 'goods') {
        switch (moveInfo.goodsType) {
            case 'upFloor':
                globalData.floor++;
                drawInit();
                return; /*不执行之后的运动操作*/
                break;
            case 'downFloor':
                globalData.floor--;
                drawInit();
                return; /*不执行之后的运动操作*/
                break;
        }
    }
    // if (charaInfo.chara === "monster") {
    //     if (charaInfo.move === true) {
    //         layers.chara.removeChild(layers.chara.childList[charaInfo.index]);
    //         senceData.character[charaInfo.index].show = false;
    //         LEvent.removeEventListener(window, LKeyboardEvent.KEY_DOWN, playerEvent);
    //         var timer = new LTimer(1000, 1);
    //         timer.addEventListener(LTimerEvent.TIMER, function () {
    //             LEvent.addEventListener(window, LKeyboardEvent.KEY_DOWN, playerEvent);
    //         });
    //         timer.start();
    //     }
    //     if (charaInfo.move === false) {
    //         return;
    //     }
    // }
    // npc的话可以进行转向但是不能移动
    player.gotoAndPlay(status);
    globalData.playerInfo.status = status
    // if (charaInfo.chara === 'floor') {
    //     globalData.floor += charaInfo.floorType
    //     console.log(globalData.floor)
    //     senceData = globalData.data[globalData.floor]
    //     gameBegin()
    //     return
    //     /*直接返回 不让英雄移动*/
    // }

    // if (charaInfo.chara === 'npc') {
    //     if (charaInfo.move === false) {
    //         return
    //     }
    // }
    senceData.playerPosition.x += x;
    senceData.playerPosition.y += y;
    player.x = senceData.playerPosition.x * globalData.size;
    player.y = senceData.playerPosition.y * globalData.size;
}
//判断是否可以移动
function canMove(x, y) {
    var tempX = senceData.playerPosition.x + x,
        tempY = senceData.playerPosition.y + y;
    var type = '';
    //限制行动区域
    if (tempX < 0 || tempY < 0 || tempY >= globalData.mapRow || tempX >= globalData.mapCol) {
        return false;
    }
    //撞墙检测
    if (senceData.map[tempY][tempX] !== 0) {
        return false;
    }
    // 碰撞物品
    if (senceData.goods[tempY][tempX] !== 0) {
        type = getType(senceData.goods[tempY][tempX])
        switch (type) {
            case 'upFloor':
                return {
                    type: 'goods',
                    goodsType: 'upFloor'
                }
                break;
            case 'downFloor':
                return {
                    type: 'goods',
                    goodsType: 'downFloor'
                }
                break;
        }
        return false
    }
    //碰撞人物
    if (senceData.chara[tempY][tempX] !== 0) {
        return false
    }
    //碰撞npc
    // for (var i = 0, j = 0; i < senceData.character.length; i++) {
    //     if (tempX === senceData.character[i].position.x && tempY === senceData.character[i].position.y && senceData.character[i].show) {
    //         var Chara = senceData.character[i];
    //         switch (Chara.type) {
    //             case "npc":
    //                 return {
    //                     chara: "npc",
    //                     move: false
    //                 };
    //             case "monster":
    //                 return killMonster(i);
    //             case "floor":
    //                 return {
    //                     chara: "floor",
    //                     floorType: Chara.floorType
    //                 }
    //         }
    //     }
    // }
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
function getType(str) {
    return str.match(/[a-zA-Z]/g).join('')
}
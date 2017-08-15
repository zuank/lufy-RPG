//移动角色并做相应的操作
var playerMove = function (x, y, status) {
    var moveInfo = canMove(x, y);
    if (moveInfo === false) {
        return;
    }
    if (moveInfo.type === 'goods') {
        var deleteGoods = configGoods[moveInfo.key].handel()
        if (deleteGoods === true) {
            removeGoodsAddChara(moveInfo.position.y, moveInfo.position.x);
            player.gotoAndPlay(status);
            return
        } else {
            return
        }
    }
    if (moveInfo.type === 'monster') {
        removeGoodsAddChara(moveInfo.position.y, moveInfo.position.x);
        player.gotoAndPlay(status);
        return;
    }
    player.gotoAndPlay(status);
    senceData.playerPosition.x += x;
    senceData.playerPosition.y += y;
    player.x = senceData.playerPosition.x * globalData.size;
    player.y = senceData.playerPosition.y * globalData.size;
}
//移除物品
function removeGoodsAddChara(y, x) {
    senceData['things'][y][x] = 0
    layers.things.getChildByName(globalData.floor + '_' + y + '_' + x).remove();
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
    if (senceData.things[tempY][tempX] !== 0) {
        type = getType(senceData.things[tempY][tempX])
        // 会将坐标和物品类型返回
        return {
            type: type,
            key: senceData.things[tempY][tempX],
            position: {
                x: tempX,
                y: tempY
            }
        }
    }
    return true;
}

function getType(str) {
    return str.match(/[a-zA-Z]/g).join('')
}
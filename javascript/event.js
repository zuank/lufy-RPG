//移动角色并做相应的操作
var playerMove = function (x, y, status) {
    var moveInfo = canMove(x, y);
    if (moveInfo === false) {
        return;
    }
    if (moveInfo.type === 'goods') {
        switch (moveInfo.goodsType) {
            case 'upFloor':
                globalData.floor++;
                gameInfo.floor.text = '第' + globalData.floor + '层';
                drawInit();
                return;
            /*不执行之后的运动操作*/
            case 'downFloor':
                globalData.floor--;
                gameInfo.floor.text = '第' + globalData.floor + '层';
                drawInit();
                return;
            /*不执行之后的运动操作*/
            case 'key':
                getKey(moveInfo.key);
                // 从图层中移除对象 同事更新数据列表
                removeGoods(moveInfo.position.y, moveInfo.position.x);
                player.gotoAndPlay(status);
                return;
            /*不执行之后的运动操作*/
            case 'door':
                var bol = canOper(moveInfo.key)
                if (bol) {
                    removeGoods(moveInfo.position.y, moveInfo.position.x);
                    player.gotoAndPlay(status);
                }
                return;
        }
    }

    player.gotoAndPlay(status);
    senceData.playerPosition.x += x;
    senceData.playerPosition.y += y;
    player.x = senceData.playerPosition.x * globalData.size;
    player.y = senceData.playerPosition.y * globalData.size;
}
//移除物品
function removeGoods(y, x) {
    senceData.goods[y][x] = 0
    layers.chara.getChildByName(globalData.floor + '_' + y + '_' + x).remove();
}
//拾取钥匙
function getKey(type) {
    switch (type) {
        case 'key0':
            globalData.playerInfo.key.yellow++;
            gameInfo.keyYellow.text = '黄钥匙： ' + globalData.playerInfo.key.yellow;
            return;
        case 'key1':
            globalData.playerInfo.key.blue++;
            gameInfo.keyBlue.text = '蓝钥匙： ' + globalData.playerInfo.key.blue;
            return;
        case 'key2':
            globalData.playerInfo.key.red++;
            gameInfo.keyRed.text = '红钥匙： ' + globalData.playerInfo.key.red;
            return;
    }
}
//拾取钥匙
function canOper(type) {
    switch (type) {
        case 'door0':
            if (globalData.playerInfo.key.yellow > 0) {
                globalData.playerInfo.key.yellow--;
                gameInfo.keyYellow.text = '黄钥匙： ' + globalData.playerInfo.key.yellow;
                return true;
            } else {
                return false
            }
        case 'door1':
            if (globalData.playerInfo.key.blue > 0) {
                globalData.playerInfo.key.blue--;
                gameInfo.keyBlue.text = '蓝钥匙： ' + globalData.playerInfo.key.blue;
                return true;
            } else {
                return false
            }
        case 'door2':
            if (globalData.playerInfo.key.red > 0) {
                globalData.playerInfo.key.red--;
                gameInfo.keyRed.text = '红钥匙： ' + globalData.playerInfo.key.red;
                return true;
            } else {
                return false
            }
    }
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
        // 会将坐标和物品类型返回
        return {
            type: 'goods',
            goodsType: type,
            key: senceData.goods[tempY][tempX],
            position: {
                x: tempX,
                y: tempY
            }
        }
    }
    //碰撞人物
    if (senceData.chara[tempY][tempX] !== 0) {
        return false
    }
    return true;
}

function getType(str) {
    return str.match(/[a-zA-Z]/g).join('')
}
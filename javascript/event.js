//移动角色并做相应的操作
var playerMove = function (x, y, status) {
    var moveInfo = canMove(x, y);
    if (moveInfo === false) {
        return;
    }
    if (moveInfo.type === 'goods') {
        if (moveInfo.goodsType === 'gem' || moveInfo.goodsType === 'key' ||moveInfo.goodsType === 'agentia' ) {
            getGoods(moveInfo, status);
            return;
        }
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
            case 'door':
                var bol = canOper(moveInfo.key)
                if (bol) {
                    removeGoodsAddChara('goods', moveInfo.position.y, moveInfo.position.x);
                    player.gotoAndPlay(status);
                }
                return;
        }
    }
    if (moveInfo.type === 'chara') {
        switch (moveInfo.charaType) {
            case 'monster':
                //  TODO      这边需要添加能不能kill
                removeGoodsAddChara('chara', moveInfo.position.y, moveInfo.position.x);
                player.gotoAndPlay(status);
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
function removeGoodsAddChara(type, y, x) {
    senceData[type][y][x] = 0
    layers.chara.getChildByName(globalData.floor + '_' + y + '_' + x).remove();
}
// 拾取物品
function getGoods(info, status) {
    switch (info.goodsType) {
        case 'key':
            switch (info.key) {
                case 'key0':
                    globalData.playerInfo.key.yellow++;
                    gameInfo.keyYellow.text = '黄钥匙： ' + globalData.playerInfo.key.yellow;
                    break;
                case 'key1':
                    globalData.playerInfo.key.blue++;
                    gameInfo.keyBlue.text = '蓝钥匙： ' + globalData.playerInfo.key.blue;
                    break;
                case 'key2':
                    globalData.playerInfo.key.red++;
                    gameInfo.keyRed.text = '红钥匙： ' + globalData.playerInfo.key.red;
                    break;
            }
            break;
        case 'gem':
            if (info.key === 'gem0') {
                globalData.playerInfo.ATK+=10;
                gameInfo.ATK.text = '攻击力： ' + globalData.playerInfo.ATK;
            } else if (info.key === 'gem1') {
                globalData.playerInfo.DEF+=10;
                gameInfo.DEF.text = '防御力： ' + globalData.playerInfo.DEF;
            }
            break;
        case 'agentia':
            if (info.key === 'agentia0') {
                globalData.playerInfo.HP+=10;
                gameInfo.HP.text = '生命值： ' + globalData.playerInfo.HP;
            } else if (info.key === 'agentia1') {
                globalData.playerInfo.HP+=20;
                gameInfo.HP.text = '生命值： ' + globalData.playerInfo.HP;
            }
            break;
    }
    removeGoodsAddChara('goods', info.position.y, info.position.x);
    player.gotoAndPlay(status);
}

//能否开门
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
        type = getType(senceData.chara[tempY][tempX])
        return {
            type: 'chara',
            charaType: type,
            key: senceData.chara[tempY][tempX],
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
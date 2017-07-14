//
//  main.js
//  <project>
//
//  Created by Yuehao Wang on 2016-10-10.
//  Copyright 2016 Yuehao Wang. All rights reserved.
//  全局已知高度和宽度为32px 为了方便开发 直接使用了这个值

//初始化项目  刷新频率 节点 长 宽 callback
// var loadingLayer = new LoadingSample3();
var mota = {
    imglist: null, // 图片数组
    layers: { // 图层对象
        back: null,
        mapview: null,
        chara: null,
        effect: null,
        talk: null
    },
    senceData: null, //当前场景信息
    player: {}, // 角色对象
    gameInfo: {}, // 游戏信息展示
    main: function () { // 主程序
        // 展示区设置
        LGlobal.align = LStageAlign.MIDDLE;
        LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
        LSystem.screen(LStage.FULL_SCREEN);
        // 动画加载图层
        var loadingLayer = new LoadingSample3();
        addChild(loadingLayer);
        LLoadManage.load(
            imgData,
            function (progress) {
                loadingLayer.setProgress(progress)
            },
            function (result) {
                console.log(this)
                // 移除动画加载图层 释放内存
                removeChild(loadingLayer);
                loadingLayer = null;
                mota.imgList = result;
                //游戏层显示初始化
                mota.layerInit();
                //游戏场景载入
                mota.drawInit();
                // 游戏信息展示
                mota.drawGameInfo();
                // 事件绑定
                LEvent.addEventListener(LGlobal.window, LKeyboardEvent.KEY_DOWN, mota.playerEvent);
            }
        );
    },
    // 事件触发
    playerEvent: function (event) {
        switch (event.keyCode) {
            case 37:
                mota.playerMove(-1, 0, "ArrowLeft");
                break;
            case 38:
                mota.playerMove(0, -1, "ArrowUp");
                break;
            case 39:
                mota.playerMove(1, 0, "ArrowRight");
                break;
            case 40:
                mota.playerMove(0, 1, "ArrowDown");
                break;
        }
        return false;
    },
    // 游戏信息展示 包括当前楼层 角色血量等
    drawGameInfo: function () {
        // 楼层显示
        mota.gameInfo.floor = new LTextField();
        mota.gameInfo.floor.text = '第' + globalData.floor + '层';
        mota.gameInfo.floor.x = 152;
        /*这个数值是试出来  直接计算的数值偏右*/
        mota.gameInfo.floor.y = 5;
        mota.gameInfo.floor.size = 20;
        mota.gameInfo.floor.color = "#FFF";
        mota.layers.effect.addChild(mota.gameInfo.floor);
        //    黄钥匙
        mota.gameInfo.keyYellow = new LTextField();
        mota.gameInfo.keyYellow.text = '黄钥匙： ' + globalData.playerInfo.key.yellow;
        mota.gameInfo.keyYellow.x = 10;
        mota.gameInfo.keyYellow.y = 25;
        mota.gameInfo.keyYellow.size = 15;
        mota.gameInfo.keyYellow.color = "#FFF";
        mota.layers.effect.addChild(mota.gameInfo.keyYellow);
        //    蓝钥匙
        mota.gameInfo.keyBlue = new LTextField();
        mota.gameInfo.keyBlue.text = '蓝钥匙： ' + globalData.playerInfo.key.blue;
        mota.gameInfo.keyBlue.x = 10;
        mota.gameInfo.keyBlue.y = 40;
        mota.gameInfo.keyBlue.size = 15;
        mota.gameInfo.keyBlue.color = "#FFF";
        mota.layers.effect.addChild(mota.gameInfo.keyBlue);
        //    红钥匙
        mota.gameInfo.keyRed = new LTextField();
        mota.gameInfo.keyRed.text = '红钥匙： ' + globalData.playerInfo.key.red;
        mota.gameInfo.keyRed.x = 10;
        mota.gameInfo.keyRed.y = 55;
        mota.gameInfo.keyRed.size = 15;
        mota.gameInfo.keyRed.color = "#FFF";
        mota.layers.effect.addChild(mota.gameInfo.keyRed);
    },
    drawInit: function () {
        // 重新获取楼层信息
        mota.senceData = globalData.data[globalData.floor];
        // 页面初始化
        mota.layers.chara.removeAllChild();
        mota.layers.mapview.removeAllChild();
        mota.addMap();
        mota.addChara();
        mota.addGoods();
        mota.addPlayer();
    },
    // 绘制地图
    addMap: function () {
        var bitMapData = null,
            bitMapDataCell = null,
            bitMap = null,
            mapImagesArray = null,
            index = null;

        for (var i = 0; i < globalData.mapRow; i++) {
            for (var j = 0; j < globalData.mapCol; j++) {
                index = mota.senceData.map[i][j];
                // 根据index的值判断地图的类型
                // 0 道路
                // 1 普通墙
                // 2 星星墙
                // 3 岩浆墙
                if (index === 0 || index === 1) {
                    bitMapDataCell = new LBitmapData(mota.imgList['map1'], index * globalData.size, 0, globalData.size, globalData.size);
                    bitMap = new LBitmap(bitMapDataCell);
                } else {
                    bitMapData = new LBitmapData(mota.imgList['map2']);
                    mapImagesArray = LGlobal.divideCoordinate(bitMapData.width, bitMapData.height, 4, 4);
                    bitMap = new LAnimationTimeline(bitMapData, mapImagesArray);
                    bitMap.setLabel("2", 2, j % 4, 1, true);
                    bitMap.setLabel("3", 0, j % 4, 1, true);
                    bitMap.speed = 5;
                    bitMap.gotoAndPlay(index);
                }
                bitMap.x = j * globalData.size;
                bitMap.y = i * globalData.size;
                mota.layers.mapview.addChild(bitMap);
            }
        }
    },
    // 绘制动画 包括怪物和NPC
    addChara: function () {
        var bitMapData = null,
            bitMap = null,
            mapImagesArray = null,
            index = null;

        for (var i = 0; i < globalData.mapRow; i++) {
            for (var j = 0; j < globalData.mapCol; j++) {
                index = mota.senceData.chara[i][j];
                if (index !== 0) {
                    bitMapData = new LBitmapData(mota.imgList[configChara[index].img]);
                    mapImagesArray = LGlobal.divideCoordinate(bitMapData.width, bitMapData.height, 4, 4);
                    bitMap = new LAnimationTimeline(bitMapData, mapImagesArray);
                    bitMap.setLabel("npc", configChara[index].y, 0, 1, true);
                    bitMap.speed = 5;
                    bitMap.gotoAndPlay("npc");
                    bitMap.x = j * globalData.size;
                    bitMap.y = i * globalData.size;
                    bitMap.name = globalData.floor + '_' + i + '_' + j
                    mota.layers.chara.addChild(bitMap);
                }
            }
        }
    },
    // 绘制道具
    addGoods: function () {
        var bitMap = null,
            index = null;

        for (var i = 0; i < globalData.mapRow; i++) {
            for (var j = 0; j < globalData.mapCol; j++) {
                index = mota.senceData.goods[i][j];
                if (index !== 0) {
                    bitMapDataCell = new LBitmapData(mota.imgList[configGoods[index].img], configGoods[index].x * globalData.size, configGoods[index].y * globalData.size, globalData.size, globalData.size);
                    bitMap = new LBitmap(bitMapDataCell);
                    bitMap.x = j * globalData.size;
                    bitMap.y = i * globalData.size;
                    bitMap.name = globalData.floor + '_' + i + '_' + j
                    mota.layers.chara.addChild(bitMap);
                }
            }
        }
    },
    // 绘制英雄
    addPlayer: function () {
        var bitMapData = new LBitmapData(mota.imgList['hero']);
        var listChara = LGlobal.divideCoordinate(bitMapData.width, bitMapData.height, 4, 4);
        var chara = new LAnimationTimeline(bitMapData, listChara);
        mota.player = chara;
        mota.player.setLabel("ArrowLeft", 2, 0, 1, true);
        mota.player.setLabel("ArrowUp", 3, 0, 1, true);
        mota.player.setLabel("ArrowRight", 1, 0, 1, true);
        mota.player.setLabel("ArrowDown", 0, 0, 1, true);
        // 给英雄一个独立的速度 为了画面协调
        mota.player.speed = 10;
        mota.player.gotoAndPlay('ArrowDown');
        // player.scaleX = 0.5;
        // player.scaleY = 0.5;
        mota.player.name = 'hero';
        globalData.playerInfo.position = mota.senceData.playerPosition;
        chara.x = mota.senceData.playerPosition.x * globalData.size;
        chara.y = mota.senceData.playerPosition.y * globalData.size;
        mota.layers.chara.addChild(chara);
    },
    // 初始化图层
    layerInit: function () {
        mota.layers.back = new LSprite();
        mota.layers.back.graphics.drawRect(0, '#103820', [0, 0, LGlobal.width, LGlobal.height], true, '#012345');
        addChild(mota.layers.back);
        mota.layers.back.x = 0;
        mota.layers.back.y = 0;
        mota.layers.mapview = new LSprite();
        mota.layers.back.addChild(mota.layers.mapview);
        mota.layers.talk = new LSprite();
        mota.layers.back.addChild(mota.layers.talk);
        mota.layers.chara = new LSprite();
        mota.layers.back.addChild(mota.layers.chara);
        mota.layers.effect = new LSprite();
        mota.layers.effect.x = 0
        mota.layers.effect.y = 11 * globalData.size
        mota.layers.back.addChild(mota.layers.effect);
    },
    // 英雄移动判定
    playerMove: function (x, y, status) {
        var moveInfo = mota.canMove(x, y);
        if (moveInfo === false) {
            return;
        }
        if (moveInfo.type === 'goods') {
            switch (moveInfo.goodsType) {
                case 'upFloor':
                    globalData.floor++;
                    mota.gameInfo.floor.text = '第' + globalData.floor + '层';
                    mota.drawInit();
                    return;
                /*不执行之后的运动操作*/
                case 'downFloor':
                    globalData.floor--;
                    mota.gameInfo.floor.text = '第' + globalData.floor + '层';
                    mota.drawInit();
                    return;
                /*不执行之后的运动操作*/
                case 'key':
                    mota.getKey(moveInfo.key);
                    // 从图层中移除对象 同事更新数据列表
                    mota.removeGoodsAddChara('goods', moveInfo.position.y, moveInfo.position.x);
                    mota.player.gotoAndPlay(status);
                    return;
                /*不执行之后的运动操作*/
                case 'door':
                    var bol = mota.canOper(moveInfo.key);
                    if (bol) {
                        mota.removeGoodsAddChara('goods', moveInfo.position.y, moveInfo.position.x);
                        mota.player.gotoAndPlay(status);
                    }
                    return;
            }
        }
        if (moveInfo.type === 'chara') {
            switch (moveInfo.charaType) {
                case 'monster':
                    //  TODO      这边需要添加能不能kill
                    mota.removeGoodsAddChara('chara', moveInfo.position.y, moveInfo.position.x);
                    mota.player.gotoAndPlay(status);
                    return;
            }
        }
        mota.player.gotoAndPlay(status);
        mota.senceData.playerPosition.x += x;
        mota.senceData.playerPosition.y += y;
        mota.player.x = mota.senceData.playerPosition.x * globalData.size;
        mota.player.y = mota.senceData.playerPosition.y * globalData.size;
    },
    //移除物品
    removeGoodsAddChara: function (type, y, x) {
        mota.senceData[type][y][x] = 0
        mota.layers.chara.getChildByName(globalData.floor + '_' + y + '_' + x).remove();
    },
    //拾取钥匙
    getKey: function (type) {
        switch (type) {
            case 'key0':
                globalData.playerInfo.key.yellow++;
                mota.gameInfo.keyYellow.text = '黄钥匙： ' + globalData.playerInfo.key.yellow;
                return;
            case 'key1':
                globalData.playerInfo.key.blue++;
                mota.gameInfo.keyBlue.text = '蓝钥匙： ' + globalData.playerInfo.key.blue;
                return;
            case 'key2':
                globalData.playerInfo.key.red++;
                mota.gameInfo.keyRed.text = '红钥匙： ' + globalData.playerInfo.key.red;
                return;
        }
    },
    //能否开门
    canOper: function (type) {
        switch (type) {
            case 'door0':
                if (globalData.playerInfo.key.yellow > 0) {
                    globalData.playerInfo.key.yellow--;
                    mota.gameInfo.keyYellow.text = '黄钥匙： ' + globalData.playerInfo.key.yellow;
                    return true;
                } else {
                    return false
                }
            case 'door1':
                if (globalData.playerInfo.key.blue > 0) {
                    globalData.playerInfo.key.blue--;
                    mota.gameInfo.keyBlue.text = '蓝钥匙： ' + globalData.playerInfo.key.blue;
                    return true;
                } else {
                    return false
                }
            case 'door2':
                if (globalData.playerInfo.key.red > 0) {
                    globalData.playerInfo.key.red--;
                    mota.gameInfo.keyRed.text = '红钥匙： ' + globalData.playerInfo.key.red;
                    return true;
                } else {
                    return false
                }
        }
    },
    //判断是否可以移动
    canMove: function (x, y) {
        var tempX = mota.senceData.playerPosition.x + x,
            tempY = mota.senceData.playerPosition.y + y,
            type = '';
        //限制行动区域
        if (tempX < 0 || tempY < 0 || tempY >= globalData.mapRow || tempX >= globalData.mapCol) {
            return false;
        }
        //撞墙检测
        if (mota.senceData.map[tempY][tempX] !== 0) {
            return false;
        }
        // 碰撞物品
        if (mota.senceData.goods[tempY][tempX] !== 0) {
            type = getType(mota.senceData.goods[tempY][tempX])
            // 会将坐标和物品类型返回
            return {
                type: 'goods',
                goodsType: type,
                key: mota.senceData.goods[tempY][tempX],
                position: {
                    x: tempX,
                    y: tempY
                }
            }
        }
        //碰撞人物
        if (mota.senceData.chara[tempY][tempX] !== 0) {
            type = getType(mota.senceData.chara[tempY][tempX])
            return {
                type: 'chara',
                charaType: type,
                key: mota.senceData.chara[tempY][tempX],
                position: {
                    x: tempX,
                    y: tempY
                }
            }
        }
        return true;
    }
}

LInit(50, "mylegend", 352, 544, mota.main);

function getType(str) {
    return str.match(/[a-zA-Z]/g).join('')
}


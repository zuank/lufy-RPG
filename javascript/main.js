//
//  main.js
//  <project>
//
//  Created by Yuehao Wang on 2016-10-10.
//  Copyright 2016 Yuehao Wang. All rights reserved.
//  全局已知高度和宽度为32px 为了方便开发 直接使用了这个值

//初始化项目  刷新频率 节点 长 宽 callback
LInit(50, "mylegend", 352, 544, main);
//图片path数组
var imgData = [{
    name: "map1", /*地图*/
    path: "./images/map1.png"
}, {
    name: "map2", /*地图*/
    path: "./images/map2.png"
}, {
    name: "prop", /*道具*/
    path: "./images/prop.png"
}, {
    name: "upFloor", /*上楼梯*/
    path: "./images/up_floor.png"
}, {
    name: "downFloor", /*下楼梯*/
    path: "./images/down_floor.png"
}, {
    name: "door", /*门*/
    path: "./images/door.png"
}, {
    name: "door_", /*栏杆*/
    path: "./images/door_.png"
}, {
    name: "agentia", /*药剂*/
    path: "./images/agentia.png"
}, {
    name: "gem", /*宝石*/
    path: "./images/gem.png"
}, {
    name: "article", /*系统物品*/
    path: "./images/article.png"
}, {
    name: "equip", /*装备*/
    path: "./images/equip.png"
}, {
    name: "key", /*钥匙*/
    path: "./images/key.png"
}, {
    name: "hero", /*英雄*/
    path: "./images/hero.png"
}, {
    name: "npc1", /*npc*/
    path: "./images/npc1.png"
}, {
    name: "monster1", /*怪物1*/
    path: "./images/monster1.png"
}, {
    name: "monster2", /*怪物2*/
    path: "./images/monster2.png"
}, {
    name: "monster3", /*怪物3*/
    path: "./images/monster3.png"
}, {
    name: "monster4", /*怪物4*/
    path: "./images/monster4.png"
}, {
    name: "monster5", /*怪物5*/
    path: "./images/monster5.png"
}, {
    name: "monster6", /*怪物6*/
    path: "./images/monster6.png"
}];

//预加载完成的图片数组
var imgList = {};
//地图块
var mapImagesArray = null;
//加载动画类型
var loadingLayer;
//游戏层
var layers = {
    back: null,
    mapview: null,
    chara: null,
    effect: null,
    talk: null,
};
//地图块大小

//当前场景信息
var senceData = null;
//hero
var player = null;
var gameInfo = {};
function main() {
    LGlobal.align = LStageAlign.MIDDLE;
    LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
    LSystem.screen(LStage.FULL_SCREEN);
    //准备读取图片
    loadingLayer = new LoadingSample3();
    addChild(loadingLayer);
    LLoadManage.load(
        imgData,
        function (progress) {
            loadingLayer.setProgress(progress)
        },
        gameInit
    );
}

//游戏初始化
function gameInit(result) {
    removeChild(loadingLayer);
    loadingLayer = null;
    imgList = result;
    //游戏层显示初始化
    layerInit();
    //游戏场景载入
    drawInit();
    // 游戏信息展示
    drawGameInfo();
    LEvent.addEventListener(LGlobal.window, LKeyboardEvent.KEY_DOWN, playerEvent);
}

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
    return false;
}
function drawGameInfo() {
    // 楼层显示
    gameInfo.floor = new LTextField();
    gameInfo.floor.text = '第' + globalData.floor + '层';
    gameInfo.floor.x = 152; /*这个数值是试出来  直接计算的数值偏右*/
    gameInfo.floor.y = 5;
    gameInfo.floor.size = 20;
    gameInfo.floor.color = "#FFF";
    layers.effect.addChild(gameInfo.floor);
//    黄钥匙
    gameInfo.keyYellow = new LTextField();
    gameInfo.keyYellow.text = '黄钥匙： ' + globalData.playerInfo.key.yellow;
    gameInfo.keyYellow.x = 10;
    gameInfo.keyYellow.y = 25;
    gameInfo.keyYellow.size = 15;
    gameInfo.keyYellow.color = "#FFF";
    layers.effect.addChild(gameInfo.keyYellow);
    //    蓝钥匙
    gameInfo.keyBlue = new LTextField();
    gameInfo.keyBlue.text = '蓝钥匙： ' + globalData.playerInfo.key.blue;
    gameInfo.keyBlue.x = 10;
    gameInfo.keyBlue.y = 40;
    gameInfo.keyBlue.size = 15;
    gameInfo.keyBlue.color = "#FFF";
    layers.effect.addChild(gameInfo.keyBlue);
//    红钥匙
    gameInfo.keyRed = new LTextField();
    gameInfo.keyRed.text = '红钥匙： ' + globalData.playerInfo.key.red;
    gameInfo.keyRed.x = 10;
    gameInfo.keyRed.y = 55;
    gameInfo.keyRed.size = 15;
    gameInfo.keyRed.color = "#FFF";
    layers.effect.addChild(gameInfo.keyRed);
}

function drawInit() {
    senceData = globalData.data[globalData.floor];
    // 页面初始化
    layers.chara.removeAllChild();
    layers.mapview.removeAllChild();
    addMap();
    addChara();
    addGoods();
    addPlayer();
}

//添加地图
function addMap() {
    var bitMapData = null,
        bitMapDataCell = null,
        bitMap = null;
    var index;

    for (var i = 0; i < globalData.mapRow; i++) {
        for (var j = 0; j < globalData.mapCol; j++) {
            index = senceData.map[i][j];
            // 根据index的值判断地图的类型
            // 0 道路
            // 1 普通墙
            // 2 星星墙
            // 3 岩浆墙
            if (index === 0 || index === 1) {
                bitMapDataCell = new LBitmapData(imgList['map1'], index * globalData.size, 0, globalData.size, globalData.size);
                bitMap = new LBitmap(bitMapDataCell);
            } else {
                bitMapData = new LBitmapData(imgList['map2']);
                mapImagesArray = LGlobal.divideCoordinate(bitMapData.width, bitMapData.height, 4, 4);
                bitMap = new LAnimationTimeline(bitMapData, mapImagesArray);
                bitMap.setLabel("2", 2, j % 4, 1, true);
                bitMap.setLabel("3", 0, j % 4, 1, true);
                bitMap.speed = 5;
                bitMap.gotoAndPlay(index);
            }
            bitMap.x = j * globalData.size;
            bitMap.y = i * globalData.size;
            layers.mapview.addChild(bitMap);
        }
    }
};
function addChara() {
    var bitMapData = null,
        bitMap = null;
    var index;

    for (var i = 0; i < globalData.mapRow; i++) {
        for (var j = 0; j < globalData.mapCol; j++) {
            index = senceData.chara[i][j];
            if (index !== 0) {
                bitMapData = new LBitmapData(imgList[configChara[index].img]);
                mapImagesArray = LGlobal.divideCoordinate(bitMapData.width, bitMapData.height, 4, 4);
                bitMap = new LAnimationTimeline(bitMapData, mapImagesArray);
                bitMap.setLabel("npc", configChara[index].y, 0, 1, true);
                bitMap.speed = 5;
                bitMap.gotoAndPlay("npc");
                bitMap.x = j * globalData.size;
                bitMap.y = i * globalData.size;
                bitMap.name = globalData.floor + '_' + i + '_' + j
                layers.chara.addChild(bitMap);
            }
        }
    }
}
function addGoods() {
    var bitMap = null;
    var index;

    for (var i = 0; i < globalData.mapRow; i++) {
        for (var j = 0; j < globalData.mapCol; j++) {
            index = senceData.goods[i][j];
            if (index !== 0) {
                bitMapDataCell = new LBitmapData(imgList[configGoods[index].img], configGoods[index].x * globalData.size, configGoods[index].y * globalData.size, globalData.size, globalData.size);
                bitMap = new LBitmap(bitMapDataCell);
                bitMap.x = j * globalData.size;
                bitMap.y = i * globalData.size;
                bitMap.name = globalData.floor + '_' + i + '_' + j
                layers.chara.addChild(bitMap);
            }
        }
    }
}
function addPlayer() {
    var bitMapData = new LBitmapData(imgList['hero']);
    var listChara = LGlobal.divideCoordinate(bitMapData.width, bitMapData.height, 4, 4);
    var chara = new LAnimationTimeline(bitMapData, listChara);
    player = chara;
    player.setLabel("ArrowLeft", 2, 0, 1, true);
    player.setLabel("ArrowUp", 3, 0, 1, true);
    player.setLabel("ArrowRight", 1, 0, 1, true);
    player.setLabel("ArrowDown", 0, 0, 1, true);
    // 给英雄一个独立的速度 为了画面协调
    player.speed = 10;
    player.gotoAndPlay('ArrowDown');
    // player.scaleX = 0.5;
    // player.scaleY = 0.5;
    player.name ='hero';
    globalData.playerInfo.position = senceData.playerPosition;
    chara.x = senceData.playerPosition.x * globalData.size;
    chara.y = senceData.playerPosition.y * globalData.size;
    layers.chara.addChild(chara);
}

function layerInit() {
    layers.back = new LSprite();
    layers.back.graphics.drawRect(0, '#103820', [0, 0, LGlobal.width, LGlobal.height], true, '#012345');
    addChild(layers.back);
    layers.back.x = 0;
    layers.back.y = 0;
    layers.mapview = new LSprite();
    layers.back.addChild(layers.mapview);
    layers.talk = new LSprite();
    layers.back.addChild(layers.talk);
    layers.chara = new LSprite();
    layers.back.addChild(layers.chara);
    layers.effect = new LSprite();
    layers.effect.x = 0
    layers.effect.y = 11 * globalData.size
    layers.back.addChild(layers.effect);
}

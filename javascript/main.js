//
//  main.js
//  <project>
//
//  Created by Yuehao Wang on 2016-10-10.
//  Copyright 2016 Yuehao Wang. All rights reserved.
//  全局已知高度和宽度为32px 为了方便开发 直接使用了这个值

//初始化项目  刷新频率 节点 长 宽 callback
LInit(50, "mylegend", 352, 480, main);
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
    name: "monster01", /*怪物1*/
    path: "./images/monster01.png"
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
var imgCellWidth = 0,
    imgCellHeight = 0;

//当前场景
var senceData = null;
//hero
var player = null;

function main() {
    LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
    LGlobal.screen(LStage.FULL_SCREEN);
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
    senceData = globalData.data[globalData.floor];
    //游戏层显示初始化
    layerInit();
    //游戏场景载入
    gameBegin();

    LEvent.addEventListener(LGlobal.window, LKeyboardEvent.KEY_DOWN, playerEvent);
}

function playerEvent(event) {
    switch (event.keyCode) {
        case 37:
            playerMove(-1, 0, "ArrowLeft", player, globalData.playerInfo.position, senceData);
            break;
        case 38:
            playerMove(0, -1, "ArrowUp", player, globalData.playerInfo.position, senceData);
            break;
        case 39:
            playerMove(1, 0, "ArrowRight", player, globalData.playerInfo.position, senceData);
            break;
        case 40:
            playerMove(0, 1, "ArrowDown", player, globalData.playerInfo.position, senceData);
            break;
    }
}


function gameBegin() {
    // 页面初始化
    layers.chara.removeAllChild();
    layers.mapview.removeAllChild();
    //添加地图
    addMap();
    //添加人物
    for (var i = 0; i < senceData.character.length; i++) {
        addChara(senceData.character[i]);
    }
}

//添加地图
function addMap() {
    var bitMapData = null,
        bitMapDataCell = null,
        bitMap = null;
    var index, indexX, indexY;

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
//添加人物
function addChara(character) {
    // 如果人物死掉了 怪物属性
    if (character.show === false) {
        return false;
    }
    var bitMapData = new LBitmapData(imgList[character.name]);
    var charaWidth = bitMapData.width,
        charaHeight = bitMapData.height;
    var listChara = LGlobal.divideCoordinate(charaWidth, charaHeight, 4, 4);
    var chara = new LAnimationTimeline(bitMapData, listChara);
    if (character.type === "hero") {
        player = chara;
        player.setLabel("ArrowLeft", 2, 0, 1, true);
        player.setLabel("ArrowUp", 3, 0, 1, true);
        player.setLabel("ArrowRight", 1, 0, 1, true);
        player.setLabel("ArrowDown", 0, 0, 1, true);
        // 给英雄一个独立的速度 为了画面协调
        player.speed = 10;
        player.gotoAndPlay(character.status);
        globalData.playerInfo.position = character.position;
        globalData.playerInfo.status = character.status;
    }
    if (character.type === "monster") {
        chara.setLabel("monster", character.monsterType, 0, 1, true);
        chara.gotoAndPlay("monster");
    }
    if (character.type === "npc") {
        chara.setLabel("npc", character.npcType, 0, 1, true);
        chara.gotoAndPlay("npc");
    }
    chara.speed = 3;
    if (character.type === "floor") {
        var bitMapDataCell = new LBitmapData(imgList[character.name], 0, 0, globalData.size, globalData.size);
        chara = new LBitmap(bitMapDataCell);
    }
    chara.x = character.position.x * globalData.size;
    chara.y = character.position.y * globalData.size;
    layers.chara.addChild(chara);
};

function layerInit() {
    layers.back = new LSprite();
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
    layers.back.addChild(layers.effect);
}

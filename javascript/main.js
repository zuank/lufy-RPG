//
//  main.js
//  <project>
//
//  Created by Yuehao Wang on 2016-10-10.
//  Copyright 2016 Yuehao Wang. All rights reserved.
//

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
    name: "fairy", /*精灵*/
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
    console.log(imgList)
    senceData = globalData.data[0];
    //游戏层显示初始化
    layerInit();
    //游戏场景载入
    gameBegin();

    LEvent.addEventListener(LGlobal.window, LKeyboardEvent.KEY_DOWN, playerEvent);
}

function playerEvent(event) {
    switch (event.keyCode) {
        case 37:
            playerMove(-1, 0, "ArrowLeft", player, globalData.playerInfo.position, senceData, imgCellWidth, imgCellHeight);
            break;
        case 38:
            playerMove(0, -1, "ArrowUp", player, globalData.playerInfo.position, senceData, imgCellWidth, imgCellHeight);
            break;
        case 39:
            playerMove(1, 0, "ArrowRight", player, globalData.playerInfo.position, senceData, imgCellWidth, imgCellHeight);
            break;
        case 40:
            playerMove(0, 1, "ArrowDown", player, globalData.playerInfo.position, senceData, imgCellWidth, imgCellHeight);
            break;
    }
}


function gameBegin() {
    layers.chara.removeAllChild();
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
                bitMapData = new LBitmapData(imgList['map1']);
                mapImagesArray = LGlobal.divideCoordinate(bitMapData.width, bitMapData.height, 2, 1);
                imgCellWidth = bitMapData.width / 2;
                imgCellHeight = bitMapData.height / 1;
                bitMapDataCell = new LBitmapData(imgList['map1'], index * imgCellWidth, 0, imgCellWidth, imgCellHeight);
                bitMap = new LBitmap(bitMapDataCell);
            } else {
                bitMapData = new LBitmapData(imgList['map2']);
                mapImagesArray = LGlobal.divideCoordinate(bitMapData.width, bitMapData.height, 4, 4);
                imgCellWidth = bitMapData.width / 4;
                imgCellHeight = bitMapData.height / 4;
                bitMap = new LAnimationTimeline(bitMapData, mapImagesArray);
                bitMap.setLabel("2", 2, j % 4, 1, true);
                bitMap.setLabel("3", 0, j % 4, 1, true);
                bitMap.speed = 5;
                bitMap.gotoAndPlay(index);
            }
            bitMap.x = j * imgCellWidth;
            bitMap.y = i * imgCellHeight;
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
    var charaWidth = bitMapData.image.width,
        charaHeight = bitMapData.image.height;
    var listChara = LGlobal.divideCoordinate(charaWidth, charaHeight, 4, 4);
    var chara = new LAnimationTimeline(bitMapData, listChara);
    chara.speed = 3;
    chara.x = character.position.x * imgCellWidth;
    chara.y = character.position.y * imgCellHeight;
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

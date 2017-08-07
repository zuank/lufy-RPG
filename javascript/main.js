//
//  main.js
//  <project>
//
//  Created by Yuehao Wang on 2016-10-10.
//  Copyright 2016 Yuehao Wang. All rights reserved.
//  全局已知高度和宽度为32px 为了方便开发 直接使用了这个值

//初始化项目  刷新频率 节点 长 宽 callback
LInit(50, "mylegend", 352, 544, main);

//预加载完成的图片数组
var imgList = {};
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
// bitmap
var bitMapData, mapImagesArray, bitMapAnimation, bitGoodsData, bitCharaData, charaImagesArray, bitCharaAnimation;

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
  event.preventDefault()
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
  //    英雄血量
  gameInfo.HP = new LTextField();
  gameInfo.HP.text = '生命值： ' + globalData.playerInfo.HP;
  gameInfo.HP.x = 10;
  gameInfo.HP.y = 70;
  gameInfo.HP.size = 15;
  gameInfo.HP.color = "#FFF";
  layers.effect.addChild(gameInfo.HP);
  //    英雄攻击力
  gameInfo.ATK = new LTextField();
  gameInfo.ATK.text = '攻击力： ' + globalData.playerInfo.ATK;
  gameInfo.ATK.x = 10;
  gameInfo.ATK.y = 85;
  gameInfo.ATK.size = 15;
  gameInfo.ATK.color = "#FFF";
  layers.effect.addChild(gameInfo.ATK);
  //    英雄防御力
  gameInfo.DEF = new LTextField();
  gameInfo.DEF.text = '防御力： ' + globalData.playerInfo.DEF;
  gameInfo.DEF.x = 10;
  gameInfo.DEF.y = 100;
  gameInfo.DEF.size = 15;
  gameInfo.DEF.color = "#FFF";
  layers.effect.addChild(gameInfo.DEF);
}

function drawInit() {
  senceData = globalData.data[globalData.floor];
  // 页面初始化
  layers.chara.removeAllChild();
  layers.mapview.removeAllChild();
  addMap();
  // addChara();
  addThings();
  addPlayer();
}

//添加地图
function addMap() {
  var bitMapData, bitMapDataCell, bitMap, mapImagesArray;
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
        bitMapDataCell = new LBitmapData(imgList['map'], index * globalData.size, 3 * globalData.size, globalData.size, globalData.size);
        bitMap = new LBitmap(bitMapDataCell);
      } else if (index === 2 || index === 3) {
        bitMapData = new LBitmapData(imgList['map']);
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

function addThings() {
  var bitMap, bitMapData, key, bitMapDataCell, mapImagesArray;

  for (var i = 0; i < globalData.mapRow; i++) {
    for (var j = 0; j < globalData.mapCol; j++) {
      key = senceData.things[i][j];
      if (key !== 0) {
        if (configGoods[key]) {
          bitMapDataCell = new LBitmapData(imgList['goods'], configGoods[key].x * globalData.size, configGoods[key].y * globalData.size, globalData.size, globalData.size);
          bitMap = new LBitmap(bitMapDataCell);
        } else if (configChara[key]) {
          bitMapData = new LBitmapData(imgList['chara']);
          mapImagesArray = LGlobal.divideCoordinate(bitMapData.width, bitMapData.height, 30, 4);
          bitMap = new LAnimationTimeline(bitMapData, mapImagesArray);
          bitMap.setLabel("Chara", configChara[key].y, 0, 1, true);
          bitMap.speed = 5;
          bitMap.gotoAndPlay("Chara");
        }
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
  player.name = 'hero';
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

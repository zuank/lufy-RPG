//
//  main.js
//  <project>
//
//  Created by Yuehao Wang on 2016-10-10.
//  Copyright 2016 Yuehao Wang. All rights reserved.
//

//初始化项目  刷新频率 节点 长 宽 callback
LInit(50, "mylegend", 800, 480, main);
//图片path数组
var imgData = [{
	type:"js",
	path:"./javascript/gameData.js"
},
{
	type:"js",
	path:"./javascript/character.js"
},
{
	name: "map",
	path: "./images/map.jpg"
}, {
	name: "mingren",
	path: "./images/mingren.png"
}, {
	name: "m",
	path: "./images/m.jpg"
}, {
	name: "e1",
	path: "./images/e1.png"
}, {
	name: "e2",
	path: "./images/e2.png"
}, {
	name: "p0",
	path: "./images/p0.png"
}];

//预加载完成的图片数组
var imgList = {};
//地图块
var mapImagesArray = null;
//加载动画类型
var loadingLayer;
//游戏层
var layers = {
	back:null,
	mapview:null,
	chara:null,
	effect:null,
	talk:null,
	control:null
}
//地图块大小
var imgCellWidth = 0, imgCellHeight = 0;

//当前场景地图
var nowMapList = null;

function main() {
	//准备读取图片
	loadingLayer = new LoadingSample3();
	addChild(loadingLayer);
	LLoadManage.load(
		imgData,
		function(progress) {
			loadingLayer.setProgress(progress)
		},
		gameInit
	);
}

//游戏初始化
function gameInit(result){
	removeChild(loadingLayer);
	loadingLayer = null;
	imgList = result;
	nowMapList = globalData.map[0];
	//游戏层显示初始化
	layerInit();
	//游戏场景载入
	gameBegin();
}

function gameBegin() {
	//添加地图
	addMap(nowMapList);
	//添加人物
	addChara("p0","hero",{x:64,y:64});
}

//添加地图
function addMap(map){
	var bitMapData = null,bitMap = null;
	var index, indexX, indexY;
	//地图图片数组
	bitMapData = new LBitmapData(imgList["map"]);
	mapImagesArray = LGlobal.divideCoordinate(bitMapData.image.width, bitMapData.image.height, 10, 10);
	imgCellWidth = bitMapData.image.width / 10;
	imgCellHeight = bitMapData.image.height / 10;

	for( var i = 0; i < 10; i++){
		for (var j = 0; j < 15; j++){
			index = map[i][j];
			indexY = Math.floor(index / 10);
			indexX = index % 10;
			bitMapData = new LBitmapData(imgList["map"], indexX * imgCellWidth, indexY * imgCellHeight, imgCellWidth, imgCellHeight);
			bitMap = new LBitmap(bitMapData);
			bitMap.x = j * imgCellWidth;
			bitMap.y = i * imgCellHeight;
			layers.mapview.addChild(bitMap);
		}
	}
};
//添加人物
function addChara(mapData, charaType, charaPosition){
	var bitMapData = new LBitmapData(imgList[mapData]);
	console.log(bitMapData);
	var charaWidth = bitMapData.image.width,
		charaHeight = bitMapData.image.height;
	var listChara = LGlobal.divideCoordinate(charaWidth, charaHeight, 4, 4);
	var chara = new LAnimationTimeline(bitMapData, listChara);
	chara.speed = 3;
	chara.x = charaPosition.x;
	chara.y = charaPosition.y;
	layers.chara.addChild(chara);
};

function layerInit(){
	layers.back = new LSprite();
	addChild(layers.back);
	layers.mapview = new LSprite();
	layers.back.addChild(layers.mapview);
	layers.talk = new LSprite();
	layers.back.addChild(layers.talk);
	layers.control = new LSprite();
	layers.back.addChild(layers.control);
	layers.chara = new LSprite();
	layers.back.addChild(layers.chara);
	layers.effect = new LSprite();
	layers.back.addChild(layers.effect);
}

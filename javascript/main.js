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
	type: "js",
	path: "./javascript/gameData.js"
}, {
	type: "js",
	path: "./javascript/event.js"
}, {
	name:"wall01",
	path:"./images/Event01-Wall01.png"
},{
	name:"hero",
	path:"./images/Actor01-Braver01.png"
},{
	name:"npc01",
	path:"./images/Actor02-Monster01.png"
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
		control: null
	};
	//地图块大小
var imgCellWidth = 0,
	imgCellHeight = 0;

//当前场景地图
var senceData = null,playerInfo;

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
function gameInit(result) {
	removeChild(loadingLayer);
	loadingLayer = null;
	imgList = result;
	senceData = globalData[0];
	//游戏层显示初始化
	layerInit();
	//游戏场景载入
	gameBegin(); 

	LEvent.addEventListener(window,LKeyboardEvent.KEY_DOWN, playerEvent);
}

function gameBegin() {
	//添加地图
	addMap(senceData.map, 4,4);
	//添加人物
	for(var i = 0; i < senceData.character.length; i++){
		addChara(senceData.character[i]);
	}
	// addChara();
}

//添加地图
function addMap(mapList,imgcol,imgrow) {
	var bitMapData = null,
		bitMap = null;
	var index, indexX, indexY,tempI,tempJ;
	//地图图片数组
	bitMapData = new LBitmapData(imgList["wall01"]);
	mapImagesArray = LGlobal.divideCoordinate(bitMapData.image.width, bitMapData.image.height, imgcol, imgrow);
	imgCellWidth = bitMapData.image.width / imgcol;
	imgCellHeight = bitMapData.image.height / imgrow;
	
	tempI = mapList.length;
	for(var i = 0; i < tempI; i++) {
		tempJ = mapList[i].length;
		for(var j = 0; j < tempJ; j++) {
			index = mapList[i][j];
			indexY = Math.floor(index / 10);
			indexX = index % 10; 
			bitMapData = new LBitmapData(imgList["wall01"], indexX * imgCellWidth, indexY * imgCellHeight, imgCellWidth, imgCellHeight);
			bitMap = new LBitmap(bitMapData);
			bitMap.x = j * imgCellWidth;
			bitMap.y = i * imgCellHeight;
			layers.mapview.addChild(bitMap);
		}
	}
};
//添加人物
var player = null;
function addChara(character) {
	var bitMapData = new LBitmapData(imgList[character.name]);
	var charaWidth = bitMapData.image.width,
		charaHeight = bitMapData.image.height;
	var listChara = LGlobal.divideCoordinate(charaWidth, charaHeight, 4, 4);
	var chara = new LAnimationTimeline(bitMapData, listChara);
	chara.speed = 3;
	chara.x = character.position.x * imgCellWidth;
	chara.y = character.position.y * imgCellHeight;
	if(character.type === "hero"){
		player = chara;
		player.setLabel("ArrowLeft",2,0,1,true);
		player.setLabel("ArrowUp",3,0,1,true);
		player.setLabel("ArrowRight",1,0,1,true);
		player.setLabel("ArrowDown",0,0,1,true);
		playerInfo = character;
	}
	layers.chara.addChild(chara);
};

function layerInit() {
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
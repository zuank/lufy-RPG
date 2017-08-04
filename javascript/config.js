//图片path数组
var imgData = [{
  name: "map",
  /*地图*/
  path: "./images/map.png"
}, {
  name: "chara",
  /*人物*/
  path: "./images/chara.png"
}, {
  name: "goods",
  /*物品*/
  path: "./images/goods.png"
}, {
  name: "hero",
  /*物品*/
  path: "./images/hero.png"
}];
var configGoods = {
  'goods_0_0': {
    x: 0,
    y: 0,
    handel: function () {
      globalData.floor--;
      gameInfo.floor.text = '第' + globalData.floor + '层';
      drawInit();
    }
  },
  'goods_0_1': {
    x: 1,
    y: 0,
    handel: function () {
      globalData.floor++;
      gameInfo.floor.text = '第' + globalData.floor + '层';
      drawInit();
    }
  },
  'goods_0_2': {
    x: 2,
    y: 0
  },
  'goods_0_3': {
    x: 3,
    y: 0
  },
  'goods_1_0': {
    x: 0,
    y: 1,
    handel: function () {
      if (globalData.playerInfo.key.yellow > 0) {
        globalData.playerInfo.key.yellow--;
        gameInfo.keyYellow.text = '黄钥匙： ' + globalData.playerInfo.key.yellow;
        return true;
      } else {
        return false
      }
    }
  },
  'goods_1_1': {
    x: 1,
    y: 1,
    handel: function () {
      if (globalData.playerInfo.key.blue > 0) {
        globalData.playerInfo.key.blue--;
        gameInfo.keyBlue.text = '蓝钥匙： ' + globalData.playerInfo.key.blue;
        return true;
      } else {
        return false
      }
    }
  },
  'goods_1_2': {
    x: 2,
    y: 1,
    handel: function () {
      if (globalData.playerInfo.key.red > 0) {
        globalData.playerInfo.key.red--;
        gameInfo.keyRed.text = '红钥匙： ' + globalData.playerInfo.key.red;
        return true;
      } else {
        return false
      }
    }
  },
  'goods_1_3': {
    x: 3,
    y: 1
  },
  'goods_2_0': {
    x: 0,
    y: 2
  },
  'goods_2_1': {
    x: 1,
    y: 2
  },
  'goods_2_2': {
    x: 2,
    y: 2
  },
  'goods_2_3': {
    x: 3,
    y: 2
  },
  'goods_3_0': {
    x: 0,
    y: 3,
    handel: function () {
      globalData.playerInfo.key.yellow++;
      gameInfo.keyYellow.text = '黄钥匙： ' + globalData.playerInfo.key.yellow;
      return true;
    }
  },
  'goods_3_1': {
    x: 1,
    y: 3,
    handel: function () {
      globalData.playerInfo.key.blue++;
      gameInfo.keyBlue.text = '蓝钥匙： ' + globalData.playerInfo.key.blue;
      return true;
    }
  },
  'goods_3_2': {
    x: 2,
    y: 3,
    handel: function () {
      globalData.playerInfo.key.red++;
      gameInfo.keyRed.text = '红钥匙： ' + globalData.playerInfo.key.red;
      return true;
    }
  },
  'goods_3_3': {
    x: 3,
    y: 3
  },
  'goods_4_0': {
    x: 0,
    y: 4
  },
  'goods_4_1': {
    x: 1,
    y: 4
  },
  'goods_4_2': {
    x: 2,
    y: 4
  },
  'goods_4_3': {
    x: 3,
    y: 4
  },
  'goods_5_0': {
    x: 0,
    y: 5
  },
  'goods_5_1': {
    x: 1,
    y: 5
  },
  'goods_5_2': {
    x: 2,
    y: 5
  },
  'goods_5_3': {
    x: 3,
    y: 0
  },
}

var configChara = {
  'npc0': {
    y: 0
  },
  'npc1': {
    y: 1
  },
  'npc2': {
    y: 2
  },
  'npc3': {
    y: 3
  },
  'npc4': {
    y: 4
  },
  'npc5': {
    y: 5
  },
  'monster0': {
    y: 6
  },
  'monster1': {
    y: 7
  },
  'monster2': {
    y: 8
  },
  'monster3': {
    y: 9
  },
  'monster4': {
    y: 10
  },
  'monster5': {
    y: 11
  },
  'monster6': {
    y: 12
  },
  'monster7': {
    y: 13
  },
  'monster8': {
    y: 14
  },
  'monster9': {
    y: 15
  },
  'monster10': {
    y: 16
  },
  'monster11': {
    y: 17
  },
  'monster12': {
    y: 18
  },
  'monster13': {
    y: 19
  },
  'monster14': {
    y: 20
  },
  'monster15': {
    y: 21
  },
  'monster16': {
    y: 22
  },
  'monster17': {
    y: 23
  },
  'monster18': {
    y: 24
  },
  'monster19': {
    y: 25
  },
  'monster20': {
    y: 26
  },
  'monster21': {
    y: 27
  },
  'monster22': {
    y: 28
  },
  'monster23': {
    y: 29
  },
  'monster24': {
    y: 30
  },
  'monster25': {
    y: 31
  },
  'monster26': {
    y: 32
  }
}

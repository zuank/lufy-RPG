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
  /*英雄*/
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
    y: 0,
    handel: function () {
      globalData.playerInfo.ATK += 3;
      gameInfo.ATK.text = '攻击力： ' + globalData.playerInfo.ATK;
      return true;
    }
  },
  'goods_0_3': {
    x: 3,
    y: 0,
    handel: function () {
      globalData.playerInfo.DEF += 3;
      gameInfo.DEF.text = '防御力： ' + globalData.playerInfo.DEF;
      return true;
    }
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
    y: 2,
    handel: function () {
      globalData.playerInfo.HP += 200;
      gameInfo.HP.text = '生命值： ' + globalData.playerInfo.HP;
      return true;
    }
  },
  'goods_2_1': {
    x: 1,
    y: 2,
    handel: function () {
      globalData.playerInfo.HP += 500;
      gameInfo.HP.text = '生命值： ' + globalData.playerInfo.HP;
      return true;
    }
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
    y: 6,
    HP: 50,
    ATK: 20,
    DEF: 1,
    money: 1,
    XP: 1
  },
  'monster1': {
    y: 7,
    HP: 75,
    ATK: 15,
    DEF: 2,
    money: 2,
    XP: 2
  },
  'monster2': {
    y: 8,
    HP: 200,
    ATK: 35,
    DEF: 10,
    money: 5,
    XP: 5
  },
  'monster3': {
    y: 9,
    HP: 700,
    ATK: 250,
    DEF: 125,
    money: 32,
    XP: 30
  },
  'monster4': {
    y: 10,
    HP: 125,
    ATK: 50,
    DEF: 25,
    money: 10,
    XP: 7
  },
  'monster5': {
    y: 11,
    HP: 100,
    ATK: 200,
    DEF: 110,
    money: 30,
    XP: 25
  },
  'monster6': {
    y: 12,
    HP: 250,
    ATK: 120,
    DEF: 70,
    money: 20,
    XP: 17
  },
  'monster7': {
    y: 13,
    HP: 500,
    ATK: 400,
    DEF: 260,
    money: 47,
    XP: 45
  },
  'monster8': {
    y: 14,
    HP: 300,
    ATK: 75,
    DEF: 45,
    money: 13,
    XP: 10
  },
  'monster9': {
    y: 15,
    HP: 900,
    ATK: 450,
    DEF: 330,
    money: 50,
    XP: 50
  },
  'monster10': {
    y: 16,
    HP: 110,
    ATK: 25,
    DEF: 5,
    money: 5,
    XP: 4
  },
  'monster11': {
    y: 17,
    HP: 150,
    ATK: 40,
    DEF: 20,
    money: 8,
    XP: 6
  },
  'monster12': {
    y: 18,
    HP: 400,
    ATK: 90,
    DEF: 50,
    money: 15,
    XP: 12
  },
  'monster13': {
    y: 19,
    HP: 3333,
    ATK: 1200,
    DEF: 1133,
    money: 112,
    XP: 100
  },
  'monster14': {
    y: 20,
    HP: 100,
    ATK: 20,
    DEF: 5,
    money: 3,
    XP: 3
  },
  'monster15': {
    y: 21,
    HP: 150,
    ATK: 65,
    DEF: 30,
    money: 10,
    XP: 8
  },
  'monster16': {
    y: 22,
    HP: 550,
    ATK: 160,
    DEF: 90,
    money: 25,
    XP: 20
  },
  'monster17': {
    y: 23,
    HP: 30000,
    ATK: 1700,
    DEF: 1500,
    money: 250,
    XP: 220
  },
  'monster18': {
    y: 24,
    HP: 850,
    ATK: 350,
    DEF: 200,
    money: 45,
    XP: 40
  },
  'monster19': {
    y: 25,
    HP: 900,
    ATK: 750,
    DEF: 650,
    money: 77,
    XP: 70
  },
  'monster20': {
    y: 26,
    HP: 450,
    ATK: 150,
    DEF: 90,
    money: 22,
    XP: 19
  },
  'monster21': {
    y: 27,
    HP: 1250,
    ATK: 500,
    DEF: 400,
    money: 55,
    XP: 55
  },
  'monster22': {
    y: 28,
    HP: 1500,
    ATK: 560,
    DEF: 460,
    money: 60,
    XP: 60
  },
  'monster23': {
    y: 29,
    HP: 500,
    ATK: 115,
    DEF: 65,
    money: 15,
    XP: 15
  },
  'monster24': {
    y: 30,
    HP: 1300,
    ATK: 300,
    DEF: 150,
    money: 40,
    XP: 35
  },
  'monster25': {
    y: 31,
    HP: 1200,
    ATK: 620,
    DEF: 520,
    money: 65,
    XP: 75
  },
  'monster26': {
    y: 32,
    HP: 2000,
    ATK: 680,
    DEF: 590,
    money: 70,
    XP: 65
  },
  'monster27': {
    y: 33,
    HP: 2400,
    ATK: 2612,
    DEF: 2400,
    money: 146,
    XP: 125
  },
  'monster28': {
    y: 34,
    HP: 3000,
    ATK: 2212,
    DEF: 1946,
    money: 132,
    XP: 116
  },
  'monster29': {
    y: 35,
    HP: 15000,
    ATK: 1000,
    DEF: 1000,
    money: 100,
    XP: 100
  }
}

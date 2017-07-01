
/*
* monsterType 为当前图片的序列号 用于mainjs的动画指定
* monsterInfo 按图片区分怪物信息 并且给定属性
* character 存储需要绘制的人物怪物等的信息
* 其中 ****Type 对应的是素材中的位置
* 所以对应雪碧图的为对象{x,y}
* name 对应的是加载图片后的命名
* */
/*
* key
* x, y
* 0,0 普通黄钥匙
* 0,1 普通蓝钥匙
* 0,2 普通红钥匙
*
* */
var globalData = {
    mapCol: 11,
    mapRow: 11,
    size: 32,
    floor: 1,
    playerInfo: {
        LifeValue: 1000,
        Aggressivity: 20,
        DefenseForce: 5,
        status: 'ArrowDown',
        key: {
            yellow: 0,
            blue: 0,
            red: 0
        }
    },
    monsterInfo: {
        monster01: [{
            LifeValue: 100,
            Aggressivity: 10,
            DefenseForce: 10
        }, {
            LifeValue: 100,
            Aggressivity: 20,
            DefenseForce: 10
        }]
    },
    data: [{
        map: [
            [1, 2, 2, 2, 2, 0, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 0, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 0, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 0, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 0, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 0, 2, 2, 2, 2, 1],
            [1, 1, 2, 2, 2, 0, 2, 2, 2, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
            [3, 1, 3, 1, 0, 0, 0, 1, 3, 1, 3],
            [3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3],
            [3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3]
        ],
        // 存储怪物的属性 绘制时进行赋值
        // 知识点：绘制的顺序会影响z-index
        character: [{
            name: "upFloor",
            type: "floor",
            show: true,
            floorType: 1,
            position: {
                x: 5,
                y: 0
            }
        }, {
            name: "hero",
            type: "hero",
            show: true,
            position: {
                x: 5,
                y: 8
            }
        }, {
            name: "npc1",
            type: "npc",
            show: true,
            npcType: 3,
            position: {
                x: 4,
                y: 8
            }
        }]
    }, {
        map: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
            [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0],
            [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1],
            [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]
        ],
        // 存储怪物的属性 绘制时进行赋值
        character: [{
            name: "upFloor",
            type: "floor",
            show: true,
            floorType: 1,
            position: {
                x: 0,
                y: 0
            }
        }, {
            name: "downFloor",
            type: "floor",
            floorType: -1,
            show: true,
            position: {
                x: 5,
                y: 10
            }
        }, {
            name: "key",
            type: "key",
            keyType: {
                x: 2,
                y: 0
            },
            show: true,
            position: {
                x: 4,
                y: 9
            }
        }, {
            name: "key",
            type: "key",
            keyType: {
                x: 0,
                y: 0
            },
            show: true,
            position: {
                x: 2,
                y: 9
            }
        }, {
            name: "key",
            type: "key",
            keyType: {
                x: 0,
                y: 0
            },
            show: true,
            position: {
                x: 2,
                y: 10
            }
        }, {
            name: "key",
            type: "key",
            keyType: {
                x: 0,
                y: 0
            },
            show: true,
            position: {
                x: 2,
                y: 0
            }
        }, {
            name: "key",
            type: "key",
            keyType: {
                x: 0,
                y: 0
            },
            show: true,
            position: {
                x: 7,
                y: 2
            }
        }, {
            name: "key",
            type: "key",
            keyType: {
                x: 0,
                y: 0
            },
            show: true,
            position: {
                x: 7,
                y: 3
            }
        }, {
            name: "key",
            type: "key",
            keyType: {
                x: 0,
                y: 0
            },
            show: true,
            position: {
                x: 0,
                y: 3
            }
        }, {
            name: "key",
            type: "key",
            keyType: {
                x: 0,
                y: 0
            },
            show: true,
            position: {
                x: 0,
                y: 5
            }
        }, {
            name: "key",
            type: "key",
            keyType: {
                x: 1,
                y: 0
            },
            show: true,
            position: {
                x: 2,
                y: 6
            }
        }, {
            name: "key",
            type: "key",
            keyType: {
                x: 0,
                y: 0
            },
            show: true,
            position: {
                x: 8,
                y: 9
            }
        }, {
            name: "key",
            type: "key",
            keyType: {
                x: 0,
                y: 0
            },
            show: true,
            position: {
                x: 8,
                y: 10
            }
        }, {
            name: "key",
            type: "key",
            keyType: {
                x: 0,
                y: 0
            },
            show: true,
            position: {
                x: 9,
                y: 10
            }
        }, {
            name: "key",
            type: "key",
            keyType: {
                x: 0,
                y: 0
            },
            show: true,
            position: {
                x: 10,
                y: 10
            }
        }, {
            name: "key",
            type: "key",
            keyType: {
                x: 1,
                y: 0
            },
            show: true,
            position: {
                x: 10,
                y: 9
            }
        }, {
            name: "door",
            type: "door",
            doorType: 2,
            show: true,
            position: {
                x: 5,
                y: 8
            }
        },{
            name: "door",
            type: "door",
            doorType: 0,
            show: true,
            position: {
                x: 3,
                y: 2
            }
        },{
            name: "door",
            type: "door",
            doorType: 0,
            show: true,
            position: {
                x: 1,
                y: 4
            }
        },{
            name: "door",
            type: "door",
            doorType: 0,
            show: true,
            position: {
                x: 1,
                y: 7
            }
        },{
            name: "door",
            type: "door",
            doorType: 0,
            show: true,
            position: {
                x: 5,
                y: 5
            }
        },{
            name: "door",
            type: "door",
            doorType: 0,
            show: true,
            position: {
                x: 9,
                y: 8
            }
        }, {
            name: "monster1",
            type: "monster",
            monsterType: 0,
            show: true,
            position: {
                x: 3,
                y: 0
            }
        }, {
            name: "monster1",
            type: "monster",
            monsterType: 1,
            show: true,
            position: {
                x: 4,
                y: 0
            }
        }, {
            name: "monster1",
            type: "monster",
            monsterType: 0,
            show: true,
            position: {
                x: 5,
                y: 0
            }
        }, {
            name: "monster1",
            type: "monster",
            monsterType: 0,
            show: true,
            position: {
                x: 7,
                y: 5
            }
        }, {
            name: "monster1",
            type: "monster",
            monsterType: 2,
            show: true,
            position: {
                x: 8,
                y: 4
            }
        }, {
            name: "monster2",
            type: "monster",
            monsterType: 0,
            show: true,
            position: {
                x: 6,
                y: 5
            }
        }, {
            name: "monster3",
            type: "monster",
            monsterType: 0,
            show: true,
            position: {
                x: 9,
                y: 9
            }
        }, {
            name: "monster4",
            type: "monster",
            monsterType: 0,
            show: true,
            position: {
                x: 2,
                y: 2
            }
        }, {
            name: "monster4",
            type: "monster",
            monsterType: 0,
            show: true,
            position: {
                x: 1,
                y: 3
            }
        }, {
            name: "monster4",
            type: "monster",
            monsterType: 1,
            show: true,
            position: {
                x: 1,
                y: 5
            }
        }, {
            name: "monster4",
            type: "monster",
            monsterType: 1,
            show: true,
            position: {
                x: 1,
                y: 8
            }
        }, {
            name: "monster5",
            type: "monster",
            monsterType: 0,
            show: true,
            position: {
                x: 8,
                y: 5
            }
        }, {
            name: "hero",
            type: "hero",
            show: true,
            position: {
                x: 5,
                y: 9
            }
        }]
    }]
}

// monsterType 为当前图片的序列号 用于mainjs的动画指定
// monsterInfo 按图片区分怪物信息 并且给定属性
var globalData = {
    mapCol: 11,
    mapRow: 11,
    size: 32,
    floor: 0,
    playerInfo: {
        LifeValue: 1000,
        Aggressivity: 20,
        DefenseForce: 5
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
            },
            status: "ArrowUp"
        }, {
            name: "hero",
            type: "hero",
            show: true,
            position: {
                x: 5,
                y: 8
            },
            status: "ArrowUp"
        },{
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
            name: "monster01",
            type: "monster",
            monsterType: 0,
            show: true,
            position: {
                x: 1,
                y: 0
            }
        }, {
            name: "monster01",
            type: "monster",
            monsterType: 1,
            show: true,
            position: {
                x: 2,
                y: 0
            }
        }, {
            name: "monster01",
            type: "monster",
            monsterType: 0,
            show: true,
            position: {
                x: 3,
                y: 0
            }
        }, {
            name: "hero",
            type: "hero",
            show: true,
            position: {
                x: 5,
                y: 10
            },
            status: "ArrowUp"
        }]
    }]
}

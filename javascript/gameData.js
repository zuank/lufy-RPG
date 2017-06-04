// monsterType 为当前图片的序列号 用于mainjs的动画指定
// monsterInfo 按图片区分怪物信息 并且给定属性
var globalData = {
    mapCol: 11,
    mapRow: 11,
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
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
            [2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2],
            [2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2],
            [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2],
            [2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2],
            [2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 2],
            [1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 1, 1, 2, 1, 1, 1, 2, 1],
            [2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2],
            [2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2]
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

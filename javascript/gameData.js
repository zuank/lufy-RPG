var monsterInfo={

};
var globalData = {
    mapCol:11,
    mapRow:11,
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
        character: [
            {
                name: "monster01",
                type: "monster",
                monsterType:0,
                show: true,
                position: 
                {
                    x: 1,
                    y: 0
                }
            },
            {
                name: "monster01",
                type: "monster",
                monsterType:1,
                show: true,
                position: 
                {
                    x: 2,
                    y: 0
                }
            },
            {
                name: "monster01",
                type: "monster",
                monsterType:0,
                show: true,
                position: 
                {
                    x: 3,
                    y: 0
                }
            },
            {
                name: "hero",
                type: "hero",
                show: true,
                position: {
                    x: 5,
                    y: 10
                },
                status:"ArrowUp"
            }
        ]
    }]
}
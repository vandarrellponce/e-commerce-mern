const price = [
    {
        "_id": 0,
        "name": "Any",

    },
    {
        "_id": 1,
        "name": "P49 to PHP P99",
        "range": {$gte: 49, $lte: 99}
    },
    {
        "_id": 2,
        "name": "P100 to P149",
        "range": {$gte: 100, $lte: 149}
    },
    {
        "_id": 3,
        "name": "P150 to P199",
        "range": {$gte: 150, $lte: 199}
    }
]

export {
    price 
}
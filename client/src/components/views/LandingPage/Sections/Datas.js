const continents = [
{
    "_id" : 1,
    "name" : "Cosmetics"
},
{
    "_id" : 2,
    "name" : "Food"
},
{
    "_id" : 3,
    "name" : "Dessert"
},
{
    "_id" : 4,
    "name" : "Necessities"
},
{
    "_id" : 5,
    "name" : "Pet snacks"
}
]

const price = [
    {
        "_id" : 0,
        "name" : "전체",
        "array" : []
    },
    {
        "_id" : 1,
        "name" : "~5,000",
        "array" : [0, 5000]
    },
    {
        "_id" : 2,
        "name" : "~10,000",
        "array" : [5001, 10000]
    },
    {
        "_id" : 3,
        "name" : "~20,000",
        "array" : [10001, 20000]
    },
    {
        "_id" : 4,
        "name" : "~30,000",
        "array" : [20001, 30000]
    },
    {
        "_id" : 5,
        "name" : "~50,000",
        "array" : [30001, 50000]
    },
    
]

export {
    continents,
    price
}
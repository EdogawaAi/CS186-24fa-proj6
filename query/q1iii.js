// Task 1iii

db.ratings.aggregate([
    // TODO: Write your query here
    {
        $group: {
            _id: "$rating",
            count: {$sum: 1},
        }
    },
    {
        $sort: {
            // _id: "$rating",
            _id: -1
        }
    },
    {
        $project: {
            count: 1,
            rating: "$_id",
            _id: 0
        }
    }
]);
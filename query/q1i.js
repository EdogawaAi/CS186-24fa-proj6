// Task 1i

db.keywords.aggregate([
    {
        $match: {
            keywords: {
                $elemMatch: {
                    // name: {$in: ["mickey mouse", "marvel comic"]}
                    $or: [
                        {name: "mickey mouse"},
                        {name: "marvel comic"}
                    ]
                }
            }
        }
    },
    {
        $project: {
            movieId: 1,
            _id: 0
        }
    },
    {
        $sort: {
            movieId: 1
        }
    }
]);
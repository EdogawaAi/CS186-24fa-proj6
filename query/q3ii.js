// Task 3ii

db.credits.aggregate([
    // TODO: Write your query here
    {
        $match: {
            crew: {
                $elemMatch: {
                    id: 5655,
                    job: "Director"
                }
            }
        }
    },
    {
        $unwind: "$cast"
    },
    {
        $group: {
            _id: {
                id: "$cast.id",
                name: "$cast.name"
            },
            count: {$sum: 1}
        }
    },
    {
        $project: {
            _id: 0,
            id: "$_id.id",
            name: "$_id.name",
            count: 1
        }
    },
    {
        $sort: {
            count: -1,
            id: 1
        }
    },
    {
        $limit: 5
    }
]);
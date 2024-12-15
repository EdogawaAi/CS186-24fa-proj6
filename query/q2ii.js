// Task 2ii

db.movies_metadata.aggregate([
    // TODO: Write your query here
    {
        $project: {
            _id: 0,
            tagline: 1,
        }
    },
    {
        $addFields: {
            words: {
                $split: ["$tagline", " "]
            }
        }
    },
    {
        $unwind: "$words"
    },
    {
        $addFields: {
            word: {
                $toLower: {
                    $trim: {
                        input: "$words",
                        chars: ".,!?"
                    }
                }
            }
        }
    },
    {
        $match: {
            $expr: {
                $gt: [
                    {$strLenCP: "$word"},
                    3
                ]
            }
        }
    },
    {
        $group: {
            _id: "$word",
            count: {$sum: 1}
        }
    },
    {
        $sort: {
            count: -1,
        }
    },
    {
        $limit: 20
    }
]);
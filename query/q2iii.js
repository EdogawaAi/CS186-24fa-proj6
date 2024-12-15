// Task 2iii

db.movies_metadata.aggregate([
    // TODO: Write your query here
    {
        $project: {
            budget: {
                $cond: [
                    {
                        $or: [
                            {$eq: ["$budget", false]},
                            {$eq: ["$budget", null]},
                            {$eq: ["$budget", ""]},
                            {$eq: [{$type: "$budget"}, "missing"]}
                        ]
                    },
                    "unknown",
                    {
                        $cond: [
                            {$isNumber: "$budget"},
                            "$budget",
                            {
                                $toInt: {
                                    $cond: [
                                        {$regexMatch: {
                                            input: {$toString: "$budget"},
                                            regex: /^\$/
                                        }},
                                        {$substr: [{$toString: "$budget"}, 1, -1]},
                                        {
                                            $cond: [
                                                {$regexMatch: {
                                                    input: {$toString: "$budget"},
                                                    regex: /\sUSD$/
                                                }},
                                                {$substr: [{$toString: "$budget"}, 0, {$subtract: [{$strLenCP: {$toString: "$budget"}}, 4]}]},
                                                {$toString: "$budget"}
                                            ]
                                        }
                                    ] 
                                }
                            }
                        ]
                    }
                ]
            }
        }
    },
    {
        $group: {
            _id: {
                $cond: [
                    {$eq: ["$budget", "unknown"]},
                    "unknown",
                    {$round: [{$divide: ["$budget", 10000000]}, 0]}
                ]
            },
            count: {$sum: 1}
        }
    },
    {
        $project: {
            _id: 0,
            budget: {
                $cond: [
                    {$eq: ["$_id", "unknown"]},
                    "unknown",
                    {$multiply: ["$_id", 10000000]}
                ]
            },
            count: 1
        }
    },
    {
        $sort: {
            budget: 1
        }
    }
]);
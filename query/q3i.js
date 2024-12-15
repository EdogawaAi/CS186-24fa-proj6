// Task 3i

db.credits.aggregate([
    // TODO: Write your query here
    {
        $unwind: "$cast"
    },
    {
        
        $match: {
            "cast.id": 7624
        }
    },
    {
        $lookup: {
            from: "movies_metadata", // collection to join
            localField: "movieId", // field from credits
            foreignField: "movieId", // field from movies_metadata
            as: "movie_info" // output array
        }
    },
    {
        $unwind: "$movie_info"
    },
    {
        $project: {
            _id: 0,
            title: "$movie_info.title",
            release_date: "$movie_info.release_date",
            character: "$cast.character"
        }
    },
    {
        $sort: {
            release_date: -1
        }
    }
]);
function getComposer(book) {
  console.log(book);
  return [
    { $group: {
        _id: { book: "$book" },
        composers: { $addToSet: "$composer" },
      }
    },
    {
      $match: {
        "_id.book": { $in: book }
      }
    },
    {
      "$group": {
        "_id": 0,
        "sets": { "$push": "$composers" },
        "initialSet": { "$first": "$composers" }
      }
    },
    {
      "$project": {
        "setComposers": {
          "$reduce": {
            "input": "$sets",
            "initialValue": "$initialSet",
            "in": { "$setIntersection": ["$$value", "$$this"] }
          }
        }
      }
    }
  ]
}

function getBook(composer) {
  console.log(composer);
  return [
    { $group: {
        _id: { composer: "$composer" },
        books: { $addToSet: "$book" },
      }
    },
    {
      $match: {
        "_id.composer": { $in: composer }
      }
    },
    {
      "$group": {
        "_id": 0,
        "sets": { "$push": "$books" },
        "initialSet": { "$first": "$books" }
    }
    },
    {
      "$project": {
        "setBooks": {
          "$reduce": {
            "input": "$sets",
            "initialValue": "$initialSet",
            "in": { "$setIntersection": ["$$value", "$$this"] }
          }
        }
      }
    }
  ]
}

module.exports = {
  getComposer,
  getBook
}

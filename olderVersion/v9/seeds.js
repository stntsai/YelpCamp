var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment")

var data = [{
        name: "xxxxx",
        image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        description: "sdfsdsdfsdf"
    },
    {
        name: "yyyyyy",
        image: "https://outdoorgearlab-mvnab3pwrvp3t0.stackpathdns.com/photos/12/25/244011_24354_XL.jpg",
        description: "sdfsdsdfsdf"
    },
    {
        name: "zzzzzz",
        image: "https://ak.picdn.net/offset/photos/54a2e01aa6dfde507e9fcfd2/medium/offset_171435.jpg",
        description: "sdfsdsdfsdf"
    }
]

function seedDB() {
    // remove all campgrounds
    Campground.deleteMany({}, function(err) {
        // if (err) {
        //     console.log(err)
        // }
        // console.log("remove campgrounds!")
        // data.forEach(function(seed) {
        //     Campground.create(seed, function(err, campground) {
        //         if (err) {
        //             console.log(err)
        //         } else {
        //             console.log("added a campground!")
        //             Comment.create({
        //                 text: "This place is shxt",
        //                 author: "Homer"
        //             }, function(err, comment) {
        //                 if (err) {
        //                     console.log(err)
        //                 } else {
        //                     campground.comments.push(comment)
        //                     campground.save()
        //                     console.log("created new comment")
        //                 }
        //             })
        //         }
        //     })
        // })
    })
}

module.exports = seedDB
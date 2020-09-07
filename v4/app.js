var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds")

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")
seedDB()

var campgrounds = [
    { name: "你家後院", image: "https://ik.imagekit.io/tvlk/apr-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/hotels/13000000/12860000/12856800/12856793/4ee053d6_z.jpg?tr=q-40,c-at_max,w-740,h-500&_src=imagekit" }
]

app.get("/", function(req, res) {
    res.render("landing")
})

app.get("/campgrounds", function(req, res) {
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err)
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    })
})

app.post("/index", function(req, res) {
    var name = req.body.name
    var image = req.body.image
    var desc = req.body.description
    var newCampground = { name: name, image: image, description: desc }
        //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/index")
        }
    })
})

//NEW
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new")
})

//SHOW
app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err)
        } else {
            res.render("campgrounds/show", { campground: foundCampground })
        }
    })
})


//==================
// COMMENTS ROUTES
//==================
app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err)
        } else {
            res.render("comments/new", { campground: campground })
        }
    })
})

app.post("/campgrounds/:id/comments", function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err)
            res.redirect("/campgrounds")
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err)
                } else {
                    campground.comments.push(comment)
                    campground.save()
                    res.redirect("/campgrounds/" + campground._id)
                }
            })
        }
    })
})


app.listen(3000, function() {
    console.log("YelpCamp Server Is Listening")
})
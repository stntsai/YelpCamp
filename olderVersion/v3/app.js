var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
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

app.get("/index", function(req, res) {
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err)
        } else {
            res.render("index", { campgrounds: allCampgrounds });
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

app.get("/campgrounds/new", function(req, res) {
    res.render("new")
})

//SHOW
app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err)
        } else {
            res.render("show", { campground: foundCampground })
        }
    })
})


app.listen(3000, function() {
    console.log("YelpCamp Server Is Listening")
})

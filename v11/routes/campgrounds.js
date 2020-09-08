var express = require("express")
var router = express.Router()
var Campground = require("../models/campground")
var middleware = require("../middleware")

//show all campgrounds
router.get("/", function(req, res) {
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err)
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds});
        }
    })
})

//create campgrounds
router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name
    var image = req.body.image
    var desc = req.body.description
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = { name: name, image: image, description: desc, author: author }
        //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err)
        } else {
            // console.log(newlyCreated)
            res.redirect("/campgrounds")
        }
    })
})

//NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new")
})

//SHOW
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        res.render("campgrounds/show", { campground: foundCampground })
    })
})

//Edit campground routes
router.get("/:id/edit", middleware.checkCampgroundOwnership,function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground})
    })
})

//Update campround routes
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds")
        }else{
            req.flash("success", "Campground modified")
            res.redirect("/campgrounds/"+ req.params.id)
        }
    })
})

//Destroy campground routes
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndDelete(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds")
        }else{
            req.flash("success", "Campground deleted")
            res.redirect("/campgrounds")
        }
    })
})

module.exports = router
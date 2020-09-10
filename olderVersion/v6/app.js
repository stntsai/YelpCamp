var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds")

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
seedDB()

//Passport configuration
app.use(require("express-session")({
    secret: "I am the KING!",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req, res, next) {
    res.locals.currentUser = req.user
    next()
})

app.get("/", function(req, res) {
    res.render("landing")
})

app.get("/campgrounds", function(req, res) {
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err)
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds});
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
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err)
        } else {
            res.render("comments/new", { campground: campground })
        }
    })
})

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
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


// ============
// Authentication Routes
// ============

//show register form
app.get("/register", function(req, res) {
    res.render("register")
})

app.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username })
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err)
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/campgrounds")
        })
    })
})

//show login form
app.get("/login", function(req, res) {
    res.render("login")
})

//handling login: use middleware!!!!
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {})

//logout route
app.get("/logout", function(req, res) {
    req.logOut()
    res.redirect("/campgrounds")
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
}

app.listen(3000, function() {
    console.log("YelpCamp Server Is Listening")
})
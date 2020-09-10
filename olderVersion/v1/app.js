var express = require("express")
var app = express()
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")

var campgrounds = [
    { name: "合歡小溪營地", image: "https://cdntwrunning.biji.co/800_c763097e54d25888a738e7705bc78359408982573beec509906a8c7580049fd3.jpg" },
    { name: "阿里山眠月線", image: "https://i.ytimg.com/vi/5n0gbTeceBw/maxresdefault.jpg" },
    { name: "南澳海蝕洞", image: "https://www.tripsavvy.com/thmb/ekAcrsKGhqVjsQvxnMJpjv1ymvw=/2137x1403/filters:fill(auto,1)/sunrise-camping--676019412-5b873a5a46e0fb0050f2b7e0.jpg" },
    { name: "你家後院", image: "https://ik.imagekit.io/tvlk/apr-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/hotels/13000000/12860000/12856800/12856793/4ee053d6_z.jpg?tr=q-40,c-at_max,w-740,h-500&_src=imagekit" }
]

app.get("/", function(req, res) {
    res.render("landing")
})

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", { campgrounds: campgrounds });
})

app.post("/campgrounds", function(req, res) {
    var name = req.body.name
    var image = req.body.image
    var newCampground = { name: name, image: image }
    campgrounds.push(newCampground)
    res.redirect("/campgrounds")
})

app.get("/campgrounds/new", function(req, res) {
    res.render("new")
})


app.listen(3000, function() {
    console.log("YelpCamp Server Is Listening")
})
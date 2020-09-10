# [YelpCamp](https://warm-retreat-17606.herokuapp.com/)
A website where users can create accounts and log in to create, modify, and delete new campgrounds as well as to conduct those actions for reviews.  




## v13: Google Maps and Others
### Google Maps
* Add Google Maps Javascript API
* Create space for Maps and show maps feature
* Add locations to campgroundsSchema
### Other Improvements
* UI improvements for Login and Register Page
* Add Fuzzy Search feature
* Add "Time since created" with Moment JS 



## v12: Landing Page Refactor & Deploy
* Update landing page css
* Add pictures and animation to landing page
* Add Dynamic price feature
* Deploy YelpCamp on Heroku with DB links to MongoDB Atlas



## v11: Adding in Flash (error messages)
* Demo working version
* Install and configure connect-flash
* Add bootstrap alert to header



## v10: Edit & Delete Campgrounds/ Comments
### Editing Campgrounds
* Add Method-Override
* Add Edit Route for campgrounds
* Add link to Edit Page
* Add Update Route 
* Fix $set problem
### Deleting Campgrounds
* Add Destroy Route
* Add Delete button
### Authorization Pt.1: Campgrounds 
* User can only edit/ delete his/her campgrounds
* Hide/show edit/ delete buttons
### Editing Comments
* Add Edit Route for comments
* Add Edit button
* Add Update route
### Deleting Comments
* Add Destroy Route
* Add Delete button
### Authorization Pt.2: Comment 
* User can only edit/ delete his/her comments
* Hide/show edit/ delete buttons
* Refactor middleware



## v9: Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground



## v8: Users + Comments
* Associates users and comments
* Save author's name to a comment automatically



## v7:
* Refactor app.js    
* Split campground, comment, index routes to 'routes/' directory



## v6:
* Use passport & passport-local to add "register" and "login" features



## v5:
* Update campground show page attributes
* Show/hide auth links in navbar
* Update comment show info: add author/ comment time
* Apply css to header.ejs



## v4: 
* Add comment routes to app.js
* Refactor new/get/post comment routes and pages from those of campgrounds



## v3:
* Update campgrounds show page to include comment area
* Adding commentSchema into models
* Create comments logic in app.js
* Place seeds() to eliminate and create campgrounds every time



## v2:  
* Mongodb connection (local)
* Setup campgrounds schema
* Create campgrounds logic in app.js



## v1:  
* Create landing page 
* Create Campgrounds showing page
* Create new campground adding page



## Acknowledgement:
The project is built along with Colt Steele's course on Udemy 

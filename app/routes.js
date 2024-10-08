//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
router.post('/animal-selection', function(request, response) {
    var route = request.session.data['route']
    if (route == "UpcomingBooking" && request.headers.referer.lastIndexOf('?route=UpcomingBooking') > 0)  
    {
        response.redirect("/booking")
    } else 
    {
        response.redirect("/animal-selection")
    }
})

router.post('/arrival-time', function(request, response) {
    var route = request.session.data['route']
    if (route == "UpcomingBooking" && request.headers.referer.lastIndexOf('?route=UpcomingBooking') > 0)  
    {
        response.redirect("/check-answers")
    } else 
    {
        response.redirect("/arrival-time")
    }
})

router.post('/animal-number', function(request, response) {
    var route = request.session.data['route']
    if (route == "UpcomingBooking" && request.headers.referer.lastIndexOf('?route=UpcomingBooking') > 0)  
    {
        response.redirect("/booking")
    } else 
    {
        response.redirect("/animal-number")
    }
})

router.post('/BreakAllDay-answer', function(request, response) {

    var BreakAllDay = request.session.data['BreakAllDay']
    if (BreakAllDay == "AllDay"){
        response.redirect("/admin/breaks-end-date")
    } 
    else 
    {
        response.redirect("/admin/breaks-time")
    }
})

router.post('location', function(request, response) {

    var checkLocation = request.session.data['whereDoYouLive']
    if (checkLocation == "england"){
        response.redirect("location")
    } else {
        // redirect to an exit page TBD
        response.redirect("sign-in") 
    }
})

// Nifty routing for handling versioning very cleanly

// GET route for rendering the page
router.get('/:version/:page', function (req, res) {
  const version = req.params.version;
  const page = req.params.page;

  // When you add a new version, make sure to add to this array
  const validVersions = ['v1', 'v2'];

  if (validVersions.includes(version)) {
    res.render(`${version}/${page}`);
  } else if (version === 'admin') {
    // Check if it's admin within a version or just admin folder
    if (validVersions.includes(page)) {
      res.render(`${page}/admin`);
    } else {
      res.render(`admin/${page}`);
    }
  } else {
    res.status(404).send('Version not found');
  }
});

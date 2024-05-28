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


Charlie do some stuff here to do the routes.
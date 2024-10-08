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

router.post('/location', function(request, response) {

    var checkLocation = request.session.data['whereDoYouLive']
    if (checkLocation == "england"){
        response.redirect("/location")
    } else {
        // redirect to an exit page TBD
        response.redirect("/sign-in") 
    }
})
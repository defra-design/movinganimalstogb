//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

/*

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

*/

// Updated routes for regular pages to handle versioned and root pages

// Utility function to handle redirection based on session data and referrer
function handleRouteRedirect(req, res, basePath, routeRedirect, defaultRedirect) {
  const route = req.session.data['route'];

  if (route == "UpcomingBooking" && req.headers.referer.includes('?route=UpcomingBooking')) {
    res.redirect(`${basePath}${routeRedirect}`);
  } else {
    res.redirect(`${basePath}${defaultRedirect}`);
  }
}

// Utility function for BreakAllDay redirection logic
function handleBreakAllDayRedirect(req, res) {
  const BreakAllDay = req.session.data['BreakAllDay'];

  if (BreakAllDay == "AllDay") {
    res.redirect("/admin/breaks-end-date");
  } else {
    res.redirect("/admin/breaks-time");
  }
}

// POST route for versioned and non-versioned animal-selection
router.post(['/:version/animal-selection', '/animal-selection'], function (req, res) {
  const version = req.params.version || '';
  handleRouteRedirect(req, res, version ? `/${version}` : '', '/booking', '/animal-selection');
});

// POST route for versioned and non-versioned arrival-time
router.post(['/:version/arrival-time', '/arrival-time'], function (req, res) {
  const version = req.params.version || '';
  handleRouteRedirect(req, res, version ? `/${version}` : '', '/check-answers', '/arrival-time');
});

// POST route for versioned and non-versioned animal-number
router.post(['/:version/animal-number', '/animal-number'], function (req, res) {
  const version = req.params.version || '';
  handleRouteRedirect(req, res, version ? `/${version}` : '', '/booking', '/animal-number');
});

// POST route for BreakAllDay-answer (admin-specific logic)
router.post(['/admin/BreakAllDay-answer', '/:version/admin/BreakAllDay-answer'], function (req, res) {
  handleBreakAllDayRedirect(req, res);
});

// Each route needs a version for root paths and inside versioned folders like this

// Utility function to handle redirects based on location and version
function handleLocationRedirect(req, res, version = '') {
  const checkLocation = req.session.data['whereDoYouLive'];

  // Determine the path prefix (either versioned or root)
  const pathPrefix = version ? `/${version}` : '';

  if (checkLocation == "england") {
    res.redirect(`${pathPrefix}/location`);
  } else {
    // Redirect to the sign-in page (or another exit page) within the correct path
    res.redirect(`${pathPrefix}/sign-in`);
  }
}

// POST route for versioned and non-versioned location handling
router.post(['/:version/location', '/location'], function (req, res) {
  const version = req.params.version;

  // Valid versions array
  const validVersions = ['v1', 'v2'];

  if (version && validVersions.includes(version)) {
    handleLocationRedirect(req, res, version);
  } else if (!version) {
    handleLocationRedirect(req, res);
  } else {
    res.status(404).send('Version not found');
  }
});

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

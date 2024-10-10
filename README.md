# When making new changes

1. Open Github Desktop, the third tab button along allows you to 'Pull Origin' - this is taking a copy of the latest version of the main branch from Github. 

2. Open your terminal, type cd[location of where you files are on your desktop computer]. For example: cd Documents/prototypes/movinganimalstogb.

3. Then type npm run dev. This should say the site is running at localhost.com/3000.

4. Open all of your prototype files in Sublime text. Make the changes you wish to make. Take a look at them in your browser window at the local host address.

5. Once you're happy with the changes, push to main, in the Github desktop app. You may need to notify a team member to merge the changes in or push it.

6. Go to: https://moving-animals-to-gb-f6ffdaf23605.herokuapp.com/arrival-time to check the changes are live.

# Update 10/10/24 This prototype now supports versioning 

Simple versioning has been added to this prototype to separate the current (MVP) state of the service and new iterations in the (v1, v2, v3 etc) versions. Routing is handled dynamically, just update the route.js file to reflect any folder versions you would like to support.

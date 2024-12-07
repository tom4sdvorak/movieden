This is a React front-end project for course Full Stack Development, levaraging Express API developed as part of previous project.
Several components and their designs in this project are from Materiul UI library.

Its using these previously developed API calls:
- api/getall in Movie Gallery showing all movie entries in DB
- api/:id in Random Movie generator fetching movie data by ID randomly picked from list of IDs in DB
- api/add in Add Movie form
- api/update/:id in prefilled (with selected movie data) version of Add Movie form updating it
- api/delete/:id as an action inside Movie Gallery to delete selected movie
The URL to the API is defined in apiconfig.js file.
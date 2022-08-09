## Frontend Coding Challenge - Vikas Ranjan - Notes

Dear team,

Thanks a lot for giving me this opportunity to take up the challenge and be a part of this process.
Please find some information below to help you understand what are the features that I have developed, how have I designed the project and why have I made certain choices.

For easy walkthrough, I will divide the points in these major categories.

-   Functional specifications
-   Non Functional specifications
-   Code Structure
-   Tech choices
-   Unit tests
-   Further Improvements which could be done later

Apart from developing the features, I have also paid attention to :-

-   Best practices and clean code (used ESLint, Prettier)
-   Code readability and maintainability
-   Beautiful UI/UX and styling
-   Mobile responsive
-   Performance improvements
-   Security
-   Accessibility

# Application Demo

Unfortunately, I tried deploying the app on Heroku but it has been giving me some error for a long time.
Hence, please see the DEMO attached here: https://www.loom.com/share/8141a29e28b04bc5b019c053937a7c33

I would also recommend local setup of the application to run and test it.

# How to run the code locally?

-   Please take a clone of the main branch of this repo on your local system
-   Run npm install in your terminal
-   Run npm start to start the server
-   The server should start running on localhost:3000 by default

# Functional details (that I have implemented)

-   [x] Build a simple editable profile page that represents a candidate's basic information and work experience.
-   [x] Basic details section - Name, age, location, Profile picture.
-   [x] Job experiences section where candidate can upload all job experiences of their career
-   [x] Each job experience has - Start date, End date, Job title, Company, Company logo
        Job description, skills
-   [x] The Job experiences are sorted by their starting date, with more recent experience at the top
-   [x] A current position option is allowed
-   [x] Input validation for start dates, end dates
-   [x] Input validation for new skills being added
-   [x] The page should work in offline mode too.
-   [x] Edits are persisted in offline mode. I have not integrated with an actual API but have tried to clone the API behavior using promises
-   [x] Created a nice production ready UI/UX of the application
-   [x] Added a loader when the application loads for the first time
-   [ ] Private profile and manual vanity sharing: Haven't created this as of now due to time constraints but can discuss the approach of how to create this.

# Non Functional specifications (that I have implemented)

-   Created a dummy promise to mock API call to fetch profile data. The app calls this dummy promise on mount and the data is fetched through local storage.
    In an actual app, this dummy promise could be replaced by a Fetch call to a backend API
-   Created a dummy promise to mock API call to save profile data. This API is called on profile save and is actually stored in the local storage. In an actual app, this dummy promise could be replaced by a Fetch call to a backend API
-   Responsive layout tested on different laptop and mobile screens
-   Tested on different browsers(Chrome, Safari, Firefox, Edge) and OS (Mac, Windows) to ensure it is working fine
-   Performance : Tried to improve performance of the application from multiple aspects to make it more scalable in future
-   Use of React Hooks: Used React hooks like useEffect, useEffect, useCallback and custom hooks
-   Clean code: Tried to write a clean and indented code (which follows Prettier code formatting)
-   Added comments in every component so that it could be understood by people in the team

# Code Structure

Inside the src folder, created separate folders for :-

-   I have created a folder for every component which usually has its main component, index.jsx and its custom style/css file
-   api : contains profile.js which makes the actual calls in the application, and sampleProfile.js which returns dummy promise fn to mock get API call and returns data from localstorage
-   assets: gif file for spinner
-   common >> components: contains all the common components that the application is using, e.g. footer, header, loader, toast message etc.
-   constants: All static messages/strings used in the application
-   components: all common sub-components used in the application
-   features: main components of the application, profile page having sub-folders for child components liek basic-details and job-experiences
-   hooks: custom hooks for detecting the device width
-   json: contains dummy API json for the application
-   utils: Common utility methods used in the application

# Tech choices

-   Used ReactJS to complete the problem statement. Since it is the primary tech stack at ContactOut. Also, the component based architecture in React is amazing to create a large scale single page application.
-   Used functional components
-   Used react-router for routing for edit profile page and view only profile page
-   Used axios for making any API calls. It gives additional advantages for cancelling and intecepting API requests which could be benefeicial later on
-   Used bootstrap for styling with react
-   Used bootstrap icons
-   Used clsx for conditional css
-   Used lodash
-   Used moment js for date formatting
-   Used filestack-js for actually uploading the profile image and getting the url. In a normal application, we would our own API.

# Performance improvements

-   Used useCallback wherever applicable (e.g. navbar.jsx) to wrap functions that are being passed as props (callbacks) to child components to avoid creation of a ne instance on every re-render
-   Wrapped components under React.memo wherever applicable to avoid unnecessary re-renders
-   Used React hooks like useState and useEffect wherever applicable for all state updates and re renders

# Styling

-   All style files have been created inside the folder of the specific component to keep development and debugging easier and quicker
-   Used bootstrap and bootstrap-icons
-   Used native css as of now for styling since the project was small. For a large-scale project, would prefer using "Styled components" in react since they support dynamic styling based on props, clean styling for each component makes code readable and maintainable.

# Security

-   Sanitised all data input by user to avoid XSS attacks

# Accessibility

-   All the forms are accessible through keyboard
-   Use of alt keywords alongwith images

# Unit tests

Due to time constraints, I could not write unit test cases. However, below are some cases which I would test in the application

-   Mock the fetch API to get empty profile object and check that basic details section is not rendered
-   Mock the fetch API to get empty profile object and check that job experiences list is not rendered
-   Mock the fetch API to get profile object with empty job experiences and check that "Add work experience" link is rendered in the DOM
-   Mock the fetch API to get profile object with empty job experiences and check that job experiences list is not rendered
-   Mock the fetch API to get profile object with basic details data. Match the basic details (name, age, location, profileSummary, profileDescription) data rendered with the mock data.
-   Mock the fetch API to get profile object with basic details data. Test for both cases when profileImageUrl exists and doesnt exist and compare the image rendered
-   Mock the uploadImage API and test if the uploaded image is same as the mock profileUrl
-   Edit profile data with mock data and save. Test that updated data is equal to mock data
-   Mock the fetch API to get profile object with only one job Experience and compare that length of work experiences rendered should be only 1
-   Mock the fetch API to get profile object with multiple job Experiences and compare that rendered data is same as mock data
-   Edit profile data with mock data and save. Test that updated data is equal to mock data

# Further Improvements/Changes which could be done later

-   Actual Backend layer and DB creation
-   Integrating with BE APIs
-   Solving the Bonus part of the applicstion
-   Separate styling for tablet devices.
-   Add Unit test cases
-   Accessibility could be further improved - background and foreground colors do not have a sufficient contrast ratio, use of aria-attributes
-   Improve security using authentication/authorization, private URLs and protected routes

## Feedback

I had an amazing experience working on this assessment. The steps were well-documented that made them pretty much self-explanatory. Even though the problem statement looked simple initially, the beauty of it was that it was very open-ended.
This gives developers the opportunity to show their own creativity and skills and create and amazing product.

Also, I sincerely appreciate the team's patience throughout the process.

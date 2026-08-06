<h1>Weathering WU</h1>

Made with

![Next.js](https://img.shields.io/badge/-Next.js-000000?logo=next.js&logoColor=white)
![React.js](https://img.shields.io/badge/-React.js-61DAFB?logo=react&logoColor=white&style=flat)
![JavaScript](https://img.shields.io/badge/-JavaScript-%23F7DF1E?logo=javascript&logoColor=white)
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/-Express.js-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white)
![TanStack Query](https://img.shields.io/badge/-TanStack_Query-FF4154?logo=react-query&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white)
![Google Cloud Run](https://img.shields.io/badge/-Google_Cloud-4285F4?logo=google-cloud&logoColor=white)
![Vercel](https://img.shields.io/badge/-Vercel-000000?logo=vercel&logoColor=white)
![HTML5](https://img.shields.io/badge/-HTML5-orange?logo=html5&logoColor=white&style=flat)
![CSS3](https://img.shields.io/badge/-CSS3-blue?logo=css3&logoColor=white&style=flat)

<h3>Overview</h3>
<p>A full-stack Weathering App built with Next.js, Node.js, Express, and MongoDB. Recently migrated to Next.js to leverage Server-Side Rendering (SSR) for improved performance and SEO.</p>

<h3>Features</h3>

<h4>Weather Search & Display</h4>
<p>As users type, the component sends requests to the OpenWeatherMap Geo API to fetch a list of matching cities based on the search query. Once the API response is received, the component displays the matching city results, including the country, city name, and state, if available. When a city is selected, it will display the detailed weather conditions of the selected location.</p>

<h4>User Authentication</h4>
<p>The application implements secure user authentication using JSON Web Tokens (JWT). Users can sign up for a new account and log in to access personalized features. The backend REST API handles password hashing and token verification to ensure secure sessions.</p>

<h4>Favorites & Persistence</h4>
<p>Authenticated users can save specific cities as favorites. This data is persisted securely in a MongoDB Atlas database, allowing user preferences to be saved across sessions. The "heart" toggle updates in real-time using TanStack Query, which manages server state caching and invalidation to ensure the UI instantly reflects additions or removals without requiring a page refresh.</p>

<h4>Cloud Architecture & Deployment</h4>
<p>The application follows a decoupled microservices architecture:</p>
<ul>
  <li><strong>Backend:</strong> The Express/Node.js REST API is containerized using Docker and deployed to Google Cloud Run for serverless, auto-scaling performance.</li>
  <li><strong>Frontend:</strong> The Next.js application is deployed on Vercel, utilizing environmental variables to securely route data fetching to the live backend.</li>
</ul>

<h3>APIs Used</h3>
<ul>
  <li>Geocoding API for longitude and latitude: <code>https://openweathermap.org/api/geocoding-api</code></li>
  <li>Current Weather API for detailed conditions: <code>https://openweathermap.org/current</code></li>
</ul>

![Example Screenshots](https://img.shields.io/badge/-Showcase%20-darkgrey?style=flat)
![ezgif-4-c666c83b23](https://github.com/BennLL/weathering-wu/assets/110274203/bb7dc3cc-c104-40a7-8fcf-0028e047edd2)

<h3>Try it out: <a href="https://weathering-wu.vercel.app/">Link</a></h3>
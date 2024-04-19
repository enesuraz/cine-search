# [CineSearch](https://cine-search-ft7i.onrender.com)

CineSearch is a comprehensive film search and management platform that allows users to search for films, add them to watchlists, and navigate through a collection of movies. It covers frontend and backend aspects utilizing Object-Oriented Programming (OOP), the Event Subscriber Pattern, and the Model-View-Controller (MVC) pattern for efficient and organized development.If you want to test application visit [CineSearch](https://cine-search-ft7i.onrender.com)

## Features

- Search by Actors or Genre: Users can search for films based on actors' names or genre names, providing a flexible and - intuitive search experience.
- Add Film: Allows users to add new films to the database, including detailed information such as title, release date, runtime, genre, actors, plot, poster URL, IMDb rating, and IMDb ID.
- Add and Remove Watchlist: Enables users to add films to their watchlist for easy access and manage their watchlist by removing films as needed.
- Page Navigation for Preview: Provides seamless page navigation for previewing film details and navigating between different sections of the application.
- Object-Oriented Programming (OOP): Utilizes OOP principles to structure and organize code, enhancing code readability and maintainability.
- Event Subscriber Pattern: Implements the event subscriber pattern to handle communication between different components of the frontend, ensuring loose coupling and flexibility.
- MVC Pattern: Adheres to the Model-View-Controller (MVC) pattern for separating concerns and maintaining a clear structure in the frontend architecture.
- Generate API Keys: Provide a mechanism for users to generate unique API keys upon registration or account creation.

## API Endpoints

### Register User

- **Endpoint:** `api/v1/register`
- **Method:** POST
- **Description:** Register a new user with a unique username and email address.

### Get All Films

- **Endpoint:** `api/v1/films/?api_key=api_key`
- **Method:** GET
- **Description:** Retrieve a list of all available films stored in the database.

### Add Film

- **Endpoint:** `api/v1/films/?api_key=api_key`
- **Method:** POST
- **Description:** Add a new film to the database with detailed information including title, release date, runtime, year, genre, actors, plot, poster URL, IMDb rating, and IMDb ID.

### Get Film by ID

- **Endpoint:** `api/v1/films/:id/?api_key=api_key`
- **Method:** GET
- **Description:** Retrieve details of a specific film by providing its unique identifier.

### Search Films

- **Endpoint:** `api/v1/films/?q=query&api_key=api_key`
- **Method:** GET
- **Description:** Search for films by providing a query string containing an actor's name or a genre name. Returns a list of films matching the search criteria.

## API Usage

To use the CineSearch API endpoints:

1. Make requests to the desired endpoint using the appropriate HTTP method and parameters.

2. Review the response to see the returned film data or confirmation message.

## All Requests

Here are all requests you can make using the CineSearch API endpoints:

```http
POST api/v1/register
Content-Type: application/json

{
    "username": "example_user",
    "email": "user@example.com"
}

GET api/v1/films/?api_key=YOUR_API_KEY

POST api/v1/films/?api_key=YOUR_API_KEY
Content-Type: application/json

{
    "title": "Example Film",
    "year": 2023,
    "runtime": 120,
    "released": new Date(),
    "genre": ["Action", "Adventure"],
    "actors": ["Actor 1", "Actor 2"],
    "plot": "This is an example plot.",
    "poster": "https://example.com/poster.jpg",
    "imdbRating": 7.5,
    "imdbID": "tt1234567"
}

GET api/v1/films/123456/?api_key=YOUR_API_KEY

GET api/v1/films/?api_key=YOUR_API_KEY&q="Actor or genre name"
```

## Getting Started

1. Clone this repository to your local machine:

```
git clone https://github.com/enesuraz/cine-search.git
```

2. Navigate to the cloned repository:

```
cd cine-search
```

3. Navigate to the backend and create config.env in backend directory and type those values:

```
NODE_ENV=production
MONGO_SERVER=YOUR_MONGO_SERVER
PORT=PORT_YOU_WANT_APPLICATION_RUNNING
```

### Note

If you want to run in development mode, firstly change NODE_ENV=development,then:

- Firstly install all neccessary packages typing "npm run install" when in main directory
- Navigate frontend/src/js/utils/config.js file and change url "http://localhost:YOUR_PORT/api/v1/films"
- Type "npm run dev" in the main directory
- Open browser and type url which given by parcel

4. Type belowed command in your terminal when you are in backend directory

```
npm run watch
```

5. Open postman or like postman application post request api/v1/register endpoint (look api usage!)

6. Get the returned api_key value and navigate frontend directory

7. Open config.js file in src/js/utils folder and replace api_key

8. Navigate cine-search top-level directory in your terminal and type belowed command

```
docker build . --build-arg port=PORT_YOUR_SPECIFID_IN_BACKEND -t TAGNAME_YOUR_WANT
```

9. Type belowed command for creating container

```
docker run -it -p APPLICATION_RUNNING_PORT:PORT_YOUR_SPECIFIED TAGNAME
```

### Note

If you don't want to docker, follow up these steps

- Firstly install all neccessary packages typing "npm run install" when in main directory
- Navigate frontend in your terminal and type "npm run deploy"
- Then jump into 10. step

10. After all of that open your browser and go to belowed url

```
http://localhost:APPLICATION_RUNNING_PORT/
```

## Contact

For any inquiries or feedback, please contact [nfk7221@gmail.com](mailto:nfk7221@gmail.com).

# Weather App

This is a simple weather application built using Express.js. It allows users to retrieve weather information based on location.

## Installation

Clone the repository or download the source code.

```
git clone https://github.com/your-username/weather-app.git
```

Navigate to the project directory.

```
cd weather-app
```

Install the dependencies.

```
npm install
```

## Configuration

1. Obtain an API key from a weather data provider such as OpenWeatherMap or WeatherAPI.
2. Create a `.env` file in the root directory of the project.
3. Add the following environment variables to the `.env` file:

```
PORT=port-number
APP_ID=your-api-key
```

- Replace `your-api-key` with the actual API key obtained from the weather data provider.
- Replace `port-number` with a port number to run the server.

## Usage

1. Start the application.

```
npm start
```

2. Open a web browser and navigate to `http://localhost:3000`.
3. Enter a location in the search bar and click the "Get Weather" button.
4. The application will retrieve the weather information for the specified location and display it on the page.

## Dependencies

The project has the following dependencies:

- `express`: Fast, unopinionated, minimalist web framework for Node.js
- `dotenv`: Loads environment variables from a .env file
- `http`: Built-in Node.js module for handling HTTP requests
- `fs`: Built-in Node.js module for working with the file system

## Contributing

Contributions are welcome!

If you find any issues or would like to add new features, please open an issue or submit a pull request on the GitHub repository.

## Author

Made with ♥ by Avantika Pandey

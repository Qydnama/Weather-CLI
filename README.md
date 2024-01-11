# Weather CLI npm Package

## Overview

The Weather CLI npm package is a command-line tool that provides weather information about a given city. It allows users to easily retrieve current weather details and forecasts for a specified location.

## Usage
This npm package uses [https://openweathermap.org/current](https://openweathermap.org/current) API.

To use the Weather CLI npm package, follow the provided command-line options:

- **No parameters:** Outputs weather information for the default city.
- **-c [CITY]:** Sets the city for which you want to retrieve weather information.
- **-h:** Outputs help information, providing guidance on how to use the CLI.
- **-t [API_KEY]:** Saves the provided API key for future use.
- **-d:** Saves the default API key for future use.

## Getting Started

1. Install the Weather CLI npm package globally:

    ```bash
    npm install -g weather-cli-ab
    ```

2. Write this command that uses default city and API token (KZ, Astana):

    ```bash
    weather
    ```



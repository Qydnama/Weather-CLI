#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather, getIcon } from "./services/api.service.js";
import { printHelp, printError, printSuccess, printWeather } from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from "./services/storage.service.js";


const saveToken = async (token) => {
    if (!token.length) {
        printError('API token is not set, set it via the command: -t [API_KEY], or place default token: -d');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('API token saved');
    } catch (e) {
        printError(e.message);
    }
}


const saveCity = async (city) => {
    if (!city.length) {
        printError('The city is not specified, specify it with the command: -c [CITY]');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('City saved');
    } catch (e) {
        printError(e.message);
    }
}


const getForcast = async () => {
    try {
        const city = await getKeyValue(TOKEN_DICTIONARY.city);
        const weather = await getWeather(city);
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch (error) {
        if (error.response && error.response.status) {
            const { status } = error.response;
            if (status == 404) {
                printError('Incorrect city');
            } else if (status == 401) {
                printError('Incorrect API token');
            }
            else if (status == 400) {
                    printError('The city is not specified, specify it with the command: -c [CITY]');
            } else {
                printError(`Unexpected status code: ${status}`);
            }
        } else {
            printError(`${error}`);
        }
    }
    
}


const initCLI = () => {
    const args = getArgs(process.argv);
    
    if (args.h) {
        return printHelp();
    }
    if (args.c) {
        return saveCity(args.c);
    }
    if (args.d) {
        return saveToken(TOKEN_DICTIONARY.default_API);
    }
    if (args.t) {
        return saveToken(args.t);
    }
    
    
    return getForcast();
};
  

initCLI();
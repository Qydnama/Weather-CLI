import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message) => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = () => {
    console.log(
        dedent`
        
        ${chalk.bgCyan(' HELP ')}
        ${chalk.yellow('No parameters')} to output weather information
        ${chalk.yellow('-c [CITY]')} to set the city
        ${chalk.yellow('-h')} to output help
        ${chalk.yellow('-t [API_KEY]')} to save token
        ${chalk.yellow('-d')} to save default token
        `
    );
}

const printWeather = (res, icon) => {
    console.log(
        dedent`

        ${chalk.bgGreen(' WEATHER ')} City: ${chalk.blueBright(res.name)}, Country: ${chalk.blueBright(res.sys.country)}
        Status: ${icon}  ${chalk.yellow(res.weather[0].description)}
        Temperature: ${chalk.yellow(res.main.temp,'°C')}, (Feels Like: ${chalk.yellow(res.main.feels_like,'°C')})
        Humidity: ${chalk.yellow(res.main.humidity,'%')}
        Wind: ${chalk.yellow(res.wind.speed,'km/hour')} 
        `
    );
};

export { printError, printSuccess, printHelp, printWeather};
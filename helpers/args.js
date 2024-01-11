import {printError} from "../services/log.service.js";

const getArgs = (args) => {
    const allowedOptions = {
      c: true, // requires a value (city name)
      d: false, // doesn't require a value
      h: false, // doesn't require a value
      t: true // requires a value (API key)
    };

    const allowedOptionsArray = ['c','d','h','t'];
  
    const res = {};
    const [executer, file, ...rest] = args;
  
    rest.forEach((value, index, array) => {
        if (value.charAt(0) == '-') {
            const option = value.substring(1);
            if (!allowedOptionsArray.includes(option)) {
                printError(`Invalid option: ${value}`);
                process.exit(1); 
            }
            else if (index === array.length - 1) {
                if (allowedOptions[option]) {
                    printError(`Missing value for option: ${value}`);
                    process.exit(1); 
                }
                res[option] = true;
            }
            else if (allowedOptions[option] == false || array.length > 2) {
                printError(`Too many values for option ${value}`);
                process.exit(1);
            }
            
            else if (array[index + 1].charAt(0) != '-' && allowedOptions[option] == true) {
                res[option] = array[index + 1];
            } 

        } 
        else if (index == 0){
            printError(`Invalid argument: ${value}`);
            process.exit(1); 
        }
    });
    return res;
  };
  
  export { getArgs };
  
import {dirname} from 'path';
import {fileURLToPath} from 'url';

export const __dirname = dirname(fileURLToPath(import.meta.url));

//Validation
export const validateInteger = (input, lowerLimit, upperLimit) => {
    const num = parseInt(input);
    return Number.isInteger(num) && num >= lowerLimit && num <= upperLimit;
  };
  
  //Validate Sort
  export const validateSort = (input) => {
    return input === ASC || input === DESC;
  };
  
  //Validate Boolean
  export const validateBoolean = (input) => {
    return input === TRUE || input === FALSE;
  };
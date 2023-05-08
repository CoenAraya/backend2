import {dirname} from 'path';
import {fileURLToPath} from 'url';
import bcrypt from 'bcrypt';

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

  //Validate Bcrypt
  export const compareData = async (data, dataDB) => {
    const result = await bcrypt.compare(data, dataDB);
    return result;
  }

  //hasheo data
  export const hashData = async (data) => {
    const result = await bcrypt.hash(data, 10);
    return result;
  }
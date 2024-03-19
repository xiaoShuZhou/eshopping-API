
const info = (...params:string[]) => {
    console.log(...params)
  }
  

const error = (message:string) => {
    console.error(message);
  }

export const logger = {
    info,
    error
};

  
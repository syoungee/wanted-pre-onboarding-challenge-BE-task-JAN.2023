// const NodeJS = require('NodeJS');
type SomeFunctionReturnString = () => string;

function delay(f: SomeFunctionReturnString, seconds: number): Promise<string> {
  let timeoutId: NodeJS.Timeout;
  timeoutId = setTimeout(() => {}, 1000 * seconds);
  global.clearTimeout(timeoutId);

  return new Promise((resolve, rejects) => {
    f();
    console.log(`after ${seconds} seconds`);
    resolve('successfully done');
    rejects('Error: failed');
  });
}

const success = () => {
  return 'successfully done';
};

const fail = () => {
  throw new Error('failed');
};

delay(success, 2)
  .then((res) => console.log(res))
  .catch((e) => console.log(e));

delay(fail, 2)
  .then((res) => console.log(res))
  .catch((e) => console.log(e));

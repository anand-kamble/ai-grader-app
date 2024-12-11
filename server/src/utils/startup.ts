import { init } from "../services/databaseService";

const startup = new Promise((res, rej) => {
  (async () => {
    try {
      await init();
      res(true);
    } catch (error) {
      console.error(error);
      rej(false);
    }
  })();
});

export default startup;

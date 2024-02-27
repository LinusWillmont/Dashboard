import postHumidityData from "../data/postHumidityData.js";
import readFromSerial from "../data/readFromSerial.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mainLoop = async () => {
  while (true) {
    try {
      const data = await readFromSerial();
      console.log("Data gotten from Arduino", data);

      if (data) {
        await postHumidityData(data);
        data = null;
        console.log("Posting data");
      } else {
        console.log("Waiting for data from Arduino");
      }
    } catch (error) {
      console.error("Error in main loop:", error.message);
    }

    await delay(10000);
  }
};

mainLoop();

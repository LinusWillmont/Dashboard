const fetch = require("node-fetch");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

// let isSendingData = false;
// const main = async () => {
//   if (!isSendingData) {
//     const intervalId = setInterval(async () => {
//       try {
//         isSendingData = true;
//         const newData = await readFromSerial();
//         console.log("Data from serial:", newData);
//         await sendDataViaHttpPost(newData);
//       } catch (error) {
//         console.log("Failed to read from serial or send data:", error);
//       } finally {
//         isSendingData = false;
//       }
//     }, 1000);
//   } else {
//     console.log(
//       "Previous POST request still in progress. Skipping this iteration."
//     );
//   }

//   process.once("SIGINT", () => clearInterval(intervalId));
// };

const main = async () => {
  console.log("Fetching arduino data");
  const intervalId = setInterval(async () => {
    try {
      const newData = await readFromSerial();
      console.log("Data from serial:", newData);
      await sendDataViaHttpPost(newData);
    } catch (error) {
      console.log("Failed to read from serial or send data:", error);
      let nrOfRetries = 100;
      while (nrOfRetries > 0) {
        console.log(`Retrying... Attempts left: ${nrOfRetries}`);
        try {
          const newData = await readFromSerial();
          console.log("Data from serial:", newData);
          await sendDataViaHttpPost(newData);
          break;
        } catch (error) {
          console.log("Retry failed:", error);
        }
        nrOfRetries--;
      }
    }
  }, 1000 * 60 * 1);

  process.once("SIGINT", () => clearInterval(intervalId));
};
main();

const sendDataViaHttpPost = async (data) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  try {
    console.log("Data to post", data);
    const response = await fetch("http://localhost:5108/data", {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();
    console.log("json", json);
  } catch (error) {
    console.error("Error during POST request:", error.message);
  }
};

const readFromSerial = () => {
  return new Promise((resolve, reject) => {
    const port = new SerialPort({ path: "COM4", baudRate: 9600 });
    const parser = new ReadlineParser();

    port.pipe(parser);

    console.log("Listening for data");

    parser.on("data", (data) => {
      console.log("Parsed data:", data);
      resolve(data);
      port.close();
    });

    // Handle errors
    port.on("error", (error) => {
      reject("readFromSerial error:", error);
    });

    const tryReadingAgain = () => {
      setTimeout(() => {
        if (!parser.readableLength) {
          console.log("No data received. Trying again...");
          tryReadingAgain();
        }
      }, 1000 * 10);
    };

    tryReadingAgain();
  });
};

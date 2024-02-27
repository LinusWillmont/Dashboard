const fetchHumidityData = async () => {
  try {
    const response = await fetch("http://localhost:5108/data");
    const json = await response.json();
    return processData(json);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const processData = (dataJSON) => {
  let processedDataPoints = dataJSON.map((dataPoint) => {
    return {
      x: dataPoint.loggedAt,
      y: Number.parseInt(dataPoint.humidity),
    };
  });
  return processedDataPoints;
};

export default fetchHumidityData;

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
  let processedDataPoints = [];
  for (let i = 0; i < dataJSON.length; i++) {
    // console.log("Datapoint:", dataJSON[i]);
    const dataPoint = dataJSON[i];
    const times = splitTime(dataPoint.loggedAt);
    const existingDayIndex = processedDataPoints.findIndex((day) => {
      return day.id == times.monthDate;
    });
    if (existingDayIndex >= 0) {
      const dayToUpdate = processedDataPoints[existingDayIndex];
      dayToUpdate.data.push({ x: times.hourMinute, y: dataPoint.humidity });
    } else {
      processedDataPoints.push({
        id: times.monthDate,
        data: [{ x: times.hourMinute, y: dataPoint.humidity }],
      });
    }
  }
  return processedDataPoints;
};

const splitTime = (date) => {
  const hourMinuteRe = /\d{2}:\d{2}/;
  const monthDateRe = /\b\d{2}-\d{2}/;

  const times = {
    hourMinute: date.match(hourMinuteRe)[0],
    monthDate: date.match(monthDateRe)[0],
  };

  return times;
};

export default fetchHumidityData;

// Object { x: "2024-02-28T11:11:28.786473Z", y: 24 }

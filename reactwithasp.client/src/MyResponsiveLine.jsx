import { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import byTheNumbers from "../themes/byTheNumbers";
import fetchHumidityData from "../data/fetchHumidityData";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
export default function MyResponsiveLine() {
  const [humidityData, setHumiditydata] = useState({
    id: "Humidity",
    color: "hsl(271, 70%, 50%)",
    data: [],
  });

  const updateHumidityData = async () => {
    try {
      const json = await fetchHumidityData();
      console.log("Gotten json:", json);
      setHumiditydata({ ...humidityData, data: json });
    } catch (error) {
      console.error("Failed to fetch humidity data:", error);
    }
  };

  useEffect(() => {
    updateHumidityData();

    const intervalId = setInterval(() => {
      updateHumidityData();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <ResponsiveLine
      data={[humidityData]}
      theme={byTheNumbers}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Time",
        legendOffset: 36,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Humidity (%)",
        legendOffset: -40,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}

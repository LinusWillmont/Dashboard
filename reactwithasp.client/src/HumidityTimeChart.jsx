import { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import byTheNumbers from "../themes/byTheNumbers";
import fetchHumidityData from "../data/fetchHumidityData";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
export default function HumidityTimeChart() {
  const [humidityData, setHumiditydata] = useState([
    {
      id: "Placeholder data",
      data: [
        { x: "16:40", y: 20 },
        { x: "16:50", y: 30 },
      ],
    },
  ]);

  const updateHumidityData = async () => {
    try {
      const json = await fetchHumidityData();

      setHumiditydata([...json]);
    } catch (error) {
      console.error("Failed to fetch humidity data:", error);
    }
  };

  useEffect(() => {
    updateHumidityData();

    const intervalId = setInterval(() => {
      updateHumidityData();
    }, 1000 * 60);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <ResponsiveLine
      data={humidityData}
      animate
      theme={byTheNumbers}
      axisBottom={{
        format: "%H",
        legend: "time scale",
        legendOffset: -12,
        tickValues: "every 1 hour",
      }}
      axisLeft={{
        legend: "Humidity (%)",
        legendOffset: 12,
      }}
      curve="monotoneX"
      enablePointLabel
      height={600}
      margin={{
        bottom: 60,
        left: 80,
        right: 120,
        top: 20,
      }}
      pointBorderColor={{
        from: "color",
        modifiers: [["darker", 0.3]],
      }}
      pointBorderWidth={1}
      pointSize={16}
      pointSymbol={function noRefCheck() {}}
      useMesh
      width={1000}
      xFormat="time:%H:%M"
      xScale={{
        format: "%H:%M",
        precision: "minute",
        type: "time",
        useUTC: false,
      }}
      yScale={{
        type: "linear",
        max: "100",
        min: "0",
      }}
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

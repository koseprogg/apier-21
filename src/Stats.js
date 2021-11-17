import Header from "./components/Header";
import "./App.css";
import { useEffect, useState } from "react";

import { VictoryBar, VictoryChart, VictoryAxis } from "victory";

const Stats = () => {
  const [stationList, setStationList] = useState([]);

  const fetchBicycleData = async () => {
    const response = await fetch(
      "https://gbfs.urbansharing.com/trondheimbysykkel.no/station_information.json",
      {
        headers: {
          "Client-Identifier": "abakus-apitest",
        },
      }
    );
    const bicycleData = await response.json();
    return bicycleData;
  };

  useEffect(() => {
    const newStationList = [];
    fetchBicycleData().then((response) => {
      for (let i = 0; i < 10; i++) {
        const event = response.data.stations[i];
        const stationObj = {
          station: event.name,
          capacity: event.capacity,
        };
        newStationList.push(stationObj);
      }
      setStationList(newStationList);
    });
  }, []);

  return (
    <>
      <Header text="Statistikk" />
      <p>Ledige sykler:</p>
      <VictoryChart
        // domainPadding will add space to each side of VictoryBar to
        // prevent it from overlapping the axis
        domainPadding={10}
      >
        <VictoryAxis
          style={{ tickLabels: { angle: -60 } }}
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
        />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
        />
        <VictoryBar data={stationList} x="station" y="capacity" />
      </VictoryChart>
    </>
  );
};

export default Stats;

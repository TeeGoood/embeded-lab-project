"use client";

import { useEffect, useState } from "react";
import Time from "@/components/Time";
import CurrentLevel from "@/components/CurrentLevel";
import PumpButton from "@/components/PumpButton";
import Graph from "@/components/Graph";
import mqtt from "mqtt";

export default function Home() {
  let [onPump1, setOnPump1] = useState(false);
  let [onPump2, setOnPump2] = useState(false);

  function togglePump1() {
    setOnPump1(!onPump1);
  }
  function togglePump2() {
    setOnPump2(!onPump2);
  }

  useEffect(() => {
    const client = mqtt.connect(process.env.NEXT_PUBLIC_MQTT_URL as string, {
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
      username: process.env.NEXT_PUBLIC_TOKEN as string,
      password: process.env.NEXT_PUBLIC_SECRET as string,
    });
    
    console.log("render")

    client.on("connect", () => console.log("connected", new Date()));
    client.on("close", () => console.log("disconnected", new Date()));
    client.on("error", (err) => console.error("error", err));
  }, []);

  return (
    <>
      <div className="flex flex-col m-12 gap-8 lg:mx-20 lg:my-16 text-gray-950 text-balance">
        <div className="flex flex-col gap-4 lg:justify-between lg:flex-row lg:items-end">
          <h1 className="text-3xl font-bold lg:text-4xl">
            Water Level Monitoring System
          </h1>
          <Time />
        </div>
        <div className="flex flex-col gap-10 lg:gap-14 lg:flex-row lg:justify-between">
          <div className="flex flex-col w-full gap-4 lg:gap-6">
            <div className="flex gap-4 justify-between lg:gap-6">
              <CurrentLevel no={1} value={56} />
              <button onClick={togglePump1} className="w-1/2 lg:w-1/3">
                <PumpButton no={1} on={onPump1} />
              </button>
            </div>
            <Graph no={1} />
          </div>
          <div className="flex flex-col w-full gap-4 lg:gap-6">
            <div className="flex gap-4 justify-between lg:gap-6">
              <CurrentLevel no={2} value={56} />
              <button onClick={togglePump2} className="w-1/2 lg:w-1/3">
                <PumpButton no={2} on={onPump2} />
              </button>
            </div>
            <Graph no={2} />
          </div>
        </div>
      </div>
    </>
  );
}

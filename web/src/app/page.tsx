"use client"

import mqtt from "mqtt";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const client = mqtt.connect("wss://mqtt.netpie.io:443/mqtt" as string, {
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
      username: process.env.NEXT_PUBLIC_TOKEN as string,
      password: process.env.NEXT_PUBLIC_SECRET as string,
    });

    client.on("connect", () => {
      console.log("connect success");
    });
  }, []);

  return <main className=""></main>;
}

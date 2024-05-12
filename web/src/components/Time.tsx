"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function Time() {
  const [datetime, setDatetime] = useState("");

  useEffect(() => {
    setDatetime(dayjs().format("dddd, D MMMM YYYY - h:mm A"));

    const timer = setInterval(() => {
      setDatetime(dayjs().format("dddd, D MMMM YYYY - h:mm A"));
    }, 30000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <div className="font-medium lg:text-xl">{datetime}</div>;
}

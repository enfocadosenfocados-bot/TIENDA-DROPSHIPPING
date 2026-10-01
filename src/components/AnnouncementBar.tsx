"use client";

import { useEffect, useState } from "react";
import { Zap, Clock } from "lucide-react";
import { storeConfig } from "@/config/product";

export function AnnouncementBar() {
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          return { minutes: 14, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 text-white text-xs sm:text-sm py-2 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-4 flex-wrap text-center font-medium">
        <div className="flex items-center gap-1.5 font-bold tracking-wide">
          <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
          <span>{storeConfig.announcementText}</span>
        </div>
        <div className="flex items-center gap-1 bg-black/25 px-2.5 py-0.5 rounded-full font-mono text-xs">
          <Clock className="w-3.5 h-3.5 text-yellow-300" />
          <span>Offer expires in: </span>
          <span className="font-bold text-yellow-300">
            {formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}

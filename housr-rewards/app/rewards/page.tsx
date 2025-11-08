// app/rewards/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RewardsPage() {

  const [view, setView] = useState<"default" | "inProgress" | "completed">("default");
  const [transfer, setTransfer] = useState(false);

  const fetchPayment = async () => {
    setTransfer(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Payment processed");
    setTransfer(false);
  }

  useEffect(() => {
    if (view === "inProgress") {
      fetchPayment();
      setView("completed");
    }
  }, [view]);

  return (
    <section>
      <h1 className="text-4xl font-bold text-center">Rewards</h1>
        <p className="mt-2 text-gray-600 text-center">
          View your credits and redeem exclusive rewards here.
        </p>
        <div className="overflow-auto whitespace-nowrap">
          <a className="ml-30 mr-30 my-5 bg-[#d1f0df] leading-10 backdrop-blur-md 
          shadow-md rounded-2xl p-5 justify-between flex gap-10">
            <Image
                /*className="dark:invert"*/
                src="/rent.svg"
                alt="rent icon"
                width={80}
                height={20}
                priority
              />
            <p className="text-3xl py-5 font-semibold text-center mr-120"> 10% off next rent payment</p>
              <button
                      //onClick={() => setView("inProgress")}
                      /*href="/dashboard"*/
                      className="relative inline-flex items-center justify-center
                        px-20 py-2 overflow-hidden font-bold text-white rounded-full
                        transition-all duration-300 ease-out text-xl m-2
                        bg-[linear-gradient(180deg,#22704d,#1f9c5b,#b1e3c5)]
                        bg-[length:200%_200%]
                        animate-gradient
                        hover:scale-105
                        focus:outline-none"
                    >
                      Redeem
              </button>
          </a>
          <a className="ml-30 mr-30 my-5 bg-[#d1f0df] leading-10 backdrop-blur-md 
          shadow-md rounded-2xl p-5 justify-between flex gap-10">
            <Image
                /*className="dark:invert"*/
                src="/rent.svg"
                alt="rent icon"
                width={80}
                height={20}
                priority
              />
            <p className="text-3xl py-5 font-semibold text-center mr-120"> 10% off next rent payment</p>
              <button
                      //onClick={() => setView("inProgress")}
                      /*href="/dashboard"*/
                      className="relative inline-flex items-center justify-center
                        px-20 py-2 overflow-hidden font-bold text-white rounded-full
                        transition-all duration-300 ease-out text-xl m-2
                        bg-[linear-gradient(180deg,#22704d,#1f9c5b,#b1e3c5)]
                        bg-[length:200%_200%]
                        animate-gradient
                        hover:scale-105
                        focus:outline-none"
                    >
                      Redeem
              </button>
          </a>
          <a className="ml-30 mr-30 my-5 bg-[#d1f0df] leading-10 backdrop-blur-md 
          shadow-md rounded-2xl p-5 justify-between flex gap-10">
            <Image
                /*className="dark:invert"*/
                src="/rent.svg"
                alt="rent icon"
                width={80}
                height={20}
                priority
              />
            <p className="text-3xl py-5 font-semibold text-center mr-120"> 10% off next rent payment</p>
              <button
                      //onClick={() => setView("inProgress")}
                      /*href="/dashboard"*/
                      className="relative inline-flex items-center justify-center
                        px-20 py-2 overflow-hidden font-bold text-white rounded-full
                        transition-all duration-300 ease-out text-xl m-2
                        bg-[linear-gradient(180deg,#22704d,#1f9c5b,#b1e3c5)]
                        bg-[length:200%_200%]
                        animate-gradient
                        hover:scale-105
                        focus:outline-none"
                    >
                      Redeem
              </button>
          </a>
        </div>
    </section>
  );
}

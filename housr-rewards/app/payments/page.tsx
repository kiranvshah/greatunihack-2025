// app/payments/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

export default function PaymentsPage() {

  const [view, setView] = useState<"default" | "inProgress" | "completed">("default");
  const [transfer, setTransfer] = useState(false);

  const { width, height } = useWindowSize()

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
        <h1 className="text-4xl font-bold text-center">Your Current Tenancy</h1>
        <p className="mt-2 text-gray-600 text-center">
          View your due payments here.
        </p>

        <div className="p-10 flex justify-center gap-10">
          <Image
            className=/*dark:invert*/"rounded-2xl"
            src="/sampleroom.png"
            alt="Sample room image"
            width={500}
            height={200}
            priority
          />
          
          {view === "default" && (
            <div className="ml-2 leading-10 backdrop-blur-md shadow-md rounded-2xl p-10">
              <p className="text-2xl py-4 font-semibold text-center"> Oxford Road, Manchester</p>
              <p className="font-semibold text-gray-600">Cost of bills: £60/month </p>
              <p className="font-semibold text-gray-600">Total cost per month: £800/month</p>
              <p className="font-semibold text-gray-600">Payment due by: </p>
              <br></br>
              <Link
                    href="/dashboard"
                    className="relative inline-flex items-center justify-center
                      px-20 py-2 overflow-hidden font-medium text-white rounded-full
                      transition-all duration-300 ease-out
                      bg-[linear-gradient(180deg,#22704d,#1f9c5b,#b1e3c5)]
                      bg-[length:200%_200%]
                      animate-gradient
                      hover:scale-105
                      focus:outline-none"
                  >
                    Pay for 1 month (£800.00)
              </Link>
              <p className="py-2"></p>
              <button
                    onClick={() => setView("inProgress")}
                    /*href="/dashboard"*/
                    className="relative inline-flex items-center justify-center
                      px-20 py-2 overflow-hidden font-medium text-white rounded-full
                      transition-all duration-300 ease-out
                      bg-[linear-gradient(180deg,#22704d,#1f9c5b,#b1e3c5)]
                      bg-[length:200%_200%]
                      animate-gradient
                      hover:scale-105
                      focus:outline-none"
                  >
                    Pay for 3 months (£2400.00)
              </button>

              <p className="font-medium text-gray-600">Earn additional rewards when you make a single payment for 3 months.</p>
            </div>
          )}

          {view === "inProgress" && (
            <div className="ml-2 leading-10 backdrop-blur-md shadow-md rounded-2xl p-10">
              <p className="text-2xl py-5 font-semibold text-center"> Payment in progress..</p>
              <div className="loader m-30"></div>
            </div>
          )}

          {view === "completed" && (
            <div className="ml-2 leading-10 backdrop-blur-md shadow-md rounded-2xl p-10">
              <Confetti width={400} height={height}/>
              <p className="text-2xl py-5 font-semibold text-center"> Payment successful</p>
              <p className="font-medium text-gray-600"> You have earned 300 reward credits!</p>
              <p className="font-medium text-gray-600"> Your total credit count is 500.</p>
            </div>
          )}

        </div>
    </section>
  );
}

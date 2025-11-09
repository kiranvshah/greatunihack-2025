// app/payments/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import { th } from "framer-motion/client";

export default function PaymentsPage() {

  const [view, setView] = useState<"default" | "inProgress" | "completed">("default");
  const [transfer, setTransfer] = useState(false);
  const [threemonth, setThreemonth] = useState(false);

  const [cost, setCost] = useState(0);
  const [gain, setGain] = useState(0);
  const [cred, setCred] = useState(0);
  const [dt, setDt] = useState("");

  const { width, height } = useWindowSize()

  const fetchPayment = async () => {
    setTransfer(true);
    await new Promise((resolve) => setTimeout(resolve, 200));
    console.log("Payment processed");
    setTransfer(false);
  }

  useEffect(() => {
    if (view === "inProgress") {
      fetchPayment();
      setView("completed");
    }
  }, [view]);

  useEffect(() => {
    const fetchEntries = async () => {
      const authToken = sessionStorage.getItem("authToken") || "";
      const userId = sessionStorage.getItem("userId") || "";

      try {
        const res = await fetch(`https://housr-rewards-backend.onrender.com/api/v1/users/${userId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${authToken}`,
          }   
        })
        const data = await res.json();
        console.log(threemonth);
        console.log(data);
        setCred(data.wallet_balance);
        console.log(data.wallet_balance);
        if (threemonth) {
          setGain(Math.floor(data.cost_per_month / 10) * 3);
        } else {
          setGain(Math.floor(data.cost_per_month / 10));
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    if (view === "inProgress") {
      fetchEntries();
    }
  }, [view]);

  useEffect(() => {
    const fetchEntries = async () => {
      const authToken = sessionStorage.getItem("authToken") || "";
      const userId = sessionStorage.getItem("userId") || "";
      try {
        const res = await fetch(`https://housr-rewards-backend.onrender.com/api/v1/users/${userId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${authToken}`,
          }   
        })
        const data = await res.json();
        setCost(data.cost_per_month);
        setDt(data.next_payment_due);
        console.log(data.length);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    fetchEntries();
  }, []);

  useEffect(() => {
    const fetchEntries = async () => {
      const authToken = sessionStorage.getItem("authToken") || "";
      const userId = sessionStorage.getItem("userId") || "";

      try {
        const res = await fetch(`https://housr-rewards-backend.onrender.com/api/v1/tenancy-transactions`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },

        })
        const data = await res.json();
        console.log(data);
        } catch (err) {
        console.error("Error fetching dashboard data:", err);
        }
        
    };
    fetchEntries();
  }, []);

  useEffect(() => {
    (async () => {
      
    })(); 
  }, []);


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
              <p className="text-3xl py-4 font-semibold text-center"> Oxford Road, Manchester</p>
              <p className="font-semibold text-gray-600 text-center">Cost of bills: £60/month </p>
              <p className="font-semibold text-gray-600 text-center">Total cost per month: £{cost}/month</p>
              <p className="font-semibold text-gray-600 text-center">Payment due by: {dt.substring(0, 10)}</p>
              <br></br>
              <button
                    onClick={() => setView("inProgress")}
                    //href="/dashboard"
                    className="relative inline-flex items-center justify-center
                      px-32 py-2 ml-14 overflow-hidden font-medium text-white rounded-full
                      transition-all duration-300 ease-out
                      bg-[linear-gradient(180deg,#22704d,#1f9c5b,#b1e3c5)]
                      bg-[length:200%_200%]
                      animate-gradient
                      hover:scale-105
                      focus:outline-none"
                  >
                    Pay for 1 month (£{cost}.00)
              </button>
              <p className="py-2"></p>
              <button
                    onClick={() => [setView("inProgress"), setThreemonth(true)]}
                    /*href="/dashboard"*/
                    className="relative inline-flex items-center justify-center
                      px-30 py-2 ml-14 overflow-hidden font-medium text-white rounded-full
                      transition-all duration-300 ease-out
                      bg-[linear-gradient(180deg,#22704d,#1f9c5b,#b1e3c5)]
                      bg-[length:200%_200%]
                      animate-gradient
                      hover:scale-105
                      focus:outline-none"
                  >
                    Pay for 3 months (£{cost*3}.00)
              </button>
              <p className="font-medium text-gray-600 my-6">Earn additional rewards when you make a single payment for 3 months.</p>
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
              <p className="font-medium text-gray-600"> You have earned {gain} reward credits!</p>
              <p className="font-medium text-gray-600"> Your total credit count is now {cred}.</p>
              <p className="font-medium text-gray-600"> Go to rewards to spend your credits.</p>
            </div>
          )}

        </div>
    </section>
  );
}

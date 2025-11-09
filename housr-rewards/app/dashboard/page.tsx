// app/dashboard/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {

  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cred, setCred] = useState(0);

  useEffect(() => {
    const fetchEntries = async () => {
      const authToken = sessionStorage.getItem("authToken") || "";
      const userId = sessionStorage.getItem("userId") || "";

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/${userId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${authToken}`,
          }   
        })
        const data = await res.json();

        console.log(data);
        setCred(data.wallet_balance);
        console.log(data.wallet_balance);
        setEntries(data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

  return (
    <section>
        <h1 className="text-4xl font-bold text-center">Dashboard</h1>
        <p className="mt-2 text-gray-600 text-center">
          View your reward credit transactions here.
        </p>

        <div className="text-center p-6">
          <p
              className="relative inline-flex items-center justify-center
                px-120 py-10 overflow-hidden font-bold text-green
                text-4xl rounded-2xl
                transition-all duration-300 ease-out
                bg-[linear-gradient(180deg,#a7dbc0,#ffffff)]
                bg-[length:100%_100%]
                animate-gradient
                hover:scale-105
                focus:outline-none">
              You have: {cred} credits
          </p>
        </div>
        
        <div>
          <div className="ml-30 mr-30 my-5 leading-10 p-5 justify-between flex gap-10">
            <a className="font-bold text-xl text-gray-800">Transaction</a>
            <a className="font-bold text-xl text-gray-800">Date and Time</a>
            <a className="font-bold text-xl text-gray-800">Credit cost</a>
            <a className="font-bold text-xl text-gray-800">Balance</a>
          </div>
          <div className="ml-30 mr-30 my-5 bg-[#daf5e6] leading-10 backdrop-blur-md 
          shadow-md rounded-2xl p-5 justify-between flex gap-10">
            <a className="font-semibold text-xl text-gray-800">Coffee shop voucher</a>
            <a className="font-semibold text-xl text-gray-800">8/11/25</a>
            <a className="font-semibold text-xl text-gray-800">-100</a>
            <a className="font-semibold text-xl text-gray-800">50</a>
          </div>
          <div className="ml-30 mr-30 my-5 bg-[#daf5e6] leading-10 backdrop-blur-md 
          shadow-md rounded-2xl p-5 justify-between flex gap-10">
            <a className="font-semibold text-xl text-gray-800">Coffee shop voucher</a>
            <a className="font-semibold text-xl text-gray-800">8/11/25</a>
            <a className="font-semibold text-xl text-gray-800">-100</a>
            <a className="font-semibold text-xl text-gray-800">50</a>
          </div>
          <div className="ml-30 mr-30 my-5 bg-[#daf5e6] leading-10 backdrop-blur-md 
          shadow-md rounded-2xl p-5 justify-between flex gap-10">
            <a className="font-semibold text-xl text-gray-800">Coffee shop voucher</a>
            <a className="font-semibold text-xl text-gray-800">8/11/25</a>
            <a className="font-semibold text-xl text-gray-800">-100</a>
            <a className="font-semibold text-xl text-gray-800">50</a>
          </div>
        </div>

    </section>
  );
}

/*<div className="max-h-96 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : entries.length === 0 ? (
            <p className="text-gray-500">No entries available.</p>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="flex justify-between items-center bg-gray-50 border border-gray-100 rounded-xl p-4 hover:bg-gray-100 transition"
              >
                {// Left side: transaction name + date}
                <div>
                  <p className="font-medium text-gray-800">{entry.name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(entry.date).toLocaleString()}
                  </p>
                </div>

                {// Right side: credit change + balance }
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      entry.creditChange >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {entry.creditChange >= 0 ? "+" : ""}
                    {entry.creditChange}
                  </p>
                  <p className="text-sm text-gray-600">
                    Balance: {entry.balance}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
 */

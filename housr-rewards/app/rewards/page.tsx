// app/rewards/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RewardsPage() {

  const [view, setView] = useState<"default" | "inProgress" | "redeem">("default");
  const [transfer, setTransfer] = useState(false);
  const [perkIdToRedeem, setPerkIdToRedeem] = useState<number | null>(null);
  const [rewardCode, setRewardCode] = useState<string>("");

  const [cred, setCred] = useState(0);

  const [copied, setCopied] = useState(false);

  /*const randomAlphaNumeric = length => {
    let s = '';
    Array.from({ length }).some(() => {
      s += Math.random().toString(36).slice(2);
      return s.length >= length;
    });
    return s.slice(0, length);
  };*/

  const text = "AAAAA123123123";

  const fetchPayment = async () => {
    setTransfer(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Payment processed");
    setTransfer(false);
  }

  const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    if (view === "inProgress") {
      (async () => {
        await fetchPayment();
        await sleep(2000);
        setView("redeem");
      })();
    }
  }, [view]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Get user credits
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
        setCred(data.wallet_balance);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    fetchEntries();
  }, []);

  // Redeem perk
  useEffect(() => {
    const fetchEntries = async () => {

      const authToken = sessionStorage.getItem("authToken") || "";
      const userId = sessionStorage.getItem("userId") || "";

      try {
        if (!perkIdToRedeem) return console.log("No perk ID to redeem, stopped");

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/perk-transactions`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            perkId: perkIdToRedeem,
          }),
        })
        const data = await res.json();
        console.log(data)

        setRewardCode(data.rewardCode);
        
        
      } catch (err) {
        console.error("Error redeeming reward:", err);
      }
    };
    fetchEntries();
  }, [view, perkIdToRedeem]);

  // Populate perks list
  useEffect(() => {
    ;(async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/perks`, {
        method: "GET",
      })

      interface Perk {
        cost: number;
        description: string;
        id: number;
        image_url: string;
        title: string;
      }
      const availablePerks = await res.json() as Perk[];
      console.log("Available perks:", availablePerks);

      const perksContainer = document.getElementById("rewardsList") as HTMLDivElement;

      // remove existing generated entries
      const existingEntries = perksContainer.getElementsByClassName("generated-entry");
      while (existingEntries.length > 0) {
        existingEntries[0].parentNode?.removeChild(existingEntries[0]);
      }

      for (const perk of availablePerks) {
        const perkDiv = document.createElement("a");
        perkDiv.className = "ml-30 mr-30 my-5 bg-[#d1f0df] leading-10 backdrop-blur-md shadow-md rounded-2xl p-5 justify-between flex gap-10 generated-entry";
        perkDiv.innerHTML = `
          <img src="${perk.image_url}" alt="${perk.title} icon" width="100" height="20" />
          <div class="my-1 mr-120">
            <p class="text-3xl font-semibold text-center ">Watch a movie for free!</p>
            <p class="text-grey-xl font-medium">${perk.title} - ${perk.cost} Credits</p>
          </div>
            <button
                    class="relative inline-flex items-center justify-center
                      px-20 py-2 overflow-hidden font-bold text-white rounded-full
                      transition-all duration-300 ease-out text-xl m-2
                      bg-[linear-gradient(180deg,#22704d,#1f9c5b,#b1e3c5)]
                      bg-[length:200%_200%]
                      animate-gradient
                      hover:scale-105
                      focus:outline-none"
                      onclick="() => {
                        setPerkIdToRedeem(${perk.id});
                        setView('inProgress');
                      }"
                >
                  Redeem
            </button>
        `;
        perksContainer.appendChild(perkDiv);

        const btn = perkDiv.querySelector('button');
        if (btn) {
          btn.addEventListener('click', () => {
            setPerkIdToRedeem(perk.id);
            setView('inProgress');
          });
        }
      }
      console.log("Perks list:", availablePerks);
    })()
  }, []);

  return (
    <section>
      <h1 className="text-4xl font-bold text-center">Rewards</h1>
        <p className="mt-2 text-gray-600 text-center">
          View your credits and redeem exclusive rewards here.
        </p>
        <br></br>
        <br></br>
        
        {view === "default" && (  
          <div className="overflow-auto whitespace-nowrap" id="rewardsList">
            <p className="text-right mr-30 font-semibold text-2xl">You currently have {cred} credits</p>
          </div>
        )}

        {view === "inProgress" && (
            <div className="ml-60 mr-60 leading-10 backdrop-blur-md shadow-md rounded-2xl p-10">
            <p className="text-2xl font-semibold text-center my-10">Generating your unique code...</p>
              <div className="loader m-auto"></div>
            </div>
          )}

        {view === "redeem" && (
          <div className="ml-60 mr-60 leading-10 backdrop-blur-md shadow-md rounded-2xl p-10">
            <p className="text-2xl font-semibold text-center my-10">Generating your unique code...</p>
            <div className="flex items-center justify-between w-full max-w-md mx-auto p-3 bg-gray-100 rounded-2xl shadow-sm">
              <span className="truncate text-gray-900 font-medium ml-2">{rewardCode}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <p className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 font-medium mr-1">Copied!</span>
                  </>
                ) : (
                  <>
                    <p className="w-4 h-4" />
                    <span className='font-medium mr-1'>Copy</span>
                  </>
                )}
              </button>
            </div>
            <p className="my-8 text-center">You can now spend your code on your next purchase</p>
          </div>
        )}
    </section>
  );
}

/*{view === "default" && (  
          <div className="overflow-auto whitespace-nowrap">
            <p className="text-right mr-30 font-semibold text-2xl">You currently have {cred} credits</p>
            <a className="ml-30 mr-30 my-5 bg-[#d1f0df] leading-10 backdrop-blur-md 
            shadow-md rounded-2xl p-5 justify-between flex gap-10">
              <Image
                  //className="dark:invert"
                  src="/rent.svg"
                  alt="rent icon"
                  width={80}
                  height={20}
                  priority
                />
              <div className="my-1 mr-120">
                <p className="text-3xl font-semibold text-center ">10% off next rent payment</p>
                <p className="text-grey-xl font-medium">100 Credits</p>
              </div>
              
                <button
                        onClick={() => setView("inProgress")}
                        //href="/dashboard"
                        className="relative inline-flex items-center justify-center
                          px-20 py-2 overflow-hidden font-semibold text-white rounded-full
                          transition-all duration-300 ease-out text-2xl m-2
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
                  //className="dark:invert"
                  src="/coffee.svg"
                  alt="coffee icon"
                  width={80}
                  height={20}
                  priority
                />
              <div className="my-1 mr-155">
                <p className="text-3xl font-semibold text-center ">Get a free coffee!</p>
                <p className="text-grey-xl font-medium">100 Credits</p>
              </div>
                <button
                        onClick={() => setView("inProgress")}
                        //href="/dashboard"
                        className="relative inline-flex items-center justify-center
                          px-20 py-2 overflow-hidden font-semibold text-white rounded-full
                          transition-all duration-300 ease-out text-2xl m-2
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
                  /*className="dark:invert"
                  src="/movie.svg"
                  alt="movie icon"
                  width={80}
                  height={20}
                  priority
                />
              <div className="my-1 mr-135">
                <p className="text-3xl font-semibold text-center ">Watch a movie for free!</p>
                <p className="text-grey-xl font-medium">100 Credits</p>
              </div>
                <button
                        onClick={() => setView("inProgress")}
                        /*href="/dashboard"
                        className="relative inline-flex items-center justify-center
                          px-20 py-2 overflow-hidden font-semibold text-white rounded-full
                          transition-all duration-300 ease-out text-2xl m-2
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
        )}  */
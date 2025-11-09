// app/rewards/page.tsx
"use client";

import { useState, useEffect } from "react";

export default function RewardsPage() {

  const [view, setView] = useState<"default" | "inProgress" | "redeem">("default");
  const [view, setView] = useState<"default" | "redeem">("default");
  const [perkIdToRedeem, setPerkIdToRedeem] = useState<number | null>(null);
  const [transfer, setTransfer] = useState(false);

  const [copied, setCopied] = useState(false);
  const text = "AABBCC112233";

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


  return (
    <section>
      <h1 className="text-4xl font-bold text-center">Rewards</h1>
        <p className="mt-2 text-gray-600 text-center">
          View your credits and redeem exclusive rewards here.
        </p>
        {view === "default" && (  
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
                        onClick={() => setView("redeem")}
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
                  src="/coffee.svg"
                  alt="coffee icon"
                  width={80}
                  height={20}
                  priority
                />
              <p className="text-3xl py-5 font-semibold text-center mr-120"> 10% off next rent payment</p>
                <button
                        onClick={() => setView("redeem")}
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
                  src="/movie.svg"
                  alt="movie icon"
                  width={80}
                  height={20}
                  priority
                />
              <p className="text-3xl py-5 font-semibold text-center mr-120"> 10% off next rent payment</p>
                <button
                        onClick={() => setView("redeem")}
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
        )}  

      {view === "redeem" && (
          <div className="ml-60 mr-60 leading-10 backdrop-blur-md shadow-md rounded-2xl p-10">
            <p className="text-2xl font-semibold text-center my-10">Generating your unique code...</p>
            <div className="flex items-center justify-between w-full max-w-md mx-auto p-3 bg-gray-100 rounded-2xl shadow-sm">
              <span className="truncate text-gray-900 font-medium">{text}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <p className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <p className="w-4 h-4" />
                    <span className='font-medium'>Copy</span>
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

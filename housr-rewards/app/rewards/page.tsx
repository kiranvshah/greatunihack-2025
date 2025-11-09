// app/rewards/page.tsx
"use client";

import { useState, useEffect } from "react";

export default function RewardsPage() {

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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // redeem perk
  useEffect(() => {
    const fetchEntries = async () => {

      const authToken = sessionStorage.getItem("authToken") || "";
      const userId = sessionStorage.getItem("userId") || "";

      try {
        if (!perkIdToRedeem) throw new Error("No perk ID to redeem");

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

        // todo: do something with data
        
        
      } catch (err) {
        console.error("Error redeeming reward:", err);
      }
    };
    fetchEntries();
  }, [view, perkIdToRedeem]);

  // populate perks list
  useEffect(() => {
    ;(async () => {
      // populate perks list
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

      const perksContainer = document.getElementById("rewardsList") as HTMLDivElement;

      for (const perk of availablePerks) {
        const perkDiv = document.createElement("a");
        perkDiv.className = "ml-30 mr-30 my-5 bg-[#d1f0df] leading-10 backdrop-blur-md shadow-md rounded-2xl p-5 justify-between flex gap-10";
        perkDiv.innerHTML = `
          <img src="${perk.image_url}" alt="${perk.title} icon" width="80" height="20" />
          <p class="text-3xl py-5 font-semibold text-center mr-120"> ${perk.title} - ${perk.cost} credits</p>
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
                        setView('redeem');
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
            setView('redeem');
          });
        }
      }
      console.log("Perks list:", availablePerks);
    })()
  }, []);

  return (
    <section>
      <h1 className="text-4xl font-bold text-center">Rewards</h1>
      <p className="mt-2 text-gray-600 text-center">View your credits and redeem exclusive rewards here.</p>

      {view === "default" && (  
          <div className="overflow-auto whitespace-nowrap" id="rewardsList"></div>
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

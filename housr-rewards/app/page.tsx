"use client";
import { clipPath } from "framer-motion/client";
import Link from "next/link";
import { useEffect, useState } from "react";



export default function HomePage() {

  const [authToken, setAuthToken] = useState("");


  useEffect(() => {
    (async () => {
      // runs on page load
      await setAuthToken(sessionStorage.getItem("authToken") || "");

      if (authToken === "") {
  fetch("https://housr-rewards-backend.onrender.com/api/v1/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: 1,
          }),
        }).then((response) => response.json()).then((data) => {
          sessionStorage.setItem("authToken", data.token);
          sessionStorage.setItem("userId", "1");
          setAuthToken(data.token);
        });
      }
    })(); 
  }, []);
  return (
    <section className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-5xl font-bold mb-4">Welcome to student housing rewards</h1>
      <p className="text-gray-600 mb-8">Choose where you want to go</p>

    </section>
  );
}

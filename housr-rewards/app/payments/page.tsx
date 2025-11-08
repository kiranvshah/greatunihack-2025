// app/payments/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function PaymentsPage() {
  return (
    <section>
      <h1 className="text-4xl font-bold text-center">Your Current Tenancy</h1>
      <p className="mt-2 text-gray-600 text-center">
        Manage your transactions, invoices, and payment methods here.
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
        <div className="ml-10 leading-10">
          <p className="text-2xl py-5 font-semibold text-center"> Oxford Road, Manchester</p>
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
                Pay for 3 months (£2400.00)
          </Link>
          <p className="font-medium text-gray-600">Earn additional rewards when you make a single payment for 3 months.</p>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Image from "next/image";

import DashboardClient from "./components/dashboard";
import BackButton from "@/components/back-button";

export const metadata: Metadata = {
  title: 'Messaging Dashboard',
  description: "Your dashboard for managing your anonymous message page"
};

export default function Dashboard() {


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-lavender-50 to-ocean-50 p-4">
      <div className="flex items-center justify-between mb-2 w-full sm:px-5">
        <div>
          <BackButton/>
        </div>

        <div>
          <Image src="/assets/images/x-logo-full.webp" alt="Xolace Logo" width={50} height={50} />
        </div>
      </div>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-start md:text-center space-y-2">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 drop-shadow-sm">
            📬 Your Anonymous Messages
          </h1>
          <p className="text-gray-600 text-lg">
            Share your link and receive kind or probably not so kind, anonymous messages
          </p>
        </div>

       <DashboardClient />
      </div>
    </div>
  );
}

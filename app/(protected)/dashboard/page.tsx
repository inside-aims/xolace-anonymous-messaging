
import DashboardClient from "./components/dashboard";


export default function Dashboard() {


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-lavender-50 to-ocean-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-start md:text-center space-y-2">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 drop-shadow-sm">
            📬 Your Anonymous Messages
          </h1>
          <p className="text-gray-600 text-lg">
            Share your link and receive kind, anonymous messages
          </p>
        </div>

       <DashboardClient />
      </div>
    </div>
  );
}

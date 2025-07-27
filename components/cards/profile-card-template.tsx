"use client"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

interface ProfileCardProps {
  avatarUrl: string | null
  message: string
  date: string
  templateId: string
  variant: 'classic' | 'modern' | 'artistic'
  link?: string;
}

export const ProfileCard = ({ avatarUrl, message, date, templateId, variant, link}: ProfileCardProps) => {
  const baseCard =
    "w-[400px] h-[500px] p-8 rounded-3xl shadow-2xl flex flex-col justify-center items-center text-center relative overflow-hidden"

  const variants = {
    classic: "bg-gradient-to-br from-ocean-500 via-lavender-400 to-ocean-400 text-black border border-gray-300",
    modern: "bg-gradient-to-br from-blue-600 via-teal-500 to-green-400 text-white",
    artistic: "bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 text-white"
  }

  const badgeStyle = {
    classic: "text-xs text-gray-600 font-semibold",
    modern: "text-xs text-white font-bold tracking-wider",
    artistic: "text-xs text-gray-500/50 font-semibold italic"
  }

  return (
    <div id={templateId} className={`${baseCard} ${variants[variant]}`}>
      {/* Avatar and Name */}
      <div className="flex flex-col items-center mb-6">
        <Avatar className="w-16 h-16 ring-4 ring-white/50">
          <AvatarImage src={avatarUrl || "/assets/images/x-logo-full.webp"} alt={`Profile avatar`} />
          <AvatarFallback className="bg-gradient-to-br from-lavender-400 to-ocean-400 text-white text-xl font-bold uppercase">
            AN
          </AvatarFallback>
        </Avatar>
        <h3 className="mt-3 text-lg font-bold">Anonymous</h3>
      </div>

      {/* Message Box */}
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-[320px] w-full z-10">
        <p className="text-base text-black font-medium mb-4">{message}</p>
        <div className="border-t border-gray-200 pt-2">
          <p className="text-gray-700 text-xs mb-1">{date}</p>
          <p className={badgeStyle[variant]}>PROFILE MESSAGE</p>
        </div>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-center text-blue-600 mt-4 break-words hover:underline block"
          >
            {link}
          </a>
        )}
      </div>

      {/* Bottom Label */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <p className="text-xs text-white/80 font-medium">Your thoughts matter • Xolace</p>
      </div>
    </div>
  )
}

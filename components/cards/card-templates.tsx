"use client"

interface CardTemplateProps {
  message: string
  date: string
  templateId: string
}

export const CardTemplate1 = ({ message, date, templateId }: CardTemplateProps) => (
  <div
    id={templateId}
    className="w-[400px] h-[500px] card-template-1-gradient p-8 rounded-3xl shadow-2xl flex flex-col justify-center items-center text-center relative overflow-hidden border-none border-ocean-50 text-dark-1 outline-ocean-50"
  >
    {/* Decorative elements */}
    <div className="absolute top-4 left-4 w-8 h-8 bg-ocean-50/20 rounded-full"></div>
    <div className="absolute top-8 right-6 w-4 h-4 bg-ocean-50/30 rounded-full"></div>
    <div className="absolute bottom-6 left-8 w-6 h-6 bg-ocean-50/25 rounded-full"></div>

    {/* Main content */}
    <div className="bg-ocean-50/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-[320px] w-full">
      <div className="text-4xl mb-4">💜</div>
      <p className="text-gray-800 text-lg leading-relaxed mb-4 font-medium">{message}</p>
      <div className="border-t border-gray-200 pt-4">
        <p className="text-gray-600 text-sm mb-2">{date}</p>
        <p className="text-gray-500 text-xs font-semibold tracking-wide">ANONYMOUS MESSAGE</p>
      </div>
    </div>

    {/* Bottom branding */}
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
      <p className="text-white/80 text-xs font-medium">Share positivity • Xolace</p>
    </div>
  </div>
)

export const CardTemplate2 = ({ message, date, templateId }: CardTemplateProps) => (
  <div
    id={templateId}
    className="w-[400px] h-[500px] bg-gradient-to-br from-blue-500 via-teal-400 to-green-400 p-8 rounded-3xl shadow-2xl flex flex-col justify-center items-center text-center relative overflow-hidden"
  >
    {/* Geometric patterns */}
    <div className="absolute top-0 left-0 w-full h-full opacity-10">
      <div className="absolute top-12 left-12 w-16 h-16 border-2 border-white rotate-45"></div>
      <div className="absolute bottom-20 right-16 w-12 h-12 border-2 border-white rotate-12"></div>
      <div className="absolute top-32 right-8 w-8 h-8 bg-white rounded-full"></div>
    </div>

    {/* Main content */}
    <div className="bg-white rounded-2xl p-6 shadow-xl max-w-[320px] w-full z-10">
      <div className="text-4xl mb-4">✨</div>
      <p className="text-gray-800 text-lg leading-relaxed mb-4 font-medium">"{message}"</p>
      <div className="border-t border-gray-200 pt-4">
        <p className="text-gray-600 text-sm mb-2">{date}</p>
        <p className="text-blue-600 text-xs font-bold tracking-wide">ANONYMOUS KINDNESS</p>
      </div>
    </div>

    {/* Bottom branding */}
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
      <p className="text-white/80 text-xs font-medium">Share positivity • Xolace</p>
    </div>
  </div>
)

export const CardTemplate3 = ({ message, date, templateId }: CardTemplateProps) => (
  <div
    id={templateId}
    className="w-[400px] h-[500px] bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 p-8 rounded-3xl shadow-2xl flex flex-col justify-center items-center text-center relative overflow-hidden"
  >
    {/* Artistic elements */}
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-16 left-8 w-24 h-24 bg-white rounded-full blur-xl"></div>
      <div className="absolute bottom-24 right-12 w-32 h-32 bg-white rounded-full blur-2xl"></div>
    </div>

    {/* Main content */}
    <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl max-w-[320px] w-full z-10 border border-white/20">
      <div className="text-4xl mb-4">🌟</div>
      <p className="text-white text-lg leading-relaxed mb-4 font-light">{message}</p>
      <div className="border-t border-white/20 pt-4">
        <p className="text-white/80 text-sm mb-2">{date}</p>
        <p className="text-orange-300 text-xs font-semibold tracking-wide">ANONYMOUS INSPIRATION</p>
      </div>
    </div>

    {/* Bottom branding */}
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
      <p className="text-white/80 text-xs font-medium">Share positivity • Xolace</p>
    </div>
  </div>
)

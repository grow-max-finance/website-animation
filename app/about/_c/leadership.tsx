import { ArrowRight, User } from "lucide-react";
import Image from "next/image";

export default function Leadership() {
  const leaders = [
    {
      name: "Alex Thorne",
      role: "Co-Founder & CEO",
      image: "", // Will be filled later
    },
    {
      name: "Sarah Jenkins",
      role: "CTO",
      image: "", // Will be filled later
    },
    {
      name: "David Chen",
      role: "Head of Product",
      image: "", // Will be filled later
    },
    {
      name: "Elena Volkov",
      role: "Lead Researcher",
      image: "", // Will be filled later
    },
  ];

  return (
    <section className="relative bg-[#020204] text-white py-20 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              Meet the Leadership
            </h2>
            <p className="text-gray-400 text-lg">
              Veterans from TradFi, Big Tech, and Crypto natives.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
            View all contributors
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Leadership Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leaders.map((leader, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Image Placeholder */}
              <div className="relative aspect-square bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl mb-4 overflow-hidden flex items-center justify-center group-hover:scale-[1.02] transition-transform">
                {leader.image ? (
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-gray-600" />
                )}
              </div>
              {/* Info */}
              <h3 className="text-xl font-bold mb-1">{leader.name}</h3>
              <p className="text-gray-400">{leader.role}</p>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <button className="md:hidden flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mt-8 mx-auto">
          View all contributors
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

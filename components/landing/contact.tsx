"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    investorType: "",
    amountOfInterest: "",
    message: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const investorTypes = [
    { value: "individual", label: "Individual" },
    { value: "institutional", label: "Institutional" },
    { value: "fund", label: "Fund" },
    { value: "dao", label: "DAO" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleSelectInvestorType = (value: string) => {
    setFormData({ ...formData, investorType: value });
    setIsDropdownOpen(false);
  };

  return (
    <section id="contact" className="relative bg-[#020204] py-20 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#0069d0]/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#0069d0]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semi-bold text-white mb-3">
            Get in touch
          </h2>
          <p className="text-gray-400">
            Questions about Earn, Borrow, or large allocations? Speak to our team.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-500 text-xs uppercase tracking-wider mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-sm rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/10 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-gray-500 text-xs uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="jane@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-sm rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/10 transition-all duration-300"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-500 text-xs uppercase tracking-wider mb-2">
                Organization
              </label>
              <input
                type="text"
                placeholder="Jane Doe"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-sm rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/10 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-gray-500 text-xs uppercase tracking-wider mb-2">
                Investor Type
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-sm rounded-xl px-4 py-3 text-left text-white focus:outline-none focus:border-white/10 transition-all duration-300 flex items-center justify-between"
                >
                  <span className={formData.investorType ? "text-white" : "text-gray-600"}>
                    {formData.investorType
                      ? investorTypes.find((t) => t.value === formData.investorType)?.label
                      : "Select type"}
                  </span>
                  <FiChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-2 border border-white/5 bg-[#0a0a0a] backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
                    {investorTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => handleSelectInvestorType(type.value)}
                        className="w-full px-4 py-3 text-left text-white hover:bg-[#2A2A2A] transition-colors"
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-500 text-xs uppercase tracking-wider mb-2">
              Amount of Interest
            </label>
            <input
              type="text"
              value={formData.amountOfInterest}
              onChange={(e) => setFormData({ ...formData, amountOfInterest: e.target.value })}
              className="w-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-sm rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/10 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-gray-500 text-xs uppercase tracking-wider mb-2">
              Message
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-sm rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/10 transition-all duration-300 resize-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-[56px] bg-primary hover:bg-primary/90 text-white rounded-lg text-base font-medium transition-colors"
          >
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
}

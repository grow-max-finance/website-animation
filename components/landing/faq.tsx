"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Button } from "@/components/ui/button";

const faqs = [
    {
        question: "How does Earn generate returns?",
        answer: "Growmax lends stablecoins to institutional borrowers who provide over-collateralized crypto as security. Borrower interest funds user rewards",
    },
    {
        question: 'What does "up to 18% APR" mean?',
        answer: "It reflects potential annualized returns based on demand for liquidity and market conditions. Actual returns may vary.",
    },
    {
        question: "What does 50% LTV mean?",
        answer: "If a borrower pledges $100 of crypto, they can borrow up to $50 in stablecoins, maintaining a strong safety buffer",
    },
    {
        question: "What are the risks involved?",
        answer: "Smart contract risk, collateral price volatility, and market liquidity risk — mitigated through audits, over-collateralization, and continuous monitoring.",
    },
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="relative bg-[#020204] py-20 px-6 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#0069d0]/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#0069d0]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <h2 className="text-3xl md:text-4xl font-semi-bold text-white mb-10 text-center md:text-left">
                    Frequently Asked Questions
                </h2>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* FAQ Accordion */}
                    <div className="lg:col-span-2 space-y-3">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="group rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 backdrop-blur-sm overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex items-center justify-between p-5 text-left hover:bg-[#18181B80] transition-colors"
                                >
                                    <span className="text-gray-100 font-medium text-base">
                                        {faq.question}
                                    </span>
                                    <FiChevronDown
                                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0 ml-4 ${
                                            openIndex === index ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${
                                        openIndex === index
                                            ? "max-h-96 opacity-100"
                                            : "max-h-0 opacity-0"
                                    }`}
                                >
                                    <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Still have questions card */}
                    <div className="lg:col-span-1">
                        <div className="group rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 backdrop-blur-sm p-8 h-fit sticky top-24">
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                Still have a questions ?
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                Can&apos;t find the answer to your question? Send us an email and
                                we&apos;ll get back to your as soon as possible!
                            </p>
                            <Button variant="blue" className="w-full">
                                Send Email
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

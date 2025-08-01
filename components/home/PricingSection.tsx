"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

type PlanType = {
  id: "basic" | "pro";
  name: string;
  price: number;
  description: string;
  items: string[];
  paymentLink: string;
};

const PRICING__PLANS: PlanType[] = [
  {
    id: "basic",
    name: "Basic",
    price: 9,
    description: "Perfect for occasional use",
    items: [
      "5 PDF summaries per month",
      "Up to 20 pages per PDF",
      "Standard processing speed",
      "Basic summary format",
      "Email support",
    ],
    paymentLink: "/",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professionals and teams",
    price: 18,
    items: [
      "Unlimited PDF summaries",
      "Up to 100 pages per PDF",
      "Priority processing",
      "Custom summary length",
      "Multiple output formats",
      "24/7 priority support",
    ],
    paymentLink: "/",
  },
];

const PricingSection = () => {
  return (
    <section className="relative overflow-hidden" id="pricing">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div>
          <h2 className="uppercase font-bold text-xl mb-16 text-rose-500 text-center">
            Pricing
          </h2>
        </div>
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {PRICING__PLANS.map((plan, idx) => (
            <Plan {...plan} key={plan.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Plan = ({
  description,
  id,
  items,
  name,
  price,
  paymentLink,
}: PlanType) => {
  return (
    <div className="relative w-full max-w-lg hover:scale-105 transition-all duration-300">
      <div
        className={cn(
          "relative flex flex-col h-full z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl",
          id === "pro" && "border-rose-500 gap-5 border-[3px]"
        )}
      >
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
            <p className="text-base-content/80 mt-2">{description}</p>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <p className="text-5xl tracking-tight font-extrabold">${price}</p>
          <div className="flex flex-col justify-end mb-[4px]">
            <p className="text-xs uppercase font-semibold">usd</p>
            <p className="text-xs">/ month</p>
          </div>
        </div>

        <ul className="space-y-3.5 mt-6">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-2 items-center">
              <CheckIcon />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Button aligned at the bottom */}
        <div className="mt-auto pt-8">
          <Link
            href={paymentLink}
            className={cn(
              "w-full rounded-full text-white py-2 border-2 flex items-center justify-center gap-2 bg-gradient-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800",
              id === "pro"
                ? "border-rose-900"
                : "border-rose-100 from-rose-400 to-rose-500"
            )}
          >
            Buy Now
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;

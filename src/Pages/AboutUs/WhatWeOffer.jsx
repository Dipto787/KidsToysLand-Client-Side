import React from "react";

const offers = [
  { emoji: "🚗", label: "Toy Cars & Vehicles", desc: "Zoom around with speedy cars, trucks, and all kinds of fun vehicles!" },
  { emoji: "🤖", label: "Robots & Electric Toys", desc: "Discover cool robots and electric toys that light up and move!" },
  { emoji: "🧩", label: "Educational Games", desc: "Learn while you play with puzzles, brain teasers, and STEM kits." },
  { emoji: "👧", label: "Dolls & Pretend Play", desc: "Dress up, imagine, and create stories with dolls and pretend play sets." },
  { emoji: "🧱", label: "Building Blocks", desc: "Stack, build, and create endless adventures with colorful blocks." },
  { emoji: "🐻", label: "Plush Toys", desc: "Snuggle up with soft, cuddly friends — perfect for hugs anytime!" },
  { emoji: "🧸", label: "Seasonal & Gift Packs", desc: "Special toys and gift packs for every holiday and celebration." }
];

const WhatWeOffer = () => {
  return (
    <div className=" mx-auto  bg-yellow-50 rounded-xl p-8 shadow-lg font-comic select-none">
      <h2 className="text-center text-3xl mb-8 text-pink-500 drop-shadow-sm font-bold">📦 What We Offer</h2>
      <ul className="space-y-4 ">
        {offers.map(({ emoji, label, desc }) => (
          <li 
            key={label} 
            className="flex items-start bg-yellow-100 rounded-lg p-4 shadow-md hover:bg-yellow-200 transition-colors"
          >
            <span className="text-3xl mr-5">{emoji}</span>
            <div>
              <strong className="block text-lg text-yellow-900">{label}</strong>
              <p className="mt-1 text-yellow-700">{desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhatWeOffer;

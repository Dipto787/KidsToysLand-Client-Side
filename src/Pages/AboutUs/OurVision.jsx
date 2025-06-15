import React from "react";

const visionPoints = [
  "🌟 To inspire creativity and learning through play.",
  "💡 To provide safe, high-quality toys for every child.",
  "🌈 To nurture imagination and joy in every home.",
  "🤝 To build a trusted community of parents and kids.",
  "🚀 To innovate and bring the best educational toys worldwide."
];

const OurVision = () => {
  return (
    <div className="lg:px-0 px-4">
      <section className="  mx-auto bg-green-50 rounded-xl p-8 shadow-lg font-comic select-none my-12">
        <h2 className="text-center text-3xl mb-6 text-green-600 font-bold drop-shadow-sm">
          🌍 Our Vision
        </h2>
        <ul className=" list-inside space-y-3 text-green-800 text-lg">
          {visionPoints.map((point, idx) => (
            <li key={idx} className="hover:text-green-600 transition-colors cursor-default">
              {point}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default OurVision;

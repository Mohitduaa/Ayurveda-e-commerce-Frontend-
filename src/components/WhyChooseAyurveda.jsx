import React from "react";
import { Leaf, Star, Users } from "lucide-react";

const features = [
  {
    icon: <Leaf size={40} className="text-green-500" />,
    title: "100% Natural",
    description: "Authentic herbs and ingredients sourced directly from certified organic farms.",
  },
  {
    icon: <Star size={40} className="text-green-500" />,
    title: "Quality Assured",
    description: "GMP certified manufacturing with strict quality control measures.",
  },
  {
    icon: <Users size={40} className="text-green-500" />,
    title: "Expert Support",
    description: "Guidance from certified Ayurvedic practitioners for your wellness journey.",
  },
];

const WhyChooseAyurveda = () => {
  return (
    <section className="py-12 px-4 bg-gray-100">
      <h2 className="text-center text-2xl font-bold mb-8">Why Choose Ayurveda?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className=" p-6 rounded-lg shadow-md flex flex-col items-center text-center"
          >
            <div className="bg-green-100 p-4 rounded-full">{feature.icon}</div>
            <h3 className="text-lg font-semibold mt-4">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseAyurveda;

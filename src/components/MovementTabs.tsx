import React, { useState } from "react";
import { Leaf, Flame, Mountain, Wind, Droplet } from "lucide-react";

interface ElementDetail {
  chinese: string;
  name: string;
  season: string;
  flavour: string;
  organs: string;
  description: string;
  color: string;
  bgCircle: string;
  textColor: string;
  icon: React.ReactNode;
  foods: string[];
}

export default function MovementTabs() {
  const [activeElement, setActiveElement] = useState<number>(0);

  const elements: ElementDetail[] = [
    {
      chinese: "木",
      name: "Wood",
      season: "Spring",
      flavour: "Sour flavour",
      organs: "Liver · Gallbladder",
      description: "Support the free flow of Qi and adapt food choices to patterns of stagnation and imbalance.",
      color: "bg-emerald-800 text-white",
      bgCircle: "bg-emerald-100 border-emerald-500 text-emerald-800",
      textColor: "text-emerald-800",
      icon: <Leaf className="w-6 h-6" />,
      foods: ["Spinach", "Lemon", "Green Apple", "Green Tea", "Broccoli", "Plum"],
    },
    {
      chinese: "火",
      name: "Fire",
      season: "Summer",
      flavour: "Bitter flavour",
      organs: "Heart · Small Intestine",
      description: "Clear pathogenic heat, calm the Shen, and support cardiovascular and emotional balance.",
      color: "bg-red-700 text-white",
      bgCircle: "bg-red-100 border-red-500 text-red-700",
      textColor: "text-red-700",
      icon: <Flame className="w-6 h-6" />,
      foods: ["Red Bell Pepper", "Cacao", "Arugula", "Lotus Seed", "Green Tea"],
    },
    {
      chinese: "土",
      name: "Earth",
      season: "Late Summer / Transitions",
      flavour: "Sweet flavour",
      organs: "Spleen · Stomach",
      description: "Strengthen digestive fire, build Post-Natal Qi, and transform dampness.",
      color: "bg-amber-600 text-white",
      bgCircle: "bg-amber-100 border-amber-500 text-amber-700",
      textColor: "text-amber-800",
      icon: <Mountain className="w-6 h-6" />,
      foods: ["Pumpkin", "Sweet Potato", "Carrot", "Millet", "Oats", "Rice"],
    },
    {
      chinese: "金",
      name: "Metal",
      season: "Autumn",
      flavour: "Pungent flavour",
      organs: "Lung · Large Intestine",
      description: "Disperse and descend Lung Qi, protect the Wei Qi, and moisten dryness.",
      color: "bg-stone-600 text-white",
      bgCircle: "bg-stone-100 border-stone-400 text-stone-700",
      textColor: "text-stone-800",
      icon: <Wind className="w-6 h-6" />,
      foods: ["Ginger", "Garlic", "Onion", "Radish", "Pear", "Almond"],
    },
    {
      chinese: "水",
      name: "Water",
      season: "Winter",
      flavour: "Salty flavour",
      organs: "Kidney · Urinary Bladder",
      description: "Conserve Kidney Jing, balance Yin and Yang, and nourish root vitality.",
      color: "bg-sky-900 text-white",
      bgCircle: "bg-sky-100 border-sky-600 text-sky-800",
      textColor: "text-sky-900",
      icon: <Droplet className="w-6 h-6" />,
      foods: ["Seaweed", "Black Sesame", "Black Beans", "Walnut", "Chestnut"],
    },
  ];

  const current = elements[activeElement];

  return (
    <div className="w-full">
      {/* Five Movement Badges Grid */}
      <div className="grid grid-cols-5 gap-2 sm:gap-4 max-w-4xl mx-auto mb-8" id="movement-elements-grid">
        {elements.map((el, idx) => {
          const isActive = idx === activeElement;
          return (
            <button
              key={idx}
              onClick={() => setActiveElement(idx)}
              className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-white border-gold-medium shadow-md scale-105"
                  : "bg-white/50 border-sand-dark hover:bg-white hover:border-gold-light"
              }`}
              id={`movement-btn-${idx}`}
            >
              <span className="font-serif text-xl sm:text-2xl font-bold text-gold-dark mb-1">
                {el.chinese}
              </span>
              <span className="text-[11px] sm:text-xs font-serif font-semibold tracking-wide text-forest-dark uppercase">
                {el.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Element Correlation Card matching exact user text structure */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-sand-dark p-6 sm:p-8 mb-8 shadow-sm text-center" id="active-element-card">
        <div className="font-serif text-4xl sm:text-5xl font-bold text-forest-dark mb-2">
          {current.chinese}
        </div>
        <div className="font-serif text-xl sm:text-2xl font-bold text-forest-dark mb-1">
          {current.name}
        </div>
        <div className="text-xs sm:text-sm font-mono text-gold-dark font-medium uppercase tracking-wider mb-1">
          {current.season} · {current.flavour}
        </div>
        <div className="text-xs sm:text-sm font-semibold text-gray-700 mb-4">
          {current.organs}
        </div>
        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed mb-6">
          {current.description}
        </p>

        <div className="border-t border-sand-medium pt-4">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-gray-500 mb-2.5">
            Key Therapeutic Foods
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {current.foods.map((food, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 bg-sand-light text-forest-dark border border-sand-medium rounded-full font-medium"
              >
                🌱 {food}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

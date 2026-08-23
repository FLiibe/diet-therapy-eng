import React, { useState, useEffect } from "react";

const logoImgAvif = "https://res.cloudinary.com/dgncwrnvw/image/upload/v1787247786/ChatGPT_Image_20_ago_2026_14_41_16_2_adqdha.avif";
const logoImgWebp = "https://res.cloudinary.com/dgncwrnvw/image/upload/v1787247786/ChatGPT_Image_20_ago_2026_14_41_16_2_xvhzlo.webp";

interface AcuLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function AcuLogo({ className = "", size = "md" }: AcuLogoProps) {
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = logoImgWebp;
    if (img.complete) {
      setLogoLoaded(true);
    } else {
      img.onload = () => setLogoLoaded(true);
    }
  }, []);

  const sizeClasses = {
    sm: "w-16 h-16 md:w-20 md:h-20",
    md: "w-24 h-24 md:w-28 md:h-28",
    lg: "w-32 h-32 md:w-36 md:h-36",
  };

  return (
    <div className={`flex flex-col items-center text-center justify-center ${className}`}>
      {/* High Fidelity Generated Logo Icon */}
      <picture className={`${sizeClasses[size]} flex items-center justify-center`}>
        <source srcSet={logoImgAvif} type="image/avif" />
        <source srcSet={logoImgWebp} type="image/webp" />
        <img
          src={logoImgWebp}
          alt="AcuSalud Academy Logo"
          className={`${sizeClasses[size]} object-contain transition-opacity duration-300 ${logoLoaded ? "opacity-100" : "opacity-0"}`}
          id="acuacademy-logo-svg"
          referrerPolicy="no-referrer"
          onLoad={() => setLogoLoaded(true)}
        />
      </picture>
    </div>
  );
}


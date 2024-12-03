import React from "react";
import Marquee from "react-fast-marquee";

const LogoScroll = () => {
  const logos = [
    { src: "apple.png", alt: "Apple" },
    { src: "nintendo.png", alt: "Nintendo" },
    { src: "Anker.png", alt: "Anker" },
    { src: "realme.png", alt: "Realme" },
    { src: "belkin.png", alt: "Belkin" },
    { src: "meta.png", alt: "Meta" },
    { src: "xiaomi.png", alt: "Xiaomi" },
    { src: "oppo.png", alt: "Oppo" },
    { src: "samsung.png", alt: "Samsung" },
    { src: "sony.png", alt: "Sony" },
  ];

  return (
    <div className="py-4">
      {/* Infinite Scrolling Marquee */}
      <Marquee
        gradient={false} // Disable gradient for a cleaner look
        speed={100} // Adjust speed to your preference
        loop={0} // Scrolls one time
        direction="right" // Set direction to 'right'
      >
        {logos.map((logo, index) => (
          <img
            key={index}
            src={`/${logo.src}`}
            alt={logo.alt}
            className="h-16 mx-6 opacity-90 hover:opacity-100 transition duration-300"
          />
        ))}
      </Marquee>
      
    </div>
  );
};

export default LogoScroll;

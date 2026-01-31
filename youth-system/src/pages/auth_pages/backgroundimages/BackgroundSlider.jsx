import img1 from "@/img/1.jpg"
import img2 from "@/img/2.jpg"
import img3 from "@/img/3.jpg"
import img4 from "@/img/4.jpg"
import img5 from "@/img/5.jpg"
import img6 from "@/img/6.jpg"
import img7 from "@/img/7.jpg"
import img8 from "@/img/8.jpg"

import React from 'react'
const images = [img1, img2, img3, img4, img5, img6, img7, img8];


export default function BackgroundSlider() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[800px]">
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
    </div>
  );
}

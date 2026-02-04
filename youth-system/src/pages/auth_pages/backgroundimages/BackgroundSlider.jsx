// import img6 from "";
// import img7 from "";
// import img8 from "";

// import React from "react";
// const images = [img1, img2, img3, img4, img5, img6, img7, img8];

// export default function BackgroundSlider() {
//   const [index, setIndex] = React.useState(0);

//   React.useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((i) => (i + 1) % images.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative h-[800px]">
//       {images.map((img, i) => (
//         <div
//           key={i}
//           className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
//             i === index ? "opacity-100" : "opacity-0"
//           }`}
//           style={{ backgroundImage: `url(${img})` }}
//         />
//       ))}
//     </div>
//   );
// }

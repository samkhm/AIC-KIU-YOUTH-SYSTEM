import React from 'react';

export default function Footer() {
  const date = new Date();

  return (
    <footer className="w-full bg-blue-500 text-white flex items-center justify-center p-4 md:p-6 mt-8 shadow-inner">
      <h6 className="text-sm md:text-base">
        &copy; {date.getFullYear()} AIC KIU Youth. All rights reserved.
      </h6>
    </footer>
  );
}

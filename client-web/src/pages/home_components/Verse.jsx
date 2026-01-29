import React, { useState, useEffect } from "react";

const bibleBooks = [
  { name: "Genesis", chapters: 50 },
  { name: "Exodus", chapters: 40 },
  { name: "Psalms", chapters: 150 },
  { name: "John", chapters: 21 },
  { name: "Romans", chapters: 16 },
  { name: "Philippians", chapters: 4 },
  { name: "Proverbs", chapters: 31 },
];

export default function Verse() {
  const [verse, setVerse] = useState({
    reference: "John 3:16",
    text: "For God so loved the world that he gave his only Son, that whoever believes in him should not perish but have eternal life."
  });
  const [visible, setVisible] = useState(false); // controls fade + slide + glow

  const fetchRandomVerse = async () => {
    try {
      const book = bibleBooks[Math.floor(Math.random() * bibleBooks.length)];
      const chapter = Math.floor(Math.random() * book.chapters) + 1;

      const chapterDataRes = await fetch(`https://bible-api.com/${book.name} ${chapter}`);
      const chapterData = await chapterDataRes.json();
      const totalVerses = chapterData.verses.length;

      const verseNumber = Math.floor(Math.random() * totalVerses) + 1;

      const verseRes = await fetch(`https://bible-api.com/${book.name} ${chapter}:${verseNumber}`);
      const verseData = await verseRes.json();

      // Fade out + slide down
      setVisible(false);
      setTimeout(() => {
        setVerse({
          reference: verseData.reference,
          text: verseData.text
        });
        // Fade in + slide up + glow
        setVisible(true);
      }, 500);
    } catch (error) {
      console.error("Error fetching random verse:", error);
    }
  };

  // Initial fade-in + slide + glow
  useEffect(() => {
    setVisible(true);
    fetchRandomVerse();

    const interval = setInterval(() => {
      fetchRandomVerse();
    }, 30000); // every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`bg-white/20 backdrop-blur-md rounded-xl p-6 max-w-sm mx-auto
      shadow-lg hover:shadow-xl
      transition-all duration-700 transform
      ${visible ? "opacity-100 translate-y-0 ring-4 ring-blue-400/50 shadow-blue-400/40" : "opacity-0 translate-y-4 ring-0 shadow-none"}
      `}
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {verse.reference}
      </h3>
      <p className="text-gray-700 text-base leading-relaxed">
        {verse.text}
      </p>
    </div>
  );
}

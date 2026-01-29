import React, { useEffect, useRef, useState } from "react";

const books = [
  "Genesis","Exodus","Leviticus","Numbers","Deuteronomy",
  "Joshua","Judges","Ruth","1 Samuel","2 Samuel",
  "1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra",
  "Nehemiah","Esther","Job","Psalms","Proverbs",
  "Ecclesiastes","Song of Solomon","Isaiah","Jeremiah","Lamentations",
  "Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah","Jonah",
  "Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi",
  "Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians",
  "2 Corinthians","Galatians","Ephesians","Philippians","Colossians",
  "1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus",
  "Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John",
  "3 John","Jude","Revelation"
];

export default function DailyVerse() {
  const [reference, setReference] = useState("");
  const [verse, setVerse] = useState("Loading verse...");
  const abortRef = useRef(null);

  const getRandomVerse = async () => {
    // Cancel any in-flight request
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    const MAX_ATTEMPTS = 5;

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      try {
        const book = books[Math.floor(Math.random() * books.length)];
        const chapter = Math.floor(Math.random() * 50) + 1;
        const verseNum = Math.floor(Math.random() * 30) + 1;

        const query = `${book} ${chapter}:${verseNum}`.replace(/\s/g, "+");

        const res = await fetch(
          `https://bible-api.com/${query}?translation=kjv`,
          { signal: abortRef.current.signal }
        );

        if (!res.ok) continue;

        const data = await res.json();

        if (!data.text || !data.text.trim()) continue;

        setReference(data.reference);
        setVerse(data.text.trim());
        return;
      } catch (err) {
        if (err.name === "AbortError") return;
        // Silent failure – do nothing
      }
    }

    // Fallback if everything fails
    setReference("");
    setVerse("Unable to load verse at this time.");
  };

  useEffect(() => {
    getRandomVerse();

    const interval = setInterval(getRandomVerse, 180000); // 3 minutes

    return () => {
      abortRef.current?.abort();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <span className="font-semibold">{reference}</span>
      <span className="text-white text-sm">{verse}</span>
    </div>
  );
}

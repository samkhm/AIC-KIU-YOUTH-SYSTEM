import React, { useState, useEffect, useRef } from "react";
import "./BibleStories.css";
import Box from "./Box";

const storyRefs = [
  { label: "Job 1:1-22", path: "job+1:1-22" },
  { label: "Noah Genesis 6:9-22", path: "genesis+6:9-22" },
  { label: "David and Goliath 1 Samuel 17:1-50", path: "1samuel+17:1-50" },
  { label: "Daniel in the Lion’s Den Daniel 6:1-28", path: "daniel+6:1-28" }
];

export default function BibleStory() {
  const [current, setCurrent] = useState(0);
  const [storyText, setStoryText] = useState("Loading story...");
  const [fade, setFade] = useState(true);

  const abortRef = useRef(null);
  const indexRef = useRef(0);

  const fetchStory = async (refPath) => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      const response = await fetch(
        `https://bible-api.com/${refPath}?translation=web`,
        { signal: abortRef.current.signal }
      );

      if (!response.ok) return;

      const data = await response.json();

      if (!data?.text) return;

      setStoryText(data.text);
    } catch (err) {
      if (err.name === "AbortError") return;
      // Silent failure — do nothing
    }
  };

  useEffect(() => {
    // Initial load
    fetchStory(storyRefs[0].path);

    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        indexRef.current =
          (indexRef.current + 1) % storyRefs.length;

        setCurrent(indexRef.current);
        fetchStory(storyRefs[indexRef.current].path);
        setFade(true);
      }, 500);
    }, 180000); // 3 minutes

    return () => {
      abortRef.current?.abort();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="story-container animate__animated animate__zoomIn animate__delay-2s">
      <Box>
        <h3
          className={`font-semibold text-lg mb-2 border-b flex items-center justify-center ${
            fade ? "in" : "out"
          }`}
        >
          {storyRefs[current].label}
        </h3>

        <p
          className={`p-2 h-64 overflow-y-auto fade ${
            fade ? "in" : "out"
          }`}
        >
          {storyText}
        </p>
      </Box>
    </div>
  );
}

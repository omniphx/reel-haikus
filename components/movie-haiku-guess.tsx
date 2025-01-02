"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const movieHaiku = {
  haiku: `Dreaming in layers,\nMind's architecture bends time,\nReality blurs.`,
  movie: "Inception",
};

export function MovieHaikuGuess() {
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [showHaiku, setShowHaiku] = useState(false);

  useEffect(() => {
    setShowHaiku(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.toLowerCase() === movieHaiku.movie.toLowerCase()) {
      setResult("Correct! Well done!");
    } else {
      setResult(`Sorry, that's not correct.`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 via-purple-500 to-red-500">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-red-500">
            Reel Haikus
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 text-center">
            <p className="text-lg font-semibold mb-2 text-gray-700">
              Guess the movie based on this haiku:
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showHaiku ? 1 : 0, y: showHaiku ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="italic text-lg"
            >
              {movieHaiku.haiku.split("\n").map((line, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.5 }}
                  className="block"
                >
                  {line}
                </motion.span>
              ))}
            </motion.div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter your guess"
              className="w-full border-2 border-purple-300 focus:border-purple-500 focus:ring-purple-500"
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105"
            >
              Submit Guess
            </Button>
          </form>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 text-center text-lg font-semibold ${
                result.startsWith("Correct") ? "text-green-600" : "text-red-400"
              }`}
            >
              {result}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import ReviewForm from "./components/ReviewForm";
import ReviewCard from "./components/ReviewCard";
import { Review } from "./types";

export default function Home() {
  const [reviews, setReviews] = useState<Review[]>([]);

  // Load reviews from localStorage on mount
  useEffect(() => {
    const savedReviews = localStorage.getItem("wineReviews");
    if (savedReviews) {
      const parsedReviews = JSON.parse(savedReviews);
      // Add backward compatibility for reviews without nickname
      const migratedReviews = parsedReviews.map((review: Review) => ({
        ...review,
        nickname: review.nickname || "Anonymous",
      }));
      setReviews(migratedReviews);
    }
  }, []);

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    if (reviews.length > 0) {
      localStorage.setItem("wineReviews", JSON.stringify(reviews));
    }
  }, [reviews]);

  const handleAddReview = (reviewData: Omit<Review, "id" | "date">) => {
    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setReviews([newReview, ...reviews]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🍷 Vino y Más
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Share and discover your favorite wines and drinks
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Review Form - Left Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ReviewForm onSubmit={handleAddReview} />
            </div>
          </div>

          {/* Reviews Grid - Right Column */}
          <div className="lg:col-span-2">
            {reviews.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                  No reviews yet. Be the first to add one!
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-sm">
                  Use the form on the left to add your first review.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

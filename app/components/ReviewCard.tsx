import Image from 'next/image';
import { Review } from '../types';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const getTypeColor = (type: Review['type']) => {
    const colors = {
      wine: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      beer: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
      spirits: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      cocktail: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      other: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    };
    return colors[type];
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      const isFull = rating >= starValue;
      const isHalf = rating >= starValue - 0.5 && rating < starValue;
      
      if (isFull) {
        return (
          <span
            key={i}
            className="text-yellow-400 text-lg"
          >
            ★
          </span>
        );
      } else if (isHalf) {
        return (
          <span
            key={i}
            className="relative inline-block text-lg"
            style={{ width: '1em', height: '1em' }}
          >
            <span className="absolute inset-0 text-gray-300 dark:text-gray-600">★</span>
            <span 
              className="absolute inset-0 text-yellow-400 overflow-hidden"
              style={{ width: '50%' }}
            >
              ★
            </span>
          </span>
        );
      } else {
        return (
          <span
            key={i}
            className="text-gray-300 dark:text-gray-600 text-lg"
          >
            ★
          </span>
        );
      }
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative w-full h-64">
        {review.imageUrl.startsWith('data:') ? (
          <img
            src={review.imageUrl}
            alt={review.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={review.imageUrl}
            alt={review.name}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {review.name}
            </h3>
            {review.nickname && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                by {review.nickname}
              </p>
            )}
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(review.type)}`}
          >
            {review.type}
          </span>
        </div>
        <div className="flex items-center gap-1 mb-3">
          {renderStars(review.rating)}
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            {review.rating.toFixed(1)}/5
          </span>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">
          {review.notes}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(review.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
}


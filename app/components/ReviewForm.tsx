'use client';

import { useState, FormEvent } from 'react';
import { Review } from '../types';

interface ReviewFormProps {
  onSubmit: (review: Omit<Review, 'id' | 'date'>) => void;
}

export default function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [type, setType] = useState<Review['type']>('wine');
  const [rating, setRating] = useState(5);
  const [notes, setNotes] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!imageFile) {
      alert('Please select an image');
      return;
    }

    setIsSubmitting(true);

    // Convert image to base64 for storage (in a real app, you'd upload to a server)
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result as string;
      
      onSubmit({
        name,
        nickname,
        type,
        rating,
        notes,
        imageUrl,
      });

      // Reset form
      setName('');
      setNickname('');
      setType('wine');
      setRating(5);
      setNotes('');
      setImageFile(null);
      setImagePreview(null);
      setIsSubmitting(false);
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Add New Review
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Drink Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g., Château Margaux 2015"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Nickname
          </label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g., WineLover, Dad, Mom"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as Review['type'])}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="wine">Wine</option>
            <option value="beer">Beer</option>
            <option value="spirits">Spirits</option>
            <option value="cocktail">Cocktail</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Rating: {rating.toFixed(1)}/5
          </label>
          <input
            type="range"
            min="1"
            max="5"
            step="0.5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>1</span>
            <span>1.5</span>
            <span>2</span>
            <span>2.5</span>
            <span>3</span>
            <span>3.5</span>
            <span>4</span>
            <span>4.5</span>
            <span>5</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Share your thoughts about this drink..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 dark:file:bg-red-900 dark:file:text-red-200"
          />
          {imagePreview && (
            <div className="mt-4 relative w-full h-48 rounded-lg overflow-hidden">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Adding Review...' : 'Add Review'}
        </button>
      </div>
    </form>
  );
}


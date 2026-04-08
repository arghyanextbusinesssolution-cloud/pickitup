'use client';

import React, { useEffect, useState } from 'react';
import { carrierService } from '@/services/carrier.service';

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  fromUser: {
    firstName: string;
    lastName: string;
  };
  shipment: {
    title: string;
  };
}

export default function CarrierReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await carrierService.getReviews();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const starCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100 : 0
  }));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs tracking-[0.2em]">Gathering feedback...</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-20">
      <div className="mb-10">
        <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Reputation Engine</div>
        <h1 className="text-3xl font-[1000] text-gray-900 uppercase tracking-tight">Marketplace feedback</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Overall Score */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-gray-50 shadow-sm text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
          <div className="relative z-10">
            <div className="text-7xl font-[1000] text-gray-900 tracking-tighter mb-2">{averageRating}</div>
            <div className="flex justify-center text-yellow-400 text-2xl mb-4">
              {'★'.repeat(Math.round(Number(averageRating)))}{'☆'.repeat(5 - Math.round(Number(averageRating)))}
            </div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Lifetime Score ({reviews.length} Reviews)</div>
          </div>
        </div>

        {/* Star Distribution */}
        <div className="md:col-span-2 bg-white rounded-[2.5rem] p-10 border border-gray-50 shadow-sm flex flex-col justify-center space-y-4">
          {starCounts.map(({ star, count, percentage }) => (
            <div key={star} className="flex items-center gap-6">
              <div className="text-[10px] font-black text-gray-400 w-10 uppercase">{star} Star</div>
              <div className="flex-1 h-2 bg-gray-50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-400 transition-all duration-1000 ease-out" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="text-[10px] font-black text-gray-500 w-10 text-right uppercase">
                {count}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-sm border border-gray-50 p-12">
        <h2 className="text-xl font-[1000] text-gray-900 uppercase tracking-tight border-b border-gray-50 pb-8 mb-8">Recent Testimonials</h2>

        {reviews.length > 0 ? (
          <div className="space-y-12">
            {reviews.map((review) => (
              <div key={review.id} className="group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-black text-gray-400 uppercase text-xs">
                      {review.fromUser.firstName[0]}{review.fromUser.lastName[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-yellow-400 text-xs tracking-tighter">
                          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                        </div>
                        <span className="font-black text-gray-900 uppercase text-sm tracking-tight">
                          {review.fromUser.firstName} {review.fromUser.lastName}
                        </span>
                      </div>
                      <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Verified Shipper</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                
                <p className="text-gray-600 font-medium text-base mb-6 leading-relaxed max-w-3xl italic">
                  "{review.comment || 'No comment provided.'}"
                </p>
                
                <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-50 inline-flex items-center gap-3">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-200 pr-3">Job Title</span>
                  <span className="text-gray-900 font-bold uppercase text-[10px] tracking-tight">{review.shipment.title}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="text-4xl mb-4">⭐</div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">No reviews yet. Keep delivering!</div>
          </div>
        )}
      </div>
    </div>
  );
}

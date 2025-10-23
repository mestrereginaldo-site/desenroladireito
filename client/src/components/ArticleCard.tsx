import React from 'react';
import balanca from '/images/balanca.jfif';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  readTime: string;
  author: string;
  date: string;
}

export default function ArticleCard({ title, excerpt, readTime, author, date }: ArticleCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={balanca} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{author}</span>
          <span>{date}</span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-blue-600 font-medium">{readTime}</span>
          <button className="text-blue-600 font-medium hover:text-blue-800">Ler mais →</button>
        </div>
      </div>
    </article>
  );
}

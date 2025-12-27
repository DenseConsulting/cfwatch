import React from 'react';
import { ClockIcon, ArrowRightIcon, FileTextIcon } from 'lucide-react';
export interface Resource {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  publishDate: string;
  author: string;
}
interface ResourceCardProps {
  resource: Resource;
  onRead?: (id: string) => void;
}
export function ResourceCard({
  resource,
  onRead
}: ResourceCardProps) {
  const handleClick = () => {
    onRead?.(resource.id);
  };
  return <article className="bg-white rounded-lg border-2 border-gray-200 hover:border-[var(--color-gold)] transition-all overflow-hidden hover:shadow-lg group cursor-pointer" onClick={handleClick}>
      {/* Icon Header */}
      <div className="bg-gradient-to-br from-[var(--color-navy)] to-[#1a2847] p-6 flex items-center justify-center">
        <FileTextIcon className="w-12 h-12 text-[var(--color-gold)]" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="inline-block px-3 py-1 bg-[var(--color-gold)]/10 text-[var(--color-gold)] text-xs font-semibold rounded-full mb-3">
          {resource.category}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[var(--color-navy)] mb-2 line-clamp-2 group-hover:text-[var(--color-gold)] transition-colors">
          {resource.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {resource.excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <span>{resource.author}</span>
            <span>{new Date(resource.publishDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-3 h-3" />
            <span>{resource.readTime} min read</span>
          </div>
        </div>

        {/* Read More Button */}
        <button onClick={e => {
        e.stopPropagation();
        handleClick();
      }} className="flex items-center gap-2 text-[var(--color-navy)] hover:text-[var(--color-gold)] font-semibold text-sm transition-colors">
          <span>Read Article</span>
          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </article>;
}
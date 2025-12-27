import React, { useEffect } from 'react';
import { XIcon, ClockIcon, CalendarIcon, UserIcon, ShareIcon, BookmarkIcon, PrinterIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from './Button';
interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: number;
  publishDate: string;
  author: string;
  authorTitle?: string;
}
interface ArticleModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}
export function ArticleModal({
  article,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious
}: ArticleModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrevious && onPrevious) {
        onPrevious();
      } else if (e.key === 'ArrowRight' && hasNext && onNext) {
        onNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hasNext, hasPrevious, onNext, onPrevious, onClose]);
  if (!isOpen || !article) return null;
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  const handlePrint = () => {
    window.print();
  };
  return <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl pointer-events-auto transform transition-all duration-300 max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
          {/* Header - Sticky */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Close article">
                <XIcon className="w-5 h-5 text-gray-500" />
              </button>
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                <span className="px-3 py-1 bg-[var(--color-gold)]/10 text-[var(--color-gold)] font-semibold rounded-full">
                  {article.category}
                </span>
                <span>•</span>
                <span>{article.readTime} min read</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button onClick={handleShare} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Share article">
                <ShareIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button onClick={() => console.log('Bookmark')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Bookmark article">
                <BookmarkIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button onClick={handlePrint} className="hidden sm:block p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Print article">
                <PrinterIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="overflow-y-auto flex-1">
            <article className="max-w-3xl mx-auto px-6 py-8 sm:py-12">
              {/* Article Header */}
              <header className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-navy)] mb-4 leading-tight">
                  {article.title}
                </h1>

                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-[var(--color-navy)]">
                      {article.author}
                    </span>
                    {article.authorTitle && <span className="text-gray-500">
                        • {article.authorTitle}
                      </span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                    <span>
                      {new Date(article.publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4 text-gray-400" />
                    <span>{article.readTime} min read</span>
                  </div>
                </div>
              </header>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none prose-headings:text-[var(--color-navy)] prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[var(--color-navy)] prose-a:no-underline hover:prose-a:text-[var(--color-gold)] prose-strong:text-[var(--color-navy)] prose-ul:text-gray-700 prose-ol:text-gray-700" dangerouslySetInnerHTML={{
              __html: article.content
            }} />

              {/* Call to Action */}
              <div className="mt-12 p-6 bg-gradient-to-br from-[var(--color-navy)] to-[#1a2847] rounded-xl text-white">
                <h3 className="text-xl font-bold mb-2 text-white">
                  Need Legal Assistance?
                </h3>
                <p className="text-gray-300 mb-4">
                  Connect with experienced civil forfeiture attorneys who can
                  help protect your property rights.
                </p>
                <Button variant="primary" size="md">
                  Find an Attorney
                </Button>
              </div>

              {/* Author Bio */}
              {article.authorTitle && <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-[var(--color-navy)] rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                      {article.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--color-navy)] mb-1">
                        {article.author}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {article.authorTitle}
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Specializing in civil asset forfeiture law with
                        extensive experience representing clients in federal and
                        state cases.
                      </p>
                    </div>
                  </div>
                </div>}
            </article>
          </div>

          {/* Footer Navigation - Sticky */}
          {(hasPrevious || hasNext) && <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between max-w-3xl mx-auto">
                <button onClick={onPrevious} disabled={!hasPrevious} className="flex items-center gap-2 text-sm font-semibold text-[var(--color-navy)] hover:text-[var(--color-gold)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  <ChevronLeftIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous Article</span>
                  <span className="sm:hidden">Previous</span>
                </button>

                <span className="text-sm text-gray-500">
                  Use arrow keys to navigate
                </span>

                <button onClick={onNext} disabled={!hasNext} className="flex items-center gap-2 text-sm font-semibold text-[var(--color-navy)] hover:text-[var(--color-gold)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  <span className="hidden sm:inline">Next Article</span>
                  <span className="sm:hidden">Next</span>
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>}
        </div>
      </div>
    </>;
}
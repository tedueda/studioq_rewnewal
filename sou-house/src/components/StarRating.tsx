interface StarRatingProps {
  rating: number;
  maxStars?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function StarRating({
  rating,
  maxStars = 5,
  interactive = false,
  onRate,
  size = 'md',
}: StarRatingProps) {
  const sizeClass = `stars-${size}`;

  return (
    <span className={`star-rating ${sizeClass} ${interactive ? 'interactive' : ''}`}>
      {Array.from({ length: maxStars }, (_, i) => {
        const starValue = i + 1;
        const filled = starValue <= rating;
        return (
          <span
            key={i}
            className={`star ${filled ? 'filled' : 'empty'}`}
            onClick={interactive && onRate ? () => onRate(starValue) : undefined}
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            onKeyDown={
              interactive && onRate
                ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onRate(starValue);
                    }
                  }
                : undefined
            }
            aria-label={interactive ? `${starValue} star${starValue > 1 ? 's' : ''}` : undefined}
          >
            {filled ? '\u2605' : '\u2606'}
          </span>
        );
      })}
    </span>
  );
}

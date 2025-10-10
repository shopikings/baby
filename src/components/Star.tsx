interface StarProps {
  filled?: boolean
  className?: string
}

function Star({ filled = true, className = '' }: StarProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className={className}>
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={filled ? '#EFECDA' : 'transparent'}
        stroke={filled ? '#EFECDA' : '#EFECDA'}
        strokeWidth="1"
      />
    </svg>
  )
}

export default Star

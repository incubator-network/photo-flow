import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

type PropsType = {
  text: string
  maxLength?: number
  className: string
}
export default function ExpandableText({ text, maxLength = 50, className }: PropsType) {
  const [expanded, setExpanded] = useState(false)
  const isLong = text.length > maxLength
  const displayText = expanded || !isLong ? text : text.slice(0, maxLength)

  return (
    <div>
      <p className={twMerge(className, 'inline whitespace-pre-wrap')}>
        {displayText}
        {isLong && !expanded && '... '}
        {isLong && (
          <button
            className={'text-accent-500 inline underline'}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </p>
    </div>
  )
}

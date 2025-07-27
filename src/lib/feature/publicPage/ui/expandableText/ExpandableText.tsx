'use client'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Typography } from '@/components/ui/typography/Typography'

type PropsType = {
  text: string
  maxLength?: number
  className: string
}
export default function ExpandableText({ text, maxLength = 72, className }: PropsType) {
  const [expanded, setExpanded] = useState(false)
  const isLong = text.length > maxLength
  const displayText = expanded || !isLong ? text : text.slice(0, maxLength)

  return (
    <div>
      <Typography
        variant={'regular_text_14'}
        className={twMerge(className, 'inline whitespace-pre-wrap')}
      >
        {displayText}
        {isLong && !expanded && '... '}
        {isLong && (
          <>
            <span> </span>
            <Typography
              variant={'regular_link'}
              className={'inline'}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'Hide' : 'Show more'}
            </Typography>
          </>
        )}
      </Typography>
    </div>
  )
}

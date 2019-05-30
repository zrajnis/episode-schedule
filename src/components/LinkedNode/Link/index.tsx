import React from 'react'

interface ComponentProps {
  direction: 'left' | 'right'
}

const Link = ({ direction }: ComponentProps): ReactElement =>
  <div className={`c-linked-node__link c-linked-node__link--${direction}`}>
  </div>

export default Link

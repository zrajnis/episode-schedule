import React, { ReactElement } from 'react'

interface ComponentProps {
  direction: 'left' | 'right'
}

const Link = ({ direction }: ComponentProps): ReactElement =>
  <div className={`c-linked-node__link c-linked-node__link--${direction} o-fade-in`} />

export default Link

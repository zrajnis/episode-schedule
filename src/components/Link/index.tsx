import React from 'react'

interface ComponentProps {
  direction: 'left' | 'right'
}

const Link = ({ direction }: ComponentProps): ReactElement =>
  <div className={`c-link c-link--${direction}`}>
    <div className='c-link__body'></div>
    <div className='c-link__arrow'></div>
  </div>

export default Link

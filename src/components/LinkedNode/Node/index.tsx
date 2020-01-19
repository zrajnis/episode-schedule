import React, { ReactElement } from 'react'

import renderClassName from 'utils/renderClassName'

interface ComponentProps {
  color: 'blue' | 'red',
  id: string,
  onClick: (value: number | null, id: string) => void,
  selected: boolean,
  value: number | null,
}

const Node = ({ color, id, onClick,  selected, value }: ComponentProps): ReactElement => {
  const handleClick = () => {
    if (value) {
      onClick(value, id)
    }
  }

  return (
    <div
      className={
        renderClassName(`c-linked-node__node c-linked-node__node--${color}`, 'c-linked-node__node--selected', selected)
      }
      onClick={handleClick}
    >
      {value}
    </div>   
  )
}

export default Node

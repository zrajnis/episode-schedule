import React from 'react'

interface ComponentProps {
  color: 'blue' | 'red',
  value: number | null,
}

const Node = ({ color, value }: ComponentProps): ReactElement =>
  <div className={`c-linked-node__node c-linked-node__node--${color}`}>{value}</div>

export default Node

import React from 'react'

interface ComponentProps {
  color: 'blue' | 'red',
  value: number
}

const Node = ({ color, value }: ComponentProps): ReactElement =>
  <div className={`c-node c-node--${color}`}>{value}</div>

export default Node

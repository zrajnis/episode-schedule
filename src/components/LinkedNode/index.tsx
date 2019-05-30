import React from 'react'

import Link from 'components/LinkedNode/Link'
import Node from 'components/LinkedNode/Node'

interface ComponentProps {
  color: 'blue' | 'red',
  rowNumber: number,
  value: number,
}

const LinkedNode = ({ rowNumber, ...rest }: ComponentProps): ReactElement =>
  <div className={`c-linked-node c-linked-node--${rowNumber}`}>
    <Node {...rest} />
    <Link
      direction='left'
    />
    <Link
      direction='right'
    />
  </div>

export default LinkedNode;

import React from 'react'

import Link from 'components/LinkedNode/Link'
import Node from 'components/LinkedNode/Node'

interface ComponentProps {
  color: 'blue' | 'red',
  rowNumber: number,
  value: number | null,
}

const calculateClasses = (rowNumber: number | undefined, value: number | null) =>
  `c-linked-node c-linked-node--${rowNumber} o-fade-in ${value != null ? '' : 'u-hidden'}`

const LinkedNode = ({ rowNumber, ...nodeProps }: ComponentProps): ReactElement =>
  <div className={calculateClasses(rowNumber, nodeProps.value)}>
    <Node {...nodeProps} />
    <Link direction='left'/>
    <Link direction='right'/>
  </div>

export default LinkedNode

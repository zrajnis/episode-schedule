import React, { ReactElement } from 'react'

import Link from 'components/LinkedNode/Link'
import Node from 'components/LinkedNode/Node'

interface ComponentProps {
  color: 'blue' | 'red',
  displayLeftLink: boolean,
  displayRightLink: boolean,
  rowNumber: number,
  value: number | null,
}

const calculateClasses = (rowNumber: number | undefined, value: number | null) =>
  `c-linked-node c-linked-node--${rowNumber} o-fade-in ${value !== null ? '' : 'u-hidden'}`

const LinkedNode = ({
  rowNumber,
  displayLeftLink,
  displayRightLink,
  ...nodeProps
}: ComponentProps): ReactElement =>
  <div className={calculateClasses(rowNumber, nodeProps.value)}>
    <Node {...nodeProps} />
    {displayLeftLink && <Link direction='left'/>}
    {displayRightLink && <Link direction='right'/>}
  </div>

export default LinkedNode

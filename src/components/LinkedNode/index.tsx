import React, { ReactElement } from 'react'

import Link from 'components/LinkedNode/Link'
import Node from 'components/LinkedNode/Node'
import renderClassName from 'utils/renderClassName'

interface ComponentProps {
  color: 'blue' | 'red',
  displayLeftLink: boolean,
  displayRightLink: boolean,
  id: string,
  onClick: (value: number | null, id: string) => void,
  rowNumber: number,
  selected: boolean,
  value: number | null,
}

const renderContainerClassName = (rowNumber: number | undefined, value: number | null) =>
  renderClassName( `c-linked-node c-linked-node--${rowNumber} o-fade-in`, 'u-hidden', value === null)

const LinkedNode = ({
  rowNumber,
  displayLeftLink,
  displayRightLink,
  ...nodeProps
}: ComponentProps): ReactElement =>
  <div className={renderContainerClassName(rowNumber, nodeProps.value)}>
    <Node {...nodeProps} />
    {displayLeftLink && <Link direction='left'/>}
    {displayRightLink && <Link direction='right'/>}
  </div>

export default LinkedNode

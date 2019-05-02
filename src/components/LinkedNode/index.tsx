import React from 'react'

import Link from 'components/Link'
import Node from 'components/Node'

interface ComponentProps {
  color: 'blue' | 'red',
  value: number
}

const LinkedNode = (props: ComponentProps): ReactElement =>
  <div className='c-linked-node'>
    <Node {...props} />
    <div className='c-linked-node__links'>
      <Link direction='left'/>
      <Link direction='right'/>
    </div>
  </div>

export default LinkedNode;

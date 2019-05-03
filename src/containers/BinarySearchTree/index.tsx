import React, { useState } from 'react'
import { ReactElement } from '@types/react'

import LinkedNode from 'components/LinkedNode'
import SubmitForm from 'components/SubmitForm'

import TreeFactory from 'factories/tree'

const tree = TreeFactory()

const BinarySearchTree = () :ReactElement => {
  const [ matrix, setMatrix ] = useState([[]])

  const onSubmit = (val: number) => {
    setMatrix(tree.add(val).getMatrix())
  }

  const displayRows = () =>
    <div className='u-m-t-50'>
      {matrix.map((row: (number | null)[]) =>
        <div className='u-flex-middle' key={JSON.stringify(row)}>
          {row.map((val: number | null, i: number) =>
            <LinkedNode
              color={i % 2 === 0 ? 'blue' : 'red'}
              value={val}
              key={val}
            />
          )}
        </div>
      )}
    </div>

  return (
    <div>
      <SubmitForm onSubmit={onSubmit} />
      {displayRows()}
    </div>
  )
}


export default BinarySearchTree

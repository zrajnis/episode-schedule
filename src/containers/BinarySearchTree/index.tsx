import React, { useState } from 'react'
import { ReactElement } from '@types/react'

import LinkedNode from 'components/LinkedNode'
import SubmitForm from 'components/SubmitForm'

import TreeFactory from 'factories/tree'

const tree = TreeFactory()

const BinarySearchTree = (): ReactElement => {
  const [ error, setError ] = useState(null)
  const [ matrix, setMatrix ] = useState([[]])

  const onSubmit = (val: number) => {
    try {
      tree.add(val)
      setMatrix(tree.getMatrix())
    } catch (e) {
      setError(e.message)
      setTimeout(() => setError(null), 2000)
    }
  }

  const displayRows =
    <div className='u-m-t-50'>
      {matrix.map((row: (number | string)[], i: number) =>
        <div className='u-flex-middle' key={i}>
          {row.map((val: number | string, j: number) =>
            <LinkedNode
              color={j % 2 === 0 ? 'blue' : 'red'}
              value={typeof val === 'number' ? val : null}
              key={val}
            />
          )}
        </div>
      )}
    </div>

  return (
    <div>
      <SubmitForm onSubmit={onSubmit} />
      <div className={`${error ? 'c-error' : 'c-error c-error--hidden'}`}>{error}</div>
      {displayRows}
    </div>
  )
}


export default BinarySearchTree

import React, { useState } from 'react'
import { ReactElement } from '@types/react'

import LinkedNode from 'components/LinkedNode'
import SubmitForm from 'components/SubmitForm'

import TreeFactory from 'factories/tree'
import IMatrixElement from 'models/matrixElement'
import IMatrixRow from 'models/matrixRow'

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

  const displayRows = matrix[0].elements &&
    <div className='u-m-t-50'>
      {matrix.map((row: IMatrixRow[]) =>
        <div className='u-flex-middle'
          key={row.id}>
          {row.elements.map((el: IMatrixElement, i: number) =>
            <LinkedNode
              color={i % 2 === 0 ? 'blue' : 'red'}
              key={el.id}
              value={el.value}
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

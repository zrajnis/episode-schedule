import React, { useState, ReactElement } from 'react'

import InsertForm from 'components/InsertForm'
import LinkedNode from 'components/LinkedNode'

import TreeFactory from 'factories/tree'
import { IMatrixElement, IMatrixRow } from 'models/matrix'

const tree = TreeFactory()

const BinarySearchTree = (): ReactElement => {
  const [ error, setError ] = useState(null)
  const [ matrix, setMatrix ] = useState<IMatrixRow[]>()

  const onSubmit = (val: number) => {
    try {
      tree.insert(val)
      setMatrix(tree.getMatrix())
    } catch (e) {
      setError(e.message)
      setTimeout(() => setError(null), 2000)
    }
  }

  const displayRows = matrix &&
    <div className='c-tree'>
      {matrix.map((row: IMatrixRow, i: number) =>
        <div className='u-flex-middle'
          key={row.id}>
          {row.elements.map((el: IMatrixElement, j: number) =>
            <LinkedNode
              color={j % 2 === 0 ? 'blue' : 'red'}
              displayLeftLink={!!tree.getLeftChild(el.value, el.id)}
              displayRightLink={!!tree.getRightChild(el.value, el.id)}
              key={el.id}
              rowNumber={i + 1}
              value={el.value}
            />
          )}
        </div>
      )}
    </div>

  return (
    <>
      <div className='u-flex-center u-flex-column u-m-t-50'>
        <InsertForm onSubmit={onSubmit} />
        <div className={`${error ? 'c-error' : 'c-error c-error--hidden'}`}>{error}</div>
      </div>
      {displayRows}
    </>
  )
}


export default BinarySearchTree

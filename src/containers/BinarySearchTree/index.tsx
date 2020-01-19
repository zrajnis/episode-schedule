import React, { useCallback, useState, ReactElement } from 'react'

import InsertForm from 'components/InsertForm'
import LinkedNode from 'components/LinkedNode'

import TreeFactory from 'factories/tree'
import { IMatrixElement, IMatrixRow } from 'models/matrix'

const tree = TreeFactory()

const BinarySearchTree = (): ReactElement => {
  const [ error, setError ] = useState(null)
  const [ matrix, setMatrix ] = useState<IMatrixRow[] | null>()
  const [ selectedMatrixElement, setSelectedMatrixElement ] = useState<IMatrixElement | null>(null)

  const onSubmit = (val: number) => {
    try {
      tree.insert(val)
      setMatrix(tree.getMatrix())
    } catch (e) {
      setError(e.message)
      setTimeout(() => setError(null), 2000)
    }
  }

  const handleRemoveClick = (): void => {
    if (!selectedMatrixElement) {
      return
    }

    tree.remove(selectedMatrixElement)
    setSelectedMatrixElement(null)
    setMatrix(tree.getMatrix())
  }

  const selectMatrixElement = useCallback((value: number, id: string): void => {
    if (selectedMatrixElement && selectedMatrixElement.id === id) {
      setSelectedMatrixElement(null)

      return
    }

    setSelectedMatrixElement({
      id,
      value
    })

  }, [ selectedMatrixElement ])

  const displayRows = matrix &&
    <div className='c-tree'>
      {matrix.map((row: IMatrixRow, i: number) =>
        <div className='u-flex-middle'
          key={row.id}>
          {row.elements.map((el: IMatrixElement, j: number) =>
            <LinkedNode
              color={j % 2 === 0 ? 'blue' : 'red'}
              displayLeftLink={!!tree.getLeftChild(el)}
              displayRightLink={!!tree.getRightChild(el)}
              key={el.id}
              onClick={selectMatrixElement}
              rowNumber={i + 1}
              selected={!!(selectedMatrixElement && el.id === selectedMatrixElement.id)}
              {...el}
            />
          )}
        </div>
      )}
    </div>

  return (
    <>
      <div className='u-flex-center u-flex-column u-p-t-50'>
        <InsertForm onSubmit={onSubmit} />
        <button
          onClick={handleRemoveClick}
        >
          remove
        </button>
        <div className={`${error ? 'c-error' : 'c-error c-error--hidden'}`}>{error}</div>
      </div>
      {displayRows}
    </>
  )
}


export default BinarySearchTree

import React from 'react'
import { ReactElement } from '@types/react'

import LinkedNode from 'components/LinkedNode'
import SubmitForm from 'components/SubmitForm'

import TreeFactory from 'factories/tree'

const App = () :ReactElement => {
  const tree = TreeFactory()
  return (
    <div>
      <SubmitForm onSubmit={tree.add} />
      <LinkedNode
        color='blue'
        value={5}
      />
      <button onClick={tree.getMatrix}>Get matrix</button>
    </div>
  )
}


export default App

import React from 'react'
import { ReactElement } from '@types/react'

import LinkedNode from 'components/LinkedNode'
import SubmitForm from 'components/SubmitForm'

const App = () :ReactElement => {
  return (
    <div>
      <SubmitForm onSubmit={()=>{}} />
      <LinkedNode
        color='blue'
        value={5}
      />
    </div>
  )
}


export default App

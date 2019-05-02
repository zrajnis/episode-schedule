import React, { useState } from 'react'

interface ComponentProps {
  onSubmit: () => void
}

const SubmitForm = ({ onSubmit }: ComponentProps): ReactElement => {
  const [ inputValue, setInputValue ] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onSubmit()
    setInputValue('')
  }

  const handleChange = ({ target: { value } }: any) => setInputValue(value)

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='c-input'
        onChange={handleChange}
        placeholder='Enter a number'
        type='number'
        value={inputValue}
      />
    </form>
  )
}

export default SubmitForm
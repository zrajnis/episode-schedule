import React, { useState, ReactElement, ChangeEvent, FormEvent } from 'react'

interface ComponentProps {
  onSubmit: (value: number) => void
}

const SubmitForm = ({ onSubmit }: ComponentProps): ReactElement => {
  const [ inputValue, setInputValue ] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (inputValue === '') {
      return
    }

    onSubmit(Number(inputValue))
    setInputValue('')
  }

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setInputValue(value)

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

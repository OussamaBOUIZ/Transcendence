import React from 'react'

export default function App () {

  const [counter, setCounter] = React.useState(1)

  return (
    <div>
      <button onClick={() => setCounter(counter => counter * 1337)}>
        {counter}
      </button>
    </div>
  )
}


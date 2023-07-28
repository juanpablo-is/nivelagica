import { useEffect, useRef, useState } from 'react'

const useStateRef = defaultValue => {
  const [state, setState] = useState(defaultValue)
  const ref = useRef(state)

  useEffect(() => {
    ref.current = state
  }, [state])

  return [state, setState, ref]
}

export default useStateRef

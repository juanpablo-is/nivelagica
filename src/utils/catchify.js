const Catchify = async (promise, options = {}) => {
  return await promise
    .then(d => (options?.json ? d.json() : d))
    .then(d => [null, d])
    .catch(e => [e, null])
}

export default Catchify

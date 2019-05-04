const NodeFactory = (value, left = null, right = null) => {
  return {
    left,
    right,
    value
  }
}

export default NodeFactory;

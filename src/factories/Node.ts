const NodeFactory = (value, left = null, right = null) => {
  return {
    value,
    left,
    right
  }
}

export default NodeFactory;

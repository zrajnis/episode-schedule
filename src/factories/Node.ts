import INode from "models/node"

const NodeFactory = (value: number, left: INode | null = null, right: INode | null = null) => {
  return {
    left,
    right,
    value
  }
}

export default NodeFactory;

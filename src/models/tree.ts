import IMatrixRow from "models/matrixRow"
import INode from "models/node";

interface ITree {
  add: (value: number) => any,
  getMatrix: () => IMatrixRow[],
  getLeftChild: (value: number | null) => INode | null,
  getRightChild: (value: number | null) => INode | null
}

export default ITree

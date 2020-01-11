import { IMatrixRow } from 'models/matrix'
import { INode } from 'models/node'

export interface ITree {
  getMatrix: () => IMatrixRow[],
  getLeftChild: (value: number | null, id: string | null) => INode | null,
  getRightChild: (value: number | null, id: string | null) => INode | null,
  insert: (value: number) => ITree
}

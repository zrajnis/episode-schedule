import { IMatrixElement, IMatrixRow } from 'models/matrix'
import { INode } from 'models/node'

export interface ITree {
  getMatrix: () => IMatrixRow[] | null,
  getLeftChild: (el: IMatrixElement | null) => INode | null,
  getRightChild: (el: IMatrixElement | null) => INode | null,
  insert: (value: number) => void,
  remove: (el: IMatrixElement) => void
}

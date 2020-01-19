export interface INode {
  id: string,
  left: INode | null,
  right: INode | null,
  value: number
}

export type TNodeChild = 'left' | 'right'

export enum ENodeChild {
  Left = 'left',
  Right = 'right'
}

export interface INodeSearchResult {
  node: INode | null,
  parent: INode | null
}

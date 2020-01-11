import NodeFactory from 'factories/Node'
import { INode, ENodeChild, TNodeChild } from 'models/node'
import { IMatrixElement, IMatrixRow } from 'models/matrix'
import { ITree } from 'models/tree'
import generateId from 'utils/generateId'

const TreeFactory = (): ITree => {
  let rootNode: INode | null = null
  let matrix: IMatrixRow[]

  const insertToMatrix = (value: number, id: string, depth: number, nodeIndex: number) => {
    if (!matrix[depth]) {
      const elements = [ ...Array(2 ** depth) ].map((): IMatrixElement => ({
        id: generateId(),
        value: null
      }))
  
      matrix[depth] = {
        elements,
        id: generateId()
      }
    }

    matrix[depth].elements[nodeIndex] = {
      id, // value works too but for consistency sake use id everywhere
      value
    }
  }

  const insertToNodeAndMatrix = (node: INode,value: number, depth: number, nodeIndex: number, child: TNodeChild) => {
    const id = generateId()

    node[child]= NodeFactory(value, id)
    insertToMatrix(value, id, depth, nodeIndex)
  }

  const recursiveInsert = (node: INode, value: number, depth: number, nodeIndex: number): void => {
    if (value < node.value && !node.left) {
      insertToNodeAndMatrix(node, value, depth, nodeIndex, 'left')

      return
    }

    if (value >= node.value && !node.right) {
      insertToNodeAndMatrix(node, value, depth, nodeIndex + 1, 'right')

      return
    }

    if (depth === 4) {
      throw Error('Maximum tree depth of 5 already reached')
    }

    if (value < node.value) {
      return recursiveInsert(node.left as INode, value, depth + 1, nodeIndex * 2)
    }

    if (value >= node.value) {
      return recursiveInsert(node.right as INode, value, depth + 1, (nodeIndex + 1) * 2)
    }
  }

  const insert = (value: number, tree: ITree) => {
    if (!rootNode) {
      const id = generateId()

      rootNode = NodeFactory(value, id)

      const rootMatrixEl: IMatrixElement = {
        id,
        value: rootNode.value
      }
      const rootMatrixRow = {
        elements: [ rootMatrixEl ],
        id: generateId()
      }

      matrix = [ rootMatrixRow ]      
      
      return tree
    }

    const initialDepth = 1
    const initialNodeIndex = 0

    recursiveInsert(rootNode, value, initialDepth, initialNodeIndex)    

    return tree
  }

  const getMatrix = (): IMatrixRow[] => [ ...matrix ]

  const recursiveSearch = (node: INode, value: number, id: string): INode | null => {
    if (node.id === id) {
      return node
    }

    if (value < node.value && node.left) {
      return recursiveSearch(node.left, value, id)
    }

    if (value >= node.value && node.right) {
      return recursiveSearch(node.right, value, id)
    }

    return null
  }

  const getNodeChild = (value: number | null, id: string | null, child: TNodeChild) => {
    if (value === null || id === null) {
      return null
    }

    const node = recursiveSearch((rootNode as INode), value, id)

    return node && node[child]
  }

  const getLeftChild = (value: number | null, id: string | null): null | INode =>
    getNodeChild(value, id, ENodeChild.Left)

  const getRightChild = (value: number | null, id: string | null): null | INode =>
    getNodeChild(value, id, ENodeChild.Right)

  const tree: ITree = {
    getLeftChild,
    getMatrix,
    getRightChild,
    insert: (value: number) => insert(value, tree)
  }


  return tree
}

export default TreeFactory

import NodeFactory from 'factories/Node'
import INode from 'models/node'
import IMatrixElement from 'models/matrixElement'
import IMatrixRow from 'models/matrixRow'
import ITree from 'models/tree'
import generateId from 'utils/generateId'

const TreeFactory = (): ITree => {
  let rootNode: INode | null = null
  let matrix: IMatrixRow[]

  const addToMatrix = (value: number, depth: number, nodeIndex: number) => {
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
      id: generateId(), // value works too but for consistency sake use generateId() everywhere
      value
    }
  }

  const recursiveAdd = (node: INode, value: number, depth: number, nodeIndex: number): void => {
    if (value < node.value && !node.left) {
      node.left = NodeFactory(value)
      addToMatrix(value, depth, nodeIndex)

      return
    }

    if (value > node.value && !node.right) {
      node.right = NodeFactory(value)
      addToMatrix(value, depth, nodeIndex + 1)

      return
    }

    if (depth === 4) {
      throw Error('Maximum tree depth of 5 already reached')
    }

    if (value < node.value) {
      return recursiveAdd(node.left as INode, value, depth + 1, nodeIndex * 2)
    }

    if (value > node.value) {
      return recursiveAdd(node.right as INode, value, depth + 1, (nodeIndex + 1) * 2)
    }

    throw Error(`Number ${value} already exists`)
  }

  const add = (value: number, tree: ITree) => {
    if (!rootNode) {
      rootNode = NodeFactory(value)

      const rootMatrixEl: IMatrixElement = {
        id: generateId(),
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

    recursiveAdd(rootNode, value, initialDepth, initialNodeIndex)    

    return tree
  }

  const getMatrix = (): IMatrixRow[] => [ ...matrix ]

  const recursiveSearch = (node: INode, value: number): INode | null => {
    if (node.value === value) {
      return node
    }

    if (value < node.value && node.left) {
      return recursiveSearch(node.left, value)
    }

    if (value > node.value && node.right) {
      return recursiveSearch(node.right, value)
    }

    return null
  }

  const getNodeChild = (value: number | null, child: 'left' | 'right') => {
    if (value === null) {
      return null
    }

    const node = recursiveSearch((rootNode as INode), value)

    return node && node[child]
  }

  const getLeftChild = (value: number | null): null | INode => getNodeChild(value, 'left')

  const getRightChild = (value: number | null): null | INode => getNodeChild(value, 'right')

  const tree: ITree = {
    add: (value: number) => add(value, tree),
    getLeftChild,
    getMatrix,
    getRightChild
  }


  return tree
}

export default TreeFactory

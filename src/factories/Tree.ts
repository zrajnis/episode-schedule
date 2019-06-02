import NodeFactory from 'factories/Node'
import INode from 'models/node'
import IMatrixElement from 'models/matrixElement'
import IMatrixRow from 'models/matrixRow'
import generateId from 'utils/generateId'

const TreeFactory = () => {
  let rootNode: INode | null = null
  let matrix: IMatrixRow[]
  const tree = {}

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

  const recursiveAdd = (node: INode, value: number, depth: number, nodeIndex: number) => {
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
      return recursiveAdd(node.left, value, depth + 1, nodeIndex * 2)
    }

    if (value > node.value) {
      return recursiveAdd(node.right, value, depth + 1, (nodeIndex + 1) * 2)
    }

    throw Error(`Number ${value} already exists`)
  }

  tree.add = (value: number) => {
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

  tree.getMatrix = () => [ ...matrix ]

  return tree
}

export default TreeFactory

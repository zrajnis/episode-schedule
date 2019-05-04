import shortid from 'shortid'

import NodeFactory from 'factories/Node'
import NodeModel from 'models/node'

const TreeFactory = () => {
  let rootNode = null
  const tree = {}

  const recursiveAdd = (node: NodeModel, value: number, depth: number) => {
    if (value < node.value && !node.left) {
      node.left = NodeFactory(value)
      return
    }

    if (value > node.value && !node.right) {
      node.right = NodeFactory(value)
      return
    }

    if (depth === 4) {
      throw Error('Maximum tree depth of 5 already reached')
    }

    if (value < node.value) {
      return recursiveAdd(node.left, value, depth + 1)
    }

    if (value > node.value) {
      return recursiveAdd(node.right, value, depth + 1)
    }

    throw Error(`Number ${value} already exists`)
  }

  tree.add = (value: number) => {
    if (!rootNode) {
      rootNode = NodeFactory(value)
      return tree
    }

    const initialDepth = 1

    recursiveAdd(rootNode, value, initialDepth)

    return tree
  }

  const recurseMatrix = (matrix: (string | number)[][], node: NodeModel, depth: number, nodeIndex: number) => {
    if (!matrix[depth]) {
      matrix[depth] = [ ...Array(2 ** depth) ].map((el: undefined) => shortid.generate())
    }

    if (node.left) {
      assignMatrixAndRecurse(matrix, node.left, depth, nodeIndex)
    }

    if (node.right) {
      assignMatrixAndRecurse(matrix, node.right, depth, nodeIndex + 1)
    }

    return
  }

  const assignMatrixAndRecurse = (matrix: (string | number)[][], node: NodeModel, depth: number, nodeIndex: number) => {
    matrix[depth][nodeIndex] = node.value

    return recurseMatrix(matrix, node, depth + 1, nodeIndex * 2)
  }

  tree.getMatrix = () => {

    if (!rootNode) {
      return [[]]
    }

    const matrix = [ [ rootNode.value ] ]
    const initialDepth = 1
    const initialNodeIndex = 0

    recurseMatrix(matrix, rootNode, initialDepth, initialNodeIndex)

    return (matrix.pop(), matrix) // remove last row and return the matrix
  }

  return tree
}

export default TreeFactory

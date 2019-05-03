import NodeFactory from 'factories/Node'
import NodeModel from 'models/node'

const TreeFactory = () => {
  let rootNode = null
  const tree = {}

  tree.add = (value: number) => {
    if (!rootNode) {
      rootNode = NodeFactory(value)
      return tree
    }

    const searchTree = (node: NodeModel) => {
      if (value < node.value && !node.left) {
        node.left = NodeFactory(value)
        return
      }
  
      if (value > node.value && !node.right) {
        node.right = NodeFactory(value)
        return
      }
  
      if (value < node.value) {
        searchTree(node.left)
        return
      }
  
      if (value > node.value) {
        searchTree(node.right)
      }
    }

    searchTree(rootNode, value)
    return tree
  }

  tree.getMatrix = () => {

    if (!rootNode) {
      return
    }

    const matrix = [ [ rootNode.value ] ]
    const initialDepth = 1
    const initialNodeIndex = 0

    const recursiveFn = (node, depth: number, nodeIndex: number) => {
      const newDepth = depth + 1

      if (!matrix[depth]) {
        matrix[depth] = new Array(depth * 2).fill(null)
      }

      if (node.left) {
        matrix[depth][nodeIndex] = node.left.value
        recursiveFn(node.left, newDepth, nodeIndex * 2)
      }

  
      if (node.right) {
        matrix[depth][nodeIndex + 1] = node.right.value
        recursiveFn(node.right, newDepth, (nodeIndex + 1) * 2)
      }

      return
    }

    recursiveFn(rootNode, initialDepth, initialNodeIndex)

    return (matrix.pop(), matrix) // remove last row and return the matrix
  }

  return tree
}

export default TreeFactory

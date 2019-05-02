import NodeFactory from 'factories/Node'
import NodeModel from 'models/node'

const TreeFactory = () => {
  let rootNode = null

  const add = (value: number) => {
    if (!rootNode) {
      rootNode = NodeFactory(value)
      return
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
  }

  const getMatrix = () => {

    if (!rootNode) {
      return
    }

    const matrix = [ [ rootNode.value ] ]
    const initialDepth = 1

    const recursionFn = (node, depth: number) => {
      const newDepth = depth + 1
      if (!matrix[depth]) {
        matrix[depth] = []
      }

      if (node.left) {
        matrix[depth].push(node.left.value)
        recursionFn(node.left, newDepth)
      }
  
      if (node.right) {
        matrix[depth].push(node.right.value)
        recursionFn(node.right, newDepth)
      }

      return
    }

    recursionFn(rootNode, initialDepth)
    console.log(matrix)
  }

  return {
    add,
    rootNode,
    getMatrix
  }

}

export default TreeFactory

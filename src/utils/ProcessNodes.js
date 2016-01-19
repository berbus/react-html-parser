import ElementTypes from '../elementTypes';

/**
 * Tests a htmlparser2 node and returns whether is it a text node at the start and end of the line containing only
 * white space. This allows these node types to be excluded from the rendering because they are unnecessary.
 *
 * @param {Object} node The element object as created by htmlparser2
 * @returns {boolean} Whether
 */
const filterOutEmptyTextNodes = function(node) {
  return !(node.type === 'text' && /\r?\n/.test(node.data) && node.data.trim() === '');
};

/**
 * Converts a htmlparser2 node to a React element
 *
 * @param {Object} node The htmlparser2 node to convert
 * @param {Number} index The index of the current node
 * @returns {React.Element}
 */
const convertNodeToElement = function(node, index) {
  const key = `rhp-${index}`;
  return ElementTypes[node.type](node, key);
};

/**
 * Processes the nodes generated by htmlparser2 and convert them all into React elements
 *
 * @param {Object[]} nodes List of nodes to process
 * @returns {React.Element[]} The list of processed React elements
 */
export default function ProcessNodes(nodes) {

  return nodes
    .filter(filterOutEmptyTextNodes)
    .map((node, index) => convertNodeToElement(node, index));

}

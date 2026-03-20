export const errorMap = {
  'off-by-one error': 'binary-search',
  'null pointer': 'linked-list',
  'infinite loop': 'recursion',
  'wrong base case': 'recursion',
  'index out of bounds': 'arrays',
  'wrong comparator': 'sorting',
  'missing return': 'trees',
};

export function getChallengeType(errorType) {
  const key = Object.keys(errorMap).find(k =>
    errorType?.toLowerCase().includes(k)
  );
  return errorMap[key] || 'binary-search';
}
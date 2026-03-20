export const theoryLinks = {
  'binary-search': {
    title: 'Binary Search — Full Explanation',
    url: 'https://www.youtube.com/watch?v=P3YID7liBug',
    channel: 'NeetCode',
    concepts: [
      'Always check: left = mid + 1, right = mid - 1',
      'Loop condition should be left <= right',
      'mid = left + (right - left) / 2 to avoid overflow',
    ],
  },
  'linked-list': {
    title: 'Linked Lists — Complete Guide',
    url: 'https://www.youtube.com/watch?v=Hj_rA0dhr2I',
    channel: 'NeetCode',
    concepts: [
      'Always check for null before accessing .next',
      'Keep track of previous node when deleting',
      'Use dummy head node to simplify edge cases',
    ],
  },
  'recursion': {
    title: 'Recursion — How It Really Works',
    url: 'https://www.youtube.com/watch?v=ngCos392W4w',
    channel: 'Reducible',
    concepts: [
      'Every recursive function needs a base case',
      'Make sure input moves toward the base case',
      'Think: what is the smallest version of this problem?',
    ],
  },
  'sorting': {
    title: 'Sorting Algorithms Explained',
    url: 'https://www.youtube.com/watch?v=kgBjXUE_Nwc',
    channel: 'NeetCode',
    concepts: [
      'Bubble sort: swap when left > right for ascending',
      'Always check loop boundary — off by one is common',
      'Comparator logic determines sort direction',
    ],
  },
  'trees': {
    title: 'Binary Trees for Beginners',
    url: 'https://www.youtube.com/watch?v=fAAZixBzIAI',
    channel: 'NeetCode',
    concepts: [
      'Always handle null node as base case',
      'Inorder = Left → Root → Right',
      'Use recursion naturally — trees are recursive structures',
    ],
  },
  'arrays': {
    title: 'Arrays and Hashing — Full Guide',
    url: 'https://www.youtube.com/watch?v=1WjjQyr2wd8',
    channel: 'NeetCode',
    concepts: [
      'Array indices go from 0 to length - 1',
      'Loop with i < arr.length not i <= arr.length',
      'Watch for off-by-one in both start and end boundaries',
    ],
  },
};

export function getTheoryLink(topic) {
  return theoryLinks[topic] || theoryLinks['binary-search'];
}
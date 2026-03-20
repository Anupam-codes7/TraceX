export const challenges = {
  'binary-search': {
    title: 'Fix the Binary Search',
    description: 'This binary search has an off-by-one error. The function never finds the target even when it exists. Find and fix the bug.',
    starterCode: `int binarySearch(int[] arr, int target) {
  int left = 0, right = arr.length;
  while (left < right) {
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    else if (arr[mid] < target) left = mid;
    else right = mid;
  }
  return -1;
}`,
    hint: 'Check your boundary conditions. Should right be arr.length or arr.length - 1?',
  },
  'linked-list': {
    title: 'Fix the Null Pointer',
    description: 'This linked list traversal crashes with a NullPointerException. Find where the null check is missing.',
    starterCode: `void printList(Node head) {
  Node current = head;
  while (current.next != null) {
    System.out.println(current.data);
    current = current.next;
  }
}`,
    hint: 'What happens when head itself is null?',
  },
  'recursion': {
    title: 'Fix the Infinite Recursion',
    description: 'This recursive function never stops. Identify the missing or wrong base case.',
    starterCode: `int factorial(int n) {
  if (n == 1) return 1;
  return n * factorial(n - 1);
}`,
    hint: 'What happens when n = 0? Is that case handled?',
  },
  'arrays': {
    title: 'Fix the Array Index',
    description: 'This function throws ArrayIndexOutOfBoundsException. Find the bad index access.',
    starterCode: `int sumArray(int[] arr) {
  int sum = 0;
  for (int i = 0; i <= arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}`,
    hint: 'Array indices go from 0 to length-1. Check your loop condition.',
  },
  'sorting': {
    title: 'Fix the Comparator',
    description: 'This bubble sort is not sorting correctly. The comparison logic is wrong.',
    starterCode: `void bubbleSort(int[] arr) {
  for (int i = 0; i < arr.length; i++)
    for (int j = 0; j < arr.length - i; j++)
      if (arr[j] < arr[j+1]) {
        int temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
}`,
    hint: 'Should you swap when arr[j] is less than or greater than arr[j+1]?',
  },
};

export function getChallenge(type) {
  return challenges[type] || challenges['binary-search'];
}
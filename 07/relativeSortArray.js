/**
 * 数组的相对排序
 *
 * 给定两个数组，arr1 和 arr2。
 * 1. arr2 中的元素各不相同；
 * 2. arr2 中的每个元素都出现在 arr1 中；
 *
 * 对 arr1 中的元素进行排序，使 arr1 中项的相对顺序和 arr2 中的相对顺序相同。
 * 未在 arr2 中出现过的元素需要按照升序放在 arr1 的末尾。
 */

const arr1 = [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19];
const arr2 = [2, 1, 4, 3, 9, 6];

/**
 * @desc 嵌套 for 循环，交换元素位置
 * @param { number[] } arr1
 * @param { number[] } arr2
 * @return { number[] }
 */
const relativeSortArray = (arr1, arr2) => {
  // 当前index，遍历结束后为相对排序后 arr1 相对于 arr2 最后一个元素 index
  let lastIndex = 0;

  for (let i = 0; i < arr2.length; i++) {
    for (let j = 0; j < arr1.length; j++) {
      if (arr1[j] === arr2[i]) {
        // 交换位置
        [arr1[lastIndex], arr1[j]] = [arr1[j], arr1[lastIndex]];
        lastIndex++;
      }
    }
  }

  // 相对排序完成后截取剩余部分并进行排序
  let arr = arr1.slice(lastIndex).sort((a, b) => a - b);

  return [...arr1.splice(0, lastIndex), ...arr];
};

// console.log(relativeSortArray(arr1, arr2));

/**
 * @desc sort() 若返回值>=1，则表示a在排序后的序列中出现在 b 之后，反之...
 * @param { number[] } arr1
 * @param { number[] } arr2
 * @return { number[] }
 */
const relativeSortArray2 = (arr1, arr2) => {
  return arr1.sort((a, b) => {
    // 判断要排序的两个元素是否存在于 arr2 中
    let ia = arr2.indexOf(a);
    let ib = arr2.indexOf(b);

    if (ia === -1 && ib === -1) {
      // 如果都不存在，直接升序排列
      return a - b;
    } else if (ia === -1) {
      // 如果元素仅a不存在，则将a排在b之后
      return 1;
    } else if (ib === -1) {
      // 如果元素仅b不存在，则将b排在a之后
      return -1;
    } else {
      // 如果都存在，则按a和b在arr2中的顺序进行排序
      return ia - ib;
    }
  });
};

console.log(relativeSortArray2(arr1, arr2));

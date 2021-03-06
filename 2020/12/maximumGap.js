/**
 * 最大间距 (力扣 164)
 *
 * 给定一个无序的数组，找出数组在排序之后，相邻元素之间最大的差值。
 * 如果数组元素个数小于 2，则返回 0。
 */

const nums = [7, 1, 5, 3, 6, 4, 21];

/**
 * @desc 冒泡排序 + 双指针
 * @param { number[] } nums
 * @return { number }
 */
const maximumGap = (nums) => {
  const arr = [...nums];
  const len = arr.length;

  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[i]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }

  let res = 0;
  let i = 0;
  let j = 1;
  while (j < len) {
    res = Math.max(res, arr[j] - arr[i]);
    i++;
    j++;
  }

  return res;
};

console.log(maximumGap(nums));

/**
 * @desc 选择排序 + 双指针
 * @param { number[] } nums
 * @return { number }
 */
const maximumGap2 = (nums) => {
  const arr = [...nums];
  const len = arr.length;
  let minIndex = 0;

  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }

  let res = 0;
  let i = 0;
  let j = 1;
  while (j < len) {
    res = Math.max(res, arr[j] - arr[i]);
    i++;
    j++;
  }

  return res;
};

console.log(maximumGap2(nums));

/**
 * @desc 快速排序 + 双指针
 * @param { number[] } nums
 * @return { number }
 */
const maximumGap3 = (nums) => {
  const array = [...nums];
  const len = array.length;

  const partition = (arr = [], left = 0, right = 0) => {
    const pivot = arr[left];
    let i = left + 1;
    let j = right;

    while (true) {
      while (i <= j && arr[i] <= pivot) {
        i++;
      }
      while (i <= j && arr[j] >= pivot) {
        j--;
      }
      if (i >= j) {
        break;
      }

      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    arr[left] = arr[j];
    arr[j] = pivot;
    return j;
  };

  const quickSort = (arr = [], left = 0, right) => {
    const i = left;
    const j = typeof right === 'undefined' ? arr.length - 1 : right;

    if (i < j) {
      const mid = partition(arr, i, j);
      arr = quickSort(arr, i, mid - 1);
      arr = quickSort(arr, mid + 1, j);
    }

    return arr;
  };

  nums = quickSort(array);

  let res = 0;
  let i = 0;
  let j = 1;
  while (j < len) {
    res = Math.max(res, array[j] - array[i]);
    i++;
    j++;
  }

  return res;
};

console.log(maximumGap3(nums));

/**
 * @desc 计数排序 + 双指针
 * @param { number[] } nums
 * @return { number }
 */
const maximumGap4 = (nums) => {
  if (!nums || nums.length < 2) {
    return 0;
  }
  const arr = [...nums];
  const len = arr.length;
  let min = arr[0];
  let max = arr[0];

  for (let i = 0; i < len; i++) {
    min = Math.min(min, arr[i]);
    max = Math.max(max, arr[i]);
  }

  const bucket = new Int32Array(max - min + 1);
  arr.forEach((item) => bucket[item - min]++);

  let k = 0;
  for (let i = 0; i < bucket.length; i++) {
    while (bucket[i] > 0) {
      arr[k++] = i + min;
      bucket[i]--;
    }
  }

  let res = 0;
  let i = 0;
  let j = 1;
  while (j < len) {
    res = Math.max(res, arr[j] - arr[i]);
    i++;
    j++;
  }

  return res;
};

console.log(maximumGap4(nums));

/**
 * @desc 基数排序 + 单指针
 * @param { number[] } nums
 * @return { number }
 */
const maximumGap5 = (nums) => {
  if (!nums || nums.length < 2) {
    return 0;
  }
  const arr = [...nums];
  const len = arr.length;

  // 找出最大值
  let max = Math.max(...arr);

  // 计算最大值是几位数
  let num = 1;
  while (Math.floor(max / 10) > 0) {
    num++;
    max = Math.floor(max / 10);
  }

  // 创建 10 个桶
  const bucket = Array.from({ length: 10 }, () => []);

  // 从个位数开始，对每一位进行排序
  for (let i = 1; i <= num; i++) {
    // 遍历数组
    for (let j = 0; j < len; j++) {
      // 取出每一位数， Math.pow() 方法可返回 x 的 y 次幂的值。
      const digit = Math.floor(arr[j] / Math.pow(10, i - 1)) % 10;
      // 放入桶中
      bucket[digit].push(arr[j]);
    }

    // 从桶中取出元素放入数组
    let m = 0;
    for (let n = 0; n < 10; n++) {
      while (bucket[n].length > 0) {
        arr[m++] = bucket[n].shift();
      }
    }
  }

  let res = 0;
  let i = 0;
  while (i < len - 1) {
    res = Math.max(res, arr[i + 1] - arr[i]);
    i++;
  }

  return res;
};

console.log(maximumGap5(nums));

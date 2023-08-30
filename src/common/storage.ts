/**
 * 获取本地缓存
 */
export const getStorageLocal = (key) => new Promise((resolve, reject) => {
  chrome.storage.local.get([key], (result) => {
    if (result) {
      resolve(result[key]);
    } else {
      reject();
    }
  });
});

/**
 * 设置本地缓存
 */
export const setStorageLocal = (opts = {}) => new Promise((resolve) => {
  chrome.storage.local.set(opts, () => {
    resolve(true);
  });
});

const createObjectURL = file => {
  if (window.URL) {
    return window.URL.createObjectURL(file);
  } else {
    return window.webkitURL.createObjectURL(file);
  }
};

//回收内存中的对象url
const revokeObjectURL = file => {
  if (window.URL) {
    return window.URL.revokeObjectURL(file);
  } else {
    return window.webkitURL.revokeObjectURL(file);
  }
};

export { createObjectURL, revokeObjectURL };

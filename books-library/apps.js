function cleanObject(obj) {
  if (obj && typeof obj === "object") {
    let arr_of_arr = Object.entries(obj);
    let arr = arr_of_arr.filter((arr) => {
      if (arr[1] || arr[1] === 0) return arr;
    });
    return Object.fromEntries(arr);
  }
}

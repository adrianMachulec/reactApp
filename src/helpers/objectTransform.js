export function objectTransform(obj) {
  const arr = [];

  for (const key in obj) {
    arr.push({ ...obj[key], id: key, rating: 6 });
  }

  return arr
}

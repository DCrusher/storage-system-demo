export function isEmpty(obj: any) {
  if (!obj) {
    return true;
  } else if (Array.isArray(obj)) {
    return obj.length === 0;
  } else {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
  }
}

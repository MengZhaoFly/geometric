import { cross } from "../utils/crossProduct.js";

// Caclulates the convex hull of a set of points.
// See https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript
export function polygonHull(points){
  if (points.length < 3) { return null; }
  // 从 x 轴 从左往右扫描
  // 如果 x 轴相同 从下往上 扫描
  const pointsCopy = points.slice().sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
  let lower = [];
  for (let i = 0; i < pointsCopy.length; i++) {
    /**
     * 第一个点 一定是 合法的点
     * 开始检测 第二个点：构造一条直线（第一个点即合法点 和 新加入的点 ），如果在左侧 说明不合法 要 pop ，把新点 push 进去
     */
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], pointsCopy[i]) <= 0) {
       lower.pop();
    }
    lower.push(pointsCopy[i]);
  }
  let upper = [];
  for (let i = pointsCopy.length - 1; i >= 0; i--) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], pointsCopy[i]) <= 0) {
       upper.pop();
    }
    upper.push(pointsCopy[i]);
  }
  upper.pop();
  lower.pop();

  return lower.concat(upper);
}
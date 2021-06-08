// Determines whether a point is inside of a polygon, represented as an array of vertices.
// From https://github.com/substack/point-in-polygon/blob/master/index.js,
// based on the ray-casting algorithm from https://web.archive.org/web/20180115151705/https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html
// Wikipedia: https://en.wikipedia.org/wiki/Point_in_polygon#Ray_casting_algorithm
// Returns a boolean.
/**
 * 一个点 引伸出来的射线 
 * 和多边形相交 代表进入 多边形
 * 再次相交    代表出去 多边形
 * 再次相交    代表进入 多边形
 * @param {*} point 
 * @param {*} polygon 
 * @returns 
 */
export function pointInPolygon(point, polygon) {
  let x = point[0],
      y = point[1],
      inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0], yi = polygon[i][1],
          xj = polygon[j][0], yj = polygon[j][1];
          
    // yi > y != yj > y 保证这个点 引伸出来的射线 会和线段相交 否则不可能相交
    // 已知两点坐标 和 时，常用两点式：
    // x 为 传入点 x
    // t: ((xj - xi) * (y - yi)) / (yj - yi) + xi 根据 y 算出在线段上的 的x
    // x 小于 那么在左侧，表示 射线 必经过
    if (((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) { inside = !inside; }
  }
  
  return inside;
}
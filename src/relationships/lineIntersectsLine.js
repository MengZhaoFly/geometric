// Determines if lineA intersects lineB. 
// See: https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function/24392281#24392281
// Returns a boolean.
export function lineIntersectsLine(lineA, lineB) {
  // First test to see if the lines share an endpoint
  if (sharePoint(lineA, lineB)) return true;

  let a = lineA[0][0],
      b = lineA[0][1],
      c = lineA[1][0],
      d = lineA[1][1],
      p = lineB[0][0],
      q = lineB[0][1],
      r = lineB[1][0],
      s = lineB[1][1],
      det, gamma, lambda;
  // 两个向量 叉乘 
  // v1 ( (c - a),  (d - b)  )     v2 ( (r - p),  (s - q) )
  det = (c - a) * (s - q) - (r - p) * (d - b); 
  // 为 0 平行
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    console.log(lambda, gamma);
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
}

function sharePoint(lineA, lineB){
  let share = false;
  for (let i = 0; i < 2; i++){
    for (let j = 0; j < 2; j++){
      if (equal(lineA[i], lineB[j])){
        share = true;
        break;
      }
    }
  }
  return share;
}

function equal(pointA, pointB){
  return pointA[0] === pointB[0] && pointA[1] === pointB[1];
}
console.log('线线 重叠', lineIntersectsLine([[0, 0], [6,6]], [[4,4], [5,5]]))
// isLineCross([0,0], [1,1], [1,0],[0,1])
// isLineCross([0,0], [1,1], [3,3],[4,4])

function subtract(_, end, start) {
  return [
    end[0] - start[0],
    end[1] - start[1]
  ]
}
function cross(v1, v2) {
  return v1[0] * v2[1] - v2[0] * v1[1];
}
function isCross(p1, p2, p3, p4) {
  const v1 = subtract([], p4, p3);
  const v2 = subtract([], p1, p3);
  const v3 = subtract([], p2, p3);

  const z1 = cross(v1, v2);
  const z2 = cross(v1, v3);
  console.log(z1, z2)
  return z1 * z2 <= 0;
}
export function isLineCross(line1, line2) {
  return isCross(line1[0], line1[1], line2[0], line2[1]) && isCross(line2[0], line2[1], line1[0], line1[1]);
}
const line1 = [
  [50.054358, 8.693184],
  [50.055604, 8.685873]
];
const line2 = [
  [50.054228, 8.69338],
  [50.054358, 8.693184]
];
// let a = isLineCross(line1, line2);
// let b = isLineCross(line2, line1);
console.log('线线 重叠', isLineCross([[0, 0], [6,6]], [[4,4], [5,5]]))
console.log('线线 不相交', isLineCross([[0, 0], [6,6]], [[8,7], [0,7]]))


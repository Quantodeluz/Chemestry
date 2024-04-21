import { Vector2 } from "@motion-canvas/core"

export function distance(A: Vector2, B: Vector2) {
    return Math.sqrt((A.x - B.x) ** 2 + (A.y - B.y) ** 2)
}
  
export function findMedian(A: Vector2, B: Vector2) {
  return new Vector2([((A.x + B.x) / 2), ((A.y + B.y) / 2)]);
}

export function findSlope(A: Vector2, B: Vector2) {
  return (A.y - B.y) / (A.x - B.x)
}

export function findCircumCenter(A: Vector2, B: Vector2, C: Vector2) {
  let o = new Vector2;

  const acm = findMedian(A, C)
  const acs = -1 / findSlope(A, C)

  const bcm = findMedian(B, C)
  const bcs = -1 / findSlope(B, C)

  const abm = findMedian(A, B)
  const abs = -1 / findSlope(A, B)

  o.x = -((-acs * acm.x + acm.y + bcs * bcm.x - bcm.y) / (acs - bcs))

  o.y = (abs * (o.x - abm.x) + abm.y)

  return o;
}

export function findCircumRadius(A: Vector2, B: Vector2, C: Vector2) {
  let o = findCircumCenter(A, B, C);
  let r = distance(o, C);
  return r;
}

export function findCircumCircle(A: Vector2, B: Vector2, C: Vector2) {
  let o = findCircumCenter(A, B, C);
  let r = distance(o, C);
  return [o, r];
};
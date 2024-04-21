import { Rect, Txt } from "@motion-canvas/2d";
import { Reference, ThreadGenerator, createRef, easeInExpo, easeOutExpo } from "@motion-canvas/core";

export function* blockIntro(obj: Reference<Txt>): ThreadGenerator {
  const mask = createRef<Rect>();

  this.add(
    <Rect
      ref={mask}
      fill={obj().fill()}
      position={[obj().x()-(obj().width()/2), obj().y()]}
      size={[0, obj().width()/2]}
      offset={[-1, 0]}
    />
  )

  yield* mask().width(obj().width(), 1, easeInExpo)
  mask().offset([-1, 0]).position([300, -220])
  yield* mask().width(0, 1, easeOutExpo)
}
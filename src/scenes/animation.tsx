import { Rect, Txt, makeScene2D } from '@motion-canvas/2d';
import { createRef, createSignal, easeInExpo, easeOutCirc, easeOutExpo, sequence, waitFor } from '@motion-canvas/core';
import { Ball } from '../components/General';
import { Element, Carbon, Hydrogen, Nitrogen, Oxygen } from '../components/Chemestry';

export default makeScene2D(function* (view) {
  view.fill('white')

  const scale = createSignal(70)
  const size = createSignal(1)

  view.add(
    <>
    <Element
    elementType={Oxygen}
    scale={() => scale()}
    size={1}
    />
    <Rect
    size={500}
    position={[3000, 0]}
    fill={'black'}
    />
    </>
  )

  yield* sequence(0.5,
    scale(100, 1),
    size(100, 1)
    )

  yield* waitFor(1)
})
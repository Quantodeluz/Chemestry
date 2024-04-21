import { Rect, Txt, makeScene2D } from '@motion-canvas/2d';
import { createRef, createSignal, easeInExpo, easeOutCirc, easeOutExpo, sequence, waitFor } from '@motion-canvas/core';
import { Ball } from '../components/General';
import { Carbon, Atom, Hydrogen, Nitrogen, Oxygen } from '../components/Chemestry';

export default makeScene2D(function* (view) {
  view.fill('white')

  const scale = createSignal(100)

  const text = createRef<Txt>();
  const mask = createRef<Txt>();

  const c = createRef<Ball>();
  const h = createRef<Ball>();
  const o = createRef<Ball>();
  const n = createRef<Ball>();

  view.add(
    <Rect
      ref={mask}
      fill={'black'}
      position={[-300, -220]}
      size={[0, 250]}
      offset={[-1, 0]}
    />
  )

  yield* mask().width(600, 0.75, easeInExpo)
  view.add(
    <Txt
      ref={text}
      text={'Grupo'}

      fontSize={scale()}
      position={[0, -200]}
      lineWidth={5}
      fill={'black'}
    />
  )
  mask().offset([1, 0]).position([300, -220])
  yield* mask().width(0, 0.75, easeOutExpo)

  view.add(
    <>
      <Atom
        ref={c}
        element={Carbon}
        position={[-400, 800]}
        scale={scale}
      />
      <Atom
        ref={h}
        element={Hydrogen}
        position={[-110, 800]}
        scale={scale}
      />
      <Atom
        ref={o}
        element={Oxygen}
        position={[130, 800]}
        scale={scale}
      />
      <Atom
        ref={n}
        element={Nitrogen}
        position={[400, 800]}
        scale={scale}
      />
    </>
  )
  
  yield* sequence(0.2,
    c().y(200, 1, easeOutCirc),
    h().y(200, 1, easeOutCirc),
    o().y(200, 1, easeOutCirc),
    n().y(200, 1, easeOutCirc),
  )

  yield* waitFor(5)

});

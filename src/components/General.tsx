import { findCircumCenter, findCircumRadius } from '../modules/geometry.js'
import { Node, Circle, CircleProps, signal, PossibleCanvasStyle, blur } from "@motion-canvas/2d";
import { SignalValue, SimpleSignal, Vector2 } from "@motion-canvas/core";


export interface BallProps extends CircleProps {
  shadowFill?: SignalValue<PossibleCanvasStyle>
  shadowStroke?: SignalValue<PossibleCanvasStyle>
  shadowSmooth?: SignalValue<number>
}

export class Ball extends Circle {
  @signal()
  declare public readonly shadowFill: SignalValue<() => PossibleCanvasStyle>;
  @signal()
  declare public readonly shadowStroke: SignalValue<() => PossibleCanvasStyle>;
  @signal()
  declare public readonly shadowSmooth: SimpleSignal<() => number, this>;

  @signal()
  declare private readonly A: SimpleSignal<Vector2, this>
  @signal()
  declare private readonly B: SimpleSignal<Vector2, this>
  @signal()
  declare private readonly C: SimpleSignal<Vector2, this>

  public constructor(props?: BallProps) {
    super({
      ...props
    });

    const TAU = Math.PI * 2

    this.A(() => Vector2
      .fromRadians(-3 / 8 * TAU)
      .scale((this.size().y + this.lineWidth() * 0.5) * 0.5))

    this.B(() => Vector2
      .fromRadians(1 / 8 * TAU)
      .scale((this.size().y + this.lineWidth() * 0.5) * 0.5))

    this.C(() => Vector2
      .fromRadians(3 / 8 * TAU)
      .scale((this.size().y + this.lineWidth() * 0.5) * 0.25))

    this.add(
      <>
        <Circle
          size={this.size()}

          fill={this.fill()}
          stroke={this.stroke()}
          lineWidth={this.lineWidth()}
          lineDash={this.lineDash()}
        />
        <Node cache>
          <Circle
            size={this.size()}

            fill={this.shadowFill()}
            stroke={this.shadowStroke()}
            lineWidth={this.lineWidth()}
            lineDash={this.lineDash()}
          />
          <Circle
            compositeOperation={'destination-out'}
            filters={[blur(this.shadowBlur())]}

            fill={'white'}

            position={() => findCircumCenter(this.A(), this.B(), this.C())}

            size={() => findCircumRadius(this.A(), this.B(), this.C()) * 2}
          />
        </Node>
      </>
    )
  }
}

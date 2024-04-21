import { PossibleVector2, Reference, SignalValue, SimpleSignal, Vector2, createSignal } from '@motion-canvas/core'
import { Ball } from './General.js'
import { Node, NodeProps, PossibleCanvasStyle, Txt, signal } from '@motion-canvas/2d'
import chroma from 'chroma-js'

const small = 0.6
const medium = 1
const big = 2

class Element {
  @signal()
  public declare readonly symbol: SimpleSignal<string>;
  @signal()
  public declare readonly size: SimpleSignal<number>;
  @signal()
  public declare readonly light: SimpleSignal<PossibleCanvasStyle>;
  @signal()
  public declare readonly shadow: SimpleSignal<PossibleCanvasStyle>;
  @signal()
  public declare readonly lineWidth: SimpleSignal<number>;
  @signal()
  public declare readonly stroke: SimpleSignal<PossibleCanvasStyle>;
  @signal()
  public declare readonly shadowStroke: SimpleSignal<PossibleCanvasStyle>;

  constructor(symbol: string, size: number, light: PossibleCanvasStyle, shadow: PossibleCanvasStyle, lineWidth: number, stroke: PossibleCanvasStyle = '#00000000', shadowStroke: PossibleCanvasStyle = '#00000000') {
    this.symbol = createSignal(symbol)
    this.size = createSignal(size)
    this.light = createSignal(light)
    this.shadow = createSignal(shadow)
    this.lineWidth = createSignal(lineWidth)
    this.stroke = createSignal(stroke)
    this.shadowStroke = createSignal(shadowStroke)
  }
}

export const Hydrogen = new Element('H', small, '#fffbf2', '#ccc9c2', 4, '#b3b0aa', '#7f7d79')
export const Carbon = new Element('C', big, '#363230', '#292524', 10, '#201e1d', '#131211')
export const Oxygen = new Element('O', medium, '#d93a2b', '#b33024', 6, '#99291f', '#802219')
export const Nitrogen = new Element('N', medium, '#1a79ff', '#175ce6', 6, '#1461cc', '#1247b3')


export interface AtomProps extends NodeProps {
  element?: SignalValue<Element>
  size?: SignalValue<number>
}

export class Atom extends Node {
  @signal()
  public declare readonly Element: SimpleSignal<Element, this>
  @signal()
  public declare readonly size: SimpleSignal<number, this>

  public constructor(props?: AtomProps) {
    super({
      ...props
    });
    this.add(
      <>
        <Ball
          size={this.Element().size() * this.size()}
          fill={this.Element().light()}
          shadowFill={this.Element().shadow()}
          lineWidth={this.Element().lineWidth()}
          stroke={this.Element().stroke()}
          shadowStroke={this.Element().shadowStroke()}
        />
        <Txt
          fill={chroma.mix(this.Element().light().toString(), this.Element().shadow().toString(), 0.2, 'oklab').get('hsv.v') > 0.5 ? 'black' : 'white'}
          position={[0, this.Element().size() * 8.5]}
          fontSize={this.Element().size() * this.size() * 0.7}
          lineWidth={5}
          text={this.Element().symbol()}
        />
      </>
    )
  }
}
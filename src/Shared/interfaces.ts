export interface Img {
  readonly src: string,
  readonly alt?: string
}

export interface Payload {
  readonly optGet?: string,
  readonly optPost?: string,
  readonly email?: string[],
  readonly width?: number,
  readonly height?: number,
  readonly search?: string,
  readonly pathname?: string,
  readonly hostname?: string,
  readonly href?: string,
}

export interface Action {
  // tslint:disable-next-line: no-reserved-keywords
    readonly type: string,
    readonly data?: any,
    readonly payload?: any,
    readonly treeData?: any,
    readonly item?: any,
    readonly scrollInterval?: number,
    readonly scrollPeriodEnd?: number,
    readonly getActionAsync?: Function,
  }

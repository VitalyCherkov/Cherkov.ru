declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.jpg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare namespace JSX {
  // tslint:disable-next-line:interface-name
  export interface IntrinsicAttributes {
    styleName?: string;
  }
}

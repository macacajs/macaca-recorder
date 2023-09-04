declare module '*.less' {
  const resource: { [key: string]: string };
  export = resource;
}

declare module '*.png'
declare module '*.jpg'

declare module '*.svg' {
  export default string;
  export const ReactComponent = React.Component;
}

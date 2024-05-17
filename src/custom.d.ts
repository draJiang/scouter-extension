declare module '*.png' {
  const value: any;
  export default value;
}

declare module 'ja-sentence' {
  function tokenizeJapaneseParagraph(text: string): string[];
  export = tokenizeJapaneseParagraph;
}
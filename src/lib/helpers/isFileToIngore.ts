export default (dir: string, filename: string) => {
  return /(\.idea|\.git|\.vscode|node_modules|build|dist)\b/.test(`${dir}/${filename}`);
};

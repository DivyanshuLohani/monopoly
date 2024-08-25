// To be changed
export function convertBoard(board: any) {
  const ret = [];
  for (let i = 0; i < 4; i++) {
    // ret.push(board[i * 10]);
    const l = [];
    for (let j = 0; j < 9; j++) {
      l.push(board[i * 10 + 1 + j]);
    }
    ret.push(l);
  }
  return ret;
}

export const initBoard = () => {
  let board = [];
  for (let i = 0; i < 18; i++) {
    board.push(Array(18).fill(null))
  };
  return board.slice();
}

export const cloneBoard = (board) => {
  let newBoard = board.map((row) => {
    return row.slice();
  });

  return newBoard;
}
//isCreator is X if equal true
//return -1: dont win, 0: draw, 1: win
export const calculateWinner = (board, i, j, isCreator) => {
  const WIN_CONDITION = 5;
  const BOARD_SIZE = 18;
  let count = 1;
  let startI = i;
  let startJ = j;

  /*Loang theo chieu ngang*/
  //Di chuyen qua trai
  while (startJ - 1 > -1) {
    startJ--;
    if (board[i][startJ] === isCreator)
      count++;
    else
      break;
  }

  //Di chuyen qua phai
  startJ = j;
  while (startJ + 1 < BOARD_SIZE) {
    startJ = startJ + 1;
    if (board[i][startJ] === isCreator)
      count++;
    else
      break;
  }

  if (count >= WIN_CONDITION) {
    return 1;
  }

  /*Loang theo chieu doc*/
  startI = i;
  startJ = j;
  count = 1;

  //Di len
  while (startI - 1 > -1) {
    startI--;
    if (board[startI][j] === isCreator)
      count++;
    else
      break;
  }

  //Di xuong
  startI = i;
  while (startI + 1 < BOARD_SIZE) {
    startI++;
    if (board[startI][j] === isCreator)
      count++;
    else
      break;
  }

  if (count >= WIN_CONDITION) {
    return 1;
  }

  /*Loang theo duong cheo chinh */
  startI = i;
  startJ = j;
  count = 1;
  //di chuyen len
  while (startI - 1 > -1 && startJ - 1 > -1) {
    startI--;
    startJ--;
    if (board[startI][startJ] === isCreator)
      count++;
    else
      break;
  }

  //chuyen chuyen xuong
  startI = i;
  startJ = j;
  while (startI + 1 < BOARD_SIZE && startJ + 1 < BOARD_SIZE) {
    startI++;
    startJ++;
    if (board[startI][startJ] === isCreator)
      count++;
    else
      break;
  }

  if (count >= WIN_CONDITION) {
    return 1;
  }

  /*Loang theo duong cheo phu */
  startI = i;
  startJ = j;
  count = 1;

  //di chuyen len
  while (startI - 1 > -1 && startJ + 1 < BOARD_SIZE) {
    startI--;
    startJ++;
    if (board[startI][startJ] === isCreator)
      count++;
    else
      break;
  }

  //di chuyen xuong
  startI = i;
  startJ = j;
  while (startI + 1 < BOARD_SIZE && startJ - 1 > -1) {
    startI++;
    startJ--;
    if (board[startI][startJ] === isCreator)
      count++;
    else
      break;
  }

  if (count >= WIN_CONDITION) {
    return 1;
  }


  //check draw
  let isDraw = true;
  for (let i = 0; i < BOARD_SIZE; i++){
    for (let j = 0; j < BOARD_SIZE; j++){
      if (board[i][j] === null){
        isDraw = false;
        break;
      }
    }
  }

  return isDraw ? 0 : -1;
}
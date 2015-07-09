/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// Hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space.)
// Take a look at solversSpec.js to see what the tests are expecting


window.rFact = function(num)
{
    if (num === 0)
      { return 1; }
    else
      { return num * rFact( num - 1 ); }
}


// Return a matrix (an array of arrays) representing a single nxn chessboard,
// with n rooks placed such that none of them can attack each other.
window.findNRooksSolution = function(n) {
  var solution = [];

  var recurse = function(currentRow, boardProgress){
    for (var i=0; i<n; i++){
      boardProgress.setPiece(currentRow,i,1);
      if (!boardProgress.hasColConflictAt(i)){
        if (currentRow === boardProgress.n()-1){
          solution = boardProgress.allRows();
        } else {
          recurse(currentRow+1, boardProgress);
        }
      }
      if (boardProgress.hasColConflictAt(i)){
        boardProgress.setPiece(currentRow,i,0);
      }
    }
  };
  recurse(0,new Board({n:n}));
  return solution;
};

// Return the number of nxn chessboards that exist, with n rooks placed such that none
// of them can attack each other.
window.countNRooksSolutions = function(n) {
  var solutions = 0;

  var recurse = function(currentRow, boardProgress){
    for (var i=0; i<boardProgress.n(); i++){
      boardProgress.setPiece(currentRow,i,1);
      if (!boardProgress.hasColConflictAt(i)){
        if (currentRow === boardProgress.n()-1){
          solutions++;
        } else {
          recurse(currentRow+1, boardProgress);
        }
      }
      boardProgress.setPiece(currentRow,i,0);
    }
  };
  recurse(0,new Board({n:n}));
  return solutions;
};


// Return a matrix (an array of arrays) representing a single nxn chessboard,
// with n queens placed such that none of them can attack each other.
window.findNQueensSolution = function(n) {
  var board = new Board({n:n});
  var sol = board;

  var recurse = function(currentRow){
    for (var i=0; i<board.n(); i++){
      board.setPiece(currentRow,i,1);
      if (!(board.hasColConflictAt(i) ||
            board.hasAnyMajorDiagonalConflicts() ||
            board.hasAnyMinorDiagonalConflicts() )){
              if (currentRow === board.n()-1){

               var solution = _.reduce( board.allRows(), function(memo, item){
                   memo.push(item.slice()); return memo;
               }, []);

                sol = new Board(solution);
              } else {
                recurse(currentRow+1, board);
              }
      }

      board.setPiece(currentRow,i,0);
    }
  };

  recurse(0);

  return sol.allRows();
};


// Return the number of nxn chessboards that exist, with n queens placed such that none
// of them can attack each other.
window.countNQueensSolutions = function(n) {

  if (n<2) { return 1; }

  var solutions = 0;
  var recurse = function(currentRow, boardProgress){
    for (var i=0; i<boardProgress.n(); i++){
      boardProgress.setPiece(currentRow,i,1);
      if (!(boardProgress.hasColConflictAt(i) ||
            boardProgress.hasAnyMajorDiagonalConflicts() ||
            boardProgress.hasAnyMinorDiagonalConflicts() )){
              if (currentRow === boardProgress.n()-1){
                solutions++;
              } else {
                recurse(currentRow+1, boardProgress);
              }
      }
      boardProgress.setPiece(currentRow,i,0);
    }
  };
  recurse(0,new Board({n:n}));
  return solutions;

};

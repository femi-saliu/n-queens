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
  for(var i=0; i<n; i++){
      var row = [];
    for(var j=0; j<n; j++){
      row.push(0);
    }
    solution.push(row);
  }
  var emptyBoard = new Board({n:n});
  var recurse = function(currentRow, boardProgress, matrixProgress){
    for (var i=0; i<n; i++){
      boardProgress.setPiece(currentRow,i,1);
      matrixProgress[currentRow][i] = 1;
      if (!boardProgress.hasColConflictAt(i)){
        if (currentRow === boardProgress.n()-1){
          solution = matrixProgress;
        } else {
          recurse(currentRow+1, boardProgress, matrixProgress);
        }
      }
      if (boardProgress.hasColConflictAt(i)){
        boardProgress.setPiece(currentRow,i,0);
        matrixProgress[currentRow][i] = 0;
      }
    }
  };
  recurse(0,emptyBoard,solution);
  return solution;
};


// Return the number of nxn chessboards that exist, with n rooks placed such that none
// of them can attack each other.
window.countNRooksSolutions = function(n) {
  //var solutionCount = rFact(n);
  var solutions = 0;
  var emptyBoard = new Board({n:n});
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
  recurse(0,emptyBoard);
  return solutions;
};


// Return a matrix (an array of arrays) representing a single nxn chessboard,
// with n queens placed such that none of them can attack each other.
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// Return the number of nxn chessboards that exist, with n queens placed such that none
// of them can attack each other.
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

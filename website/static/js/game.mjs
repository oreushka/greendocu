export class Sudoku {
  //-------------------------------GAME DATA---------------------------------
  //the Sudoku game data, game can be different if the data changes
  constructor(matrix, count_of_empty_cells) {
    (this.matrix = matrix), (this.count_of_empty_cells = count_of_empty_cells);
  }
  //-----------------------------START FUNCTION-------------------------------
  giveMatrixNum(row, col) {
    return this.matrix[row][col];
  }

  removeEdit(sBlock, i, j) {
    if (this.matrix[i][j] != "") {
      //the number in block with edit class can be changed
      sBlock.removeClass("edit");
    }
    return sBlock;
  }

  addBlock(i, j) {
    let sBlock = $('<td class="sBox edit"></td>');
    sBlock.attr("id", "Block" + "_" + i + "_" + j).text(this.matrix[i][j]); //store the block location in the id
    this.removeEdit(sBlock, i, j);
    this.addGroupType(sBlock, i, j);
    return sBlock;
  }

  addGroupType(sBlock, i, j) {
    let groups = Math.floor(Math.sqrt(9)); //use different color to distinguish different groups
    let gA = Math.floor(i / groups);
    let gB = Math.floor(j / groups);
    if (gA % 2 == gB % 2) {
      sBlock.addClass("sGroup");
    } else {
      sBlock.addClass("sGroup2");
    }
    return sBlock;
  }

  selectNum(num) {
    //after select a number
    $(".selectActive").text(parseInt(num)); //set the number to block
    $(".selectActive").removeClass("selectActive");
    $(".select").removeClass("active");
  }

  getSpaceCount(selectActive, space_counter) {
    if (
      !$(selectActive).hasClass("was") & !$(selectActive).hasClass("sWrong")
    ) {
      space_counter = space_counter - 1;
      $(selectActive).addClass("was");
    }
    return space_counter;
  }

  ajax(url) {
    $.ajax({
      url: url,
      context: document.body,
    });
  }

  showSelectPanel(event) {
    if (!navigator.userAgent.match(/mobile/i)) {
      //if it's not a mobile device, show select panel around where the event happens
      $(".select")
        .css("top", event.pageY)
        .css("left", event.pageX)
        .addClass("active");
    } else {
      //if it's a mobile device, always show the select panel in the middle
      $(".select").css("top", "40%").css("left", "50%").addClass("active");
    }
  }

  addWrong(row, col) {
    let sBlock = $("#Block_" + row + "_" + col);
    sBlock.addClass("sWrong"); //if the number is wrong, show it with a red background
    return sBlock;
  }

  //render game board and input Sudoku numbers
  start(table) {
    //render game board
    for (let i = 0; i < 9; i++) {
      let row = $("<tr></tr>");
      for (let j = 0; j < 9; j++) {
        let sBlock = this.addBlock(i, j);
        row.append(sBlock);
        $(table).append(row);
      }
    }
    return $(table).html();
  }

  //--------------------------------COMPARE FUNCTION--------------------------
  //compare numbers on the board to find potential mistake

  compareRowCol(matrix, row, col) {
    let el = matrix[row][col];
    let mistakeCounter = 0;
    for (let j = 0; j < 9; j++) {
      if (matrix[row][j] == el && col != j) {
        mistakeCounter++;
        this.addWrong(row, j);
        this.addWrong(row, col);
      }
      if (matrix[j][col] == el && row != j) {
        mistakeCounter++;

        this.addWrong(j, col);
        this.addWrong(row, col);
      }
    }
    return mistakeCounter;
  }

  compareSquare(matrix, row, col) {
    let el = matrix[row][col];
    let mistakeCounter = 0;
    let rowI = Math.floor(row / 3);
    let colI = Math.floor(col / 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (
          matrix[rowI * 3 + i][colI * 3 + j] == el &&
          row != rowI * 3 + i &&
          col != colI * 3 + j
        ) {
          mistakeCounter++;
          this.addWrong(rowI * 3 + i, colI * 3 + j);
          this.addWrong(row, col);
        }
      }
    }
    return mistakeCounter;
  }

  compare(row, col) {
    let matrix = this.matrix;
    this.compareRowCol(matrix, row, col);
    this.compareSquare(matrix, row, col);
  }

  win() {
    document.location.href = "http://127.0.0.1:4000/q";
    return 0;
  }
}
//------------------------------------PLAY FUNCTION-------------------------
//handle click event in the game playing
function play(sudocu) {
  let space_counter = sudocu.count_of_empty_cells; // counter empty cells in matrix

  let started_play = false;
  $(".sBox").click(function (event) {
    //if the block in the table been clicked
    event.stopPropagation();
    if ($(this).hasClass("edit") == true) {
      //if it's a editable block
      $(".selectActive").removeClass("selectActive");
      $(this).addClass("selectActive");
      sudocu.showSelectPanel(event);
    }
  });

  $(".select div").click(function () {
    //if the select panel been clicked
    if (!started_play) {
      sudocu.ajax("/started_play");
      started_play = true;
    }
    let thisInput = $(this).text();
    let location = $(".selectActive").attr("id").split("_"); //analyze the id to get the location of the block selected
    let thisRow = parseInt(location[1]); //the x-axis of the block
    let thisCol = parseInt(location[2]); //the y-axis of the block
    sudocu.matrix[thisRow][thisCol] = parseInt(thisInput); //update the input to the data matrix
    //check the number input
    $(".sWrong").removeClass("sWrong"); // delete all sWrong -- BAD VERY BAD!!!
    sudocu.compare(thisRow, thisCol); //check the input by calling the compare function
    let selectActive = $(".selectActive");
    space_counter = sudocu.getSpaceCount(selectActive, space_counter);
    //after select a number
    sudocu.selectNum(thisInput);

    if (space_counter === 0 && !$(".sWrong")[0]) {
      // win check
      // the game ends if there are no empty cells left
      sudocu.win();
    }
  });

  $("html").click(function () {
    //the user can click any other part of the page (like background) to close the select panel
    $(".selectActive").removeClass("selectActive");
    $(".select").removeClass("active");
  });
}

function main() {
  $(document).ready(function () {
    (async () => {
      const data = await fetch("/make_matrix")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data;
        });
      let sudocu = new Sudoku(data["matrix_const"], data["matrix_empty"]);
      let table = $("#sTable");
      sudocu.start(table);
      play(sudocu);
    })();
  });
}

main();

export default { Sudoku };

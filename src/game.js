const Sudoku = {

  // -------------------------------GAME DATA---------------------------------
  // the Sudoku game data, game can be different if the data changes
  matrix: [[[7], [2], [], [9], [4], [5], [], [3], []],
    [[], [3], [9], [2], [], [6], [], [], [4]],
    [[1], [5], [], [7], [3], [8], [6], [9], [2]],
    [[6], [4], [7], [1], [], [3], [], [2], []],
    [[9], [8], [2], [6], [5], [7], [4], [1], [3]],
    [[3], [], [5], [4], [9], [2], [7], [], [6]],
    [[4], [9], [3], [], [6], [1], [], [5], [7]],
    [[5], [7], [], [3], [2], [], [8], [6], [9]],
    [[], [], [8], [5], [7], [9], [3], [4], []],
  ],

  count_of_empty_cells: 20,
  // -----------------------------START FUNCTION-------------------------------
  // render game board and input Sudoku numbers
  start() {
    // render game board
    for (let i = 0; i < 9; i += 1) {
      const row = $('<tr></tr>');
      for (let j = 0; j < 9; j += 1) {
        const sBlock = $('<td class="sBox edit"></td>');
        sBlock.attr('id', 'Block' + `_${i}_${j}`).text(Sudoku.matrix[i][j]); // store the block location in the id
        row.append(sBlock);
        if (Sudoku.matrix[i][j] != '') { // the number in block with edit class can be changed
          sBlock.removeClass('edit');
        }
        const groups = Math.floor(Math.sqrt(9)); // use different color to distinguish different groups
        const gA = Math.floor(i / groups);
        const gB = Math.floor(j / groups);
        if (gA % 2 == gB % 2) {
          sBlock.addClass('sGroup');
        } else {
          sBlock.addClass('sGroup2');
        }
        $('#sTable').append(row);
      }
    }
  },

  // ------------------------------------PLAY FUNCTION-------------------------
  // handle click event in the game playing
  play() {
    let spaceCounter = Sudoku.count_of_empty_cells;// counter empty cells in matrix
    $('.sBox').click(function (event) { // if the block in the table been clicked
      event.stopPropagation();
      if ($(this).hasClass('edit') === true) { // if it's a editable block
        $('.selectActive').removeClass('selectActive');
        $(this).addClass('selectActive');
        if (!navigator.userAgent.match(/mobile/i)) { // if it's not a mobile device, show select panel around where the event happens
          $('.select').css('top', event.pageY).css('left', event.pageX).addClass('active');
        } else { // if it's a mobile device, always show the select panel in the middle
          $('.select').css('top', '40%').css('left', '50%').addClass('active');
        }
      }
    });

    $('.select div').click(function () { // if the select panel been clicked
      const thisInput = $(this).text();
      const location = $('.selectActive').attr('id').split('_'); // analyze the id to get the location of the block selected
      const thisRow = parseInt(location[1]); // the x-axis of the block
      const thisCol = parseInt(location[2]); // the y-axis of the block
      Sudoku.matrix[thisRow][thisCol] = parseInt(thisInput); // update the input to the data matrix
      this.count_of_empty_cells -= 1;
      if (!$('.selectActive').hasClass('was')) {
        spaceCounter -= 1;
        $('.selectActive').addClass('was');
      }
      // check the number input
      $('.sWrong').removeClass('sWrong');
      Sudoku.compare(); // check the input by calling the compare function

      // after select a number
      $('.selectActive').text(parseInt(thisInput)); // set the number to block
      $('.selectActive').removeClass('selectActive');
      $('.select').removeClass('active');

      const wrong = document.getElementsByClassName('sWrong')[0];
      if (spaceCounter === 0 && !wrong) { // the game ends if there are no empty cells left
        Sudoku.win();
      }
    });

    $('html').click(() => { // the user can click any other part of the page (like background) to close the select panel
      $('.selectActive').removeClass('selectActive');
      $('.select').removeClass('active');
    });
  },

  // --------------------------------COMPARE FUNCTION--------------------------
  // compare numbers on the board to find potential mistake
  compare() {
    const { matrix } = Sudoku;
    for (let i = 0; i < 9; i += 1) {
      for (let j = 0; j < 9; j += 1) {
        for (let h = 0; h < 9; h += 1) {
          if (
            (matrix[i][j] === matrix[i][h] && j !== h) // valid rows in Sudoku rules
                             || (matrix[i][j] === matrix[h][j] && i != h) // valid cols in Sudoku rules
          ) {
            $(`#Block_${i}_${j}`).addClass('sWrong'); // if the number is wrong, show it with a red background
          }
          for (let k = 0; k < 3; k += 1) // valid groups in Sudoku rules
          {
            for (let l = 0; l < 3; l += 1) {
              if (
                (matrix[i][j] == matrix[parseInt(i / 3) * 3 + k][parseInt(j / 3) * 3 + l])
                                && (!(i == parseInt(i / 3) * 3 + k && j == parseInt(j / 3) * 3 + l))
              ) {
                $(`#Block_${i}_${j}`).addClass('sWrong');
              }
            }
          }
        }
      }
    }
  },
  win() {
    const popupContainer = document.getElementsByClassName('popup-container')[0];
    const closeButton = document.getElementsByClassName('close-button')[0];
    popupContainer.style.display = 'flex';
    closeButton.addEventListener('click', () => {
      popupContainer.style.display = 'none';
    });
  },
};

$(document).ready(() => {
  Sudoku.start();
  Sudoku.play();
});

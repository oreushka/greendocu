const { Sudoku } = require("./game.mjs");

let matrix_data = [
  [[7], [2], [], [9], [4], [5], [], [3], []],
  [[], [3], [9], [2], [], [6], [], [], [4]],
  [[1], [5], [], [7], [3], [8], [6], [9], [2]],
  [[6], [4], [7], [1], [], [3], [], [2], []],
  [[9], [8], [2], [6], [5], [7], [4], [1], [3]],
  [[3], [], [5], [4], [9], [2], [7], [], [6]],
  [[4], [9], [3], [], [6], [1], [], [5], [7]],
  [[5], [7], [], [3], [2], [], [8], [6], [9]],
  [[], [], [8], [5], [7], [9], [3], [4], []],
];

let count_of_empty_cells = 20;
let _Sudoku = new Sudoku(matrix_data, count_of_empty_cells);

// test: remove Edit class
test("__TEST_1__ ", () => {
  let sBlock = $('<td class="sBox edit"></td>');
  sBlock.attr("id", "Block_0_2").text(_Sudoku.giveMatrixNum(0, 2));
  expect(_Sudoku.removeEdit(sBlock, 0, 2).hasClass("edit")).toBe(true); // we can edit
  sBlock.attr("id", "Block_0_0").text(_Sudoku.giveMatrixNum(0, 0));
  expect(_Sudoku.removeEdit(sBlock, 0, 0).hasClass("edit")).toBe(false); // we can't edit
});

// test: adding a block
test("__TEST_2__", () => {
  expect(_Sudoku.addBlock(0, 0).hasClass("sBox")).toBe(true);
  expect(_Sudoku.addBlock(0, 0).html()).toBe("7");
});

// test: adding a group type
test("__TEST_3__", () => {
  let sBlock_0_0 = $("<div></div>");
  expect(_Sudoku.addGroupType(sBlock_0_0, 0, 0).hasClass("sGroup")).toBe(true);
  expect(_Sudoku.addGroupType(sBlock_0_0, 0, 0).hasClass("sGroup2")).toBe(
    false
  );

  let sBlock_0_2 = $("<div></div>");
  expect(_Sudoku.addGroupType(sBlock_0_2, 0, 2).hasClass("sGroup")).toBe(true);
  expect(_Sudoku.addGroupType(sBlock_0_2, 0, 2).hasClass("sGroup2")).toBe(
    false
  );

  let sBlock_4_7 = $("<div></div>");
  expect(_Sudoku.addGroupType(sBlock_4_7, 4, 7).hasClass("sGroup2")).toBe(true);
  expect(_Sudoku.addGroupType(sBlock_4_7, 4, 7).hasClass("sGroup")).toBe(false);
});

// test: getSpaceCount function
test("__TEST_4__", () => {
  let selectActive = document.createElement("div");
  expect(_Sudoku.getSpaceCount(selectActive, 1)).toBe(0);

  $(selectActive).addClass("was");
  expect(_Sudoku.getSpaceCount(selectActive, 0)).toBe(0);

  $(selectActive).removeClass("was");
  $(selectActive).addClass("sWrong");
  expect(_Sudoku.getSpaceCount(selectActive, 0)).toBe(0);

  $(selectActive).addClass("was");
  expect(_Sudoku.getSpaceCount(selectActive, 0)).toBe(0);
});

// test: sudoku render
test("__TEST_5__", () => {
  let tableInnerText =
    '<tr><td class="sBox sGroup" id="Block_0_0">7</td><td class="sBox sGroup" id="Block_0_1">2</td><td class="sBox edit sGroup" id="Block_0_2"></td><td class="sBox sGroup2" id="Block_0_3">9</td><td class="sBox sGroup2" id="Block_0_4">4</td><td class="sBox sGroup2" id="Block_0_5">5</td><td class="sBox edit sGroup" id="Block_0_6"></td><td class="sBox sGroup" id="Block_0_7">3</td><td class="sBox edit sGroup" id="Block_0_8"></td></tr><tr><td class="sBox edit sGroup" id="Block_1_0"></td><td class="sBox sGroup" id="Block_1_1">3</td><td class="sBox sGroup" id="Block_1_2">9</td><td class="sBox sGroup2" id="Block_1_3">2</td><td class="sBox edit sGroup2" id="Block_1_4"></td><td class="sBox sGroup2" id="Block_1_5">6</td><td class="sBox edit sGroup" id="Block_1_6"></td><td class="sBox edit sGroup" id="Block_1_7"></td><td class="sBox sGroup" id="Block_1_8">4</td></tr><tr><td class="sBox sGroup" id="Block_2_0">1</td><td class="sBox sGroup" id="Block_2_1">5</td><td class="sBox edit sGroup" id="Block_2_2"></td><td class="sBox sGroup2" id="Block_2_3">7</td><td class="sBox sGroup2" id="Block_2_4">3</td><td class="sBox sGroup2" id="Block_2_5">8</td><td class="sBox sGroup" id="Block_2_6">6</td><td class="sBox sGroup" id="Block_2_7">9</td><td class="sBox sGroup" id="Block_2_8">2</td></tr><tr><td class="sBox sGroup2" id="Block_3_0">6</td><td class="sBox sGroup2" id="Block_3_1">4</td><td class="sBox sGroup2" id="Block_3_2">7</td><td class="sBox sGroup" id="Block_3_3">1</td><td class="sBox edit sGroup" id="Block_3_4"></td><td class="sBox sGroup" id="Block_3_5">3</td><td class="sBox edit sGroup2" id="Block_3_6"></td><td class="sBox sGroup2" id="Block_3_7">2</td><td class="sBox edit sGroup2" id="Block_3_8"></td></tr><tr><td class="sBox sGroup2" id="Block_4_0">9</td><td class="sBox sGroup2" id="Block_4_1">8</td><td class="sBox sGroup2" id="Block_4_2">2</td><td class="sBox sGroup" id="Block_4_3">6</td><td class="sBox sGroup" id="Block_4_4">5</td><td class="sBox sGroup" id="Block_4_5">7</td><td class="sBox sGroup2" id="Block_4_6">4</td><td class="sBox sGroup2" id="Block_4_7">1</td><td class="sBox sGroup2" id="Block_4_8">3</td></tr><tr><td class="sBox sGroup2" id="Block_5_0">3</td><td class="sBox edit sGroup2" id="Block_5_1"></td><td class="sBox sGroup2" id="Block_5_2">5</td><td class="sBox sGroup" id="Block_5_3">4</td><td class="sBox sGroup" id="Block_5_4">9</td><td class="sBox sGroup" id="Block_5_5">2</td><td class="sBox sGroup2" id="Block_5_6">7</td><td class="sBox edit sGroup2" id="Block_5_7"></td><td class="sBox sGroup2" id="Block_5_8">6</td></tr><tr><td class="sBox sGroup" id="Block_6_0">4</td><td class="sBox sGroup" id="Block_6_1">9</td><td class="sBox sGroup" id="Block_6_2">3</td><td class="sBox edit sGroup2" id="Block_6_3"></td><td class="sBox sGroup2" id="Block_6_4">6</td><td class="sBox sGroup2" id="Block_6_5">1</td><td class="sBox edit sGroup" id="Block_6_6"></td><td class="sBox sGroup" id="Block_6_7">5</td><td class="sBox sGroup" id="Block_6_8">7</td></tr><tr><td class="sBox sGroup" id="Block_7_0">5</td><td class="sBox sGroup" id="Block_7_1">7</td><td class="sBox edit sGroup" id="Block_7_2"></td><td class="sBox sGroup2" id="Block_7_3">3</td><td class="sBox sGroup2" id="Block_7_4">2</td><td class="sBox edit sGroup2" id="Block_7_5"></td><td class="sBox sGroup" id="Block_7_6">8</td><td class="sBox sGroup" id="Block_7_7">6</td><td class="sBox sGroup" id="Block_7_8">9</td></tr><tr><td class="sBox edit sGroup" id="Block_8_0"></td><td class="sBox edit sGroup" id="Block_8_1"></td><td class="sBox sGroup" id="Block_8_2">8</td><td class="sBox sGroup2" id="Block_8_3">5</td><td class="sBox sGroup2" id="Block_8_4">7</td><td class="sBox sGroup2" id="Block_8_5">9</td><td class="sBox sGroup" id="Block_8_6">3</td><td class="sBox sGroup" id="Block_8_7">4</td><td class="sBox edit sGroup" id="Block_8_8"></td></tr>';
  let table = document.createElement("div");
  expect(_Sudoku.start(table)).toBe(tableInnerText);
});

// test: comparing nums in row, col
test("__TEST_6__", () => {
  expect(_Sudoku.compareRowCol(_Sudoku.matrix, 0, 0)).toBe(0);

  let tmp = _Sudoku.matrix[3][4];

  _Sudoku.matrix[3][4] = 7;
  expect(_Sudoku.compareRowCol(_Sudoku.matrix, 3, 4)).toBe(2);
  _Sudoku.matrix[3][4] = tmp;

  tmp = _Sudoku.matrix[7][2];
  _Sudoku.matrix[7][2] = 1;
  expect(_Sudoku.compareRowCol(_Sudoku.matrix, 7, 2)).toBe(0);
  _Sudoku.matrix[7][2] = tmp;

  tmp = _Sudoku.matrix[6][6];
  _Sudoku.matrix[6][6] = 8;
  expect(_Sudoku.compareRowCol(_Sudoku.matrix, 6, 6)).toBe(1);
  _Sudoku.matrix[6][6] = tmp;
});

// test: comparing nums in square
test("__TEST_7__", () => {
  expect(_Sudoku.compareSquare(_Sudoku.matrix, 0, 0)).toBe(0);

  let tmp = _Sudoku.matrix[3][4];

  _Sudoku.matrix[3][4] = 7;
  expect(_Sudoku.compareSquare(_Sudoku.matrix, 3, 4)).toBe(1);
  _Sudoku.matrix[3][4] = tmp;

  tmp = _Sudoku.matrix[7][2];
  _Sudoku.matrix[7][2] = 1;
  expect(_Sudoku.compareSquare(_Sudoku.matrix, 7, 2)).toBe(0);
  _Sudoku.matrix[7][2] = tmp;
});

// test win function
test("__TEST_8__", () => {
  expect(_Sudoku.win()).toBe(0);
});

// test delete selectActive class
test("__TEST_9__", () => {
  let selectActive = document.createElement("div");
  $(selectActive).addClass("selectActive");
  expect(
    _Sudoku.selectNum(selectActive, "7").hasClass("selectActive", "7")
  ).toBe(false);
});

// test setting text in block
test("__TEST_10__", () => {
  let selectActive = document.createElement("div");
  $(selectActive).addClass("selectActive");
  expect(_Sudoku.selectNum(selectActive, "6").text()).toBe("6");
});

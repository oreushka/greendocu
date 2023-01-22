import random


def _create_matrix():
    matrix = [[0] for i in range(9)]
    collumbia_pictures = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    for i in range(0, 9 * 3, 3):
        matrix[i // 3] = (
            collumbia_pictures[i % 9 - i // 9 :] + collumbia_pictures[: i % 9 - i // 9]
        )

    return matrix


def _shuffle_row(matrix: list, shuffles: int = 8):
    for i in range(shuffles):
        block = random.randint(1, 3)
        row1, row2 = random.randint(1, 3), random.randint(1, 3)
        matrix[block * 3 - row1], matrix[block * 3 - row2] = (
            list(matrix[block * 3 - row2]),
            list(matrix[block * 3 - row1]),
        )

    return matrix


def _shuffle_column(matrix: list, shuffles: int = 8):
    for i in range(shuffles):
        block = random.randint(1, 3)
        col1, col2 = random.randint(1, 3), random.randint(1, 3)
        for row in range(9):
            matrix[row][block * 3 - col1], matrix[row][block * 3 - col2] = (
                matrix[row][block * 3 - col2],
                matrix[row][block * 3 - col1],
            )

    return matrix

def delite_num(matrix:list, count:int):
    for i in range(count):
        row, col = random.randint(1,8), random.randint(1,8)

        while matrix[row][col] == 0:
            row= (row + random.randint(1,8)) % 9
            col= (col + random.randint(1,8)) % 9
        matrix[row][col] = 0

    return matrix


def remake_for_js(matrix):
    to_del = sum([row.count(0) for row in matrix])
    matrix = [[[i] if i!=0 else [] for i in row] for row in matrix]
    return matrix, to_del


def make_matrix(to_del: int, user:int = 1):
    matrix = _create_matrix()
    matrix = _shuffle_row(matrix, random.randint(20, 100))
    matrix = _shuffle_column(matrix, random.randint(20, 100))
    matrix = delite_num(matrix, to_del)
    matrix, to_del = remake_for_js(matrix)

    return {"matrix_const":matrix, "matrix_empty":to_del}

if __name__=="__main__":
    for row in make_matrix(to_del = 20):
        print(row)

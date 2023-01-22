import greendocu_gen


def test_create_matrix():
    assert greendocu_gen._create_matrix() == [[1, 2, 3, 4, 5, 6, 7, 8, 9],
                                              [4, 5, 6, 7, 8, 9, 1, 2, 3],
                                              [7, 8, 9, 1, 2, 3, 4, 5, 6],
                                              [9, 1, 2, 3, 4, 5, 6, 7, 8],
                                              [3, 4, 5, 6, 7, 8, 9, 1, 2],
                                              [6, 7, 8, 9, 1, 2, 3, 4, 5],
                                              [8, 9, 1, 2, 3, 4, 5, 6, 7],
                                              [2, 3, 4, 5, 6, 7, 8, 9, 1],
                                              [5, 6, 7, 8, 9, 1, 2, 3, 4]]


def test_delete_num(to_del = 80):
    arr = [[1, 2, 3, 4, 5, 6, 7, 8, 9],
            [4, 5, 6, 7, 8, 9, 1, 2, 3],
            [7, 8, 9, 1, 2, 3, 4, 5, 6],
            [9, 1, 2, 3, 4, 5, 6, 7, 8],
            [3, 4, 5, 6, 7, 8, 9, 1, 2],
            [6, 7, 8, 9, 1, 2, 3, 4, 5],
            [8, 9, 1, 2, 3, 4, 5, 6, 7],
            [2, 3, 4, 5, 6, 7, 8, 9, 1],
            [5, 6, 7, 8, 9, 1, 2, 3, 4]]
    arr = greendocu_gen.delite_num(arr, to_del)
    assert sum([row.count(0) for row in arr]) == to_del


def test_remake_for_js():
    arr = [[1,2],[0,4]]
    assert greendocu_gen.remake_for_js(arr)[0] == [[[1], [2]], [[], [4]]]

# print(greendocu_gen.remake_for_js([[1,2],[0,4]]))

# arr = greendocu_gen._create_matrix()
# arr = greendocu_gen._shuffle_row(arr, 20)
# # arr = greendocu_gen.delite_num(arr, 4)
#
# for i in range(9):
#     for j in range(9):
#         print(arr[i][j], end=' ')
#     print('\n')





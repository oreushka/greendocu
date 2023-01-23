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


def test_delete_num_1(to_del = 2):
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


def test_delete_num_3(to_del = 20):
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



def test_delete_num_4(to_del = 40):
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


def test_delete_num_5(to_del = 80):
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


def test_remake_for_js_1():
    arr = [[1,2],[0,4]]
    assert greendocu_gen.remake_for_js(arr)[0] == [[[1], [2]], [[], [4]]]


def test_remake_for_js_2():
    arr = [[0,0],[0,0]]
    assert greendocu_gen.remake_for_js(arr)[0] == [[[], []], [[], []]]


def test_remake_for_js_3():
    arr = [[1,2],[3,4]]
    assert greendocu_gen.remake_for_js(arr)[0] == [[[1], [2]], [[3], [4]]]

def test_remake_for_js_at_all():
    arr = [[1,0],[3,0]]
    assert greendocu_gen.remake_for_js(arr) == ([[[1], []], [[3], []]], 2)


print(greendocu_gen.remake_for_js([[1,0],[3,0]]))





"""
파이프라인 프로그래밍 형식에서는 모든 것을 입력 집합 하나를 출력 집합 하나에 매핑하는
연관 관계로 바라봄으로써 수학적 순수성을 달성하려고 한다.

멱등성(idempotent)은 함수를 한 번 이상 호출하더라도
단 한 번 호출할 때와 정확히 동일한 관측 결과를 만들어 낸다는 것을 의미한다.

인자가 여러 개인 함수는 커링(currying)이라는 기법을 통해
일련의 단일 값 고차 함수로 변형할 수 있다.
"""

# currying
def f(x, y, z):
    return x * y + z

f(2, 3, 4) # 10

def f(x):
    def g(y):
        def h(z):
            return x * y + z
        return h
    return g

f(2)(3)(4) # 10
##############################

import sys, re, operator, string


"""
data는 하나의 문자열
"""
def read_file(path_to_file):
    with open(path_to_file) as f:
        data = f.read()
    return data


"""
\W - 문자+숫자(alphanumeric)가 아닌 문자와 매치, [^a-zA-Z0-9]와 동일한 표현식
알파벳이나 숫자가 아닌 문자를 공백으로 변경하고 소문자로 변경
"""
def filter_chars_and_normalize(str_data):
    pattern = re.compile('[\W_]+')
    return pattern.sub(' ', str_data).lower()


def scan(str_data):
    return str_data.split()


def remove_stop_words(word_list):
    with open('../stop_words.txt') as f:
        stop_words = f.read().split(',')
    stop_words.extend(list(string.ascii_lowercase))
    return [w for w in word_list if not  w in stop_words]


def frequencies(word_list):
    word_freqs = {}
    for w in word_list:
        if w in word_freqs:
            word_freqs[w] += 1
        else:
            word_freqs[w] = 1
    return word_freqs


"""
dict.items()는 key, value tuple을 리턴한다.
key를 sorting의 기준, itemgetter(1)을 value를 기준으로 sortring한다는 의미
"""
def sort(word_freq):
    # return sorted(word_freq.iteritems(), key=operator.itemgetter(1), reverse=True)
    return sorted(word_freq.items(), key=operator.itemgetter(1), reverse=True)


def print_all(word_freqs):
    if(len(word_freqs) > 0):
        print(f'{word_freqs[0][0]} - {word_freqs[0][1]}')
        print_all(word_freqs[1:])


print_all(sort(frequencies(remove_stop_words(
    scan(filter_chars_and_normalize(read_file(sys.argv[1]))))))[0:25])

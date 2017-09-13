"""
이 형식은 대부분의 프로그래밍 언어에서 제공하는 전통적인 함수 합성을 넘어
함수를 배열하는 또 다른 변형이다.
이 형식으로 함수를 합성할 때는 값과 함수 사이에서 접착제 역할을 하는 추상화(유일)를 수립한다.
이 추상화에서는 두 가지 주요 연산을 제공하는데,
하나는 단순 값을 취해 접착제 역할을 하는 추상화의 인스턴스를 반환하는 감싸기(wrap) 연산이고
다른 하나는 감싼 값을 함수에 제공하는 결합(bind) 연산이다.
"""

import sys, re, operator, string


class TFTheOne:
    def __init__(self, v):
        self._value = v

    def bind(self, func):
        self._value = func(self._value)
        return self

    def printme(self):
        print(self._value)


def read_file(path_to_file):
    with open(path_to_file) as f:
        data = f.read()
    return data


def filter_chars(str_data):
    pattern = re.compile('[\W_]+')
    return pattern.sub(' ', str_data)


def normalize(str_data):
    return str_data.lower()


def scan(str_data):
    return str_data.split()


def remove_stop_words(word_list):
    with open('../stop_words.txt') as f:
        stop_words = f.read().split(',')

    stop_words.extend(list(string.ascii_lowercase))
    return [w for w in word_list if not w in stop_words]


def frequencies(word_list):
    word_freqs = {}
    for w in word_list:
        if w in word_freqs:
            word_freqs[w] += 1
        else:
            word_freqs[w] = 1
    return word_freqs


def sort(word_freq):
    return sorted(word_freq.items(), key=operator.itemgetter(1), reverse=True)


def top25_freqs(word_freqs):
    top25 = ""
    for tf in word_freqs[0:25]:
        top25 += str(tf[0]) + '-' + str(tf[1]) + '\n'
    return top25


TFTheOne(sys.argv[1])\
.bind(read_file)\
.bind(filter_chars)\
.bind(normalize)\
.bind(scan)\
.bind(remove_stop_words)\
.bind(frequencies)\
.bind(sort)\
.bind(top25_freqs)\
.printme()
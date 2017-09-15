"""
generator 관련 예제다.
데이터가 실시간으로 흘러 들어오거나, 데이터의 규모가 매우 클 때 사용된다.

처음에는 iterator라고 불렸으나 iterator라는 말은 객체 지향적 특징,
즉 컨테이너를 순회하는 객체라는 개념을 나타내는 데 사용된다.
generator라는 말은 iterator를 지원하는 특화된 coroutine을 말한다.
"""
import sys, operator, string


def characters(filename):
    for line in open(filename):
        for c in line:
            yield c


def all_words(filename):
    start_char = True
    for c in characters(filename):
        if start_char == True:
            word = ''
            if c.isalnum():
                word = c.lower()
                start_char = False
            else:
                pass
        else:
            if c.isalnum():
                word += c.lower()
            else:
                start_char = True
                yield word


def non_stop_words(filename):
    stopwords = set(
        open('../stop_words.txt').read().split(',') +\
        list(string.ascii_lowercase))
    for w in all_words(filename):
        if not w in stopwords:
            yield w


def count_and_sort(filename):
    freqs, i = {}, 1
    for w in non_stop_words(filename):
        freqs[w] = 1 if w not in freqs else freqs[w] + 1
        if i % 5000 == 0:
            yield sorted(
                freqs.items(), key=operator.itemgetter(1), reverse=True)
        i = i + 1
    yield sorted(freqs.items(), key=operator.itemgetter(1), reverse=True)


for word_freqs in count_and_sort(sys.argv[1]):
    for w, c in word_freqs[0:25]:
        print(f'{w} - {c}')

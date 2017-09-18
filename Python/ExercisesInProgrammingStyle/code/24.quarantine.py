"""
핵심 프로그램 함수, 즉 1차 함수는 입출력을 할 수 없다.
왜냐하면 이러한 함수는 동일한 인자로 여러 번 호출하더라도
항상 동일한 결과를 만들어 내야 하므로 순순해야 한다.
하지만 고차 함수에서는 입출력을 할 수 있다.
그러므로 전체적인 접근법은 '입출력을 수행하는' 모든 코드를 고차 함수로 감싸고
이러한 고차 함수를 실행하지 않고 순차열에 넣어 연쇄시킨 다음,
입출력을 반드시 해야 할 때 주 프로그램에서만 해당 사슬을 실행하게 한다.

TFQuarantine에서는 함수 사슬을 지연 평가(lazy evaluation)한다.
즉, 호출하지 않고 우선 저장한 다음,
주 함수에서 execute를 호출할 때만 함수를 호출한다.

execute는 주의해서 구현해야 하는데, 자발적으로 함수를 두 종류,
즉 입출력을 사용하는 코드인 고차 함수를 반환하는 함수와
일반적인 함수로 구성했기 때문이다.
두 종류의 함수를 모두 연쇄시켜야 하므로
execute 메서드는 그 값을 적용해야 할지 단순히 참조해야 할지 알아야 한다.
내부 함수인 guard_callable은 그 값이 호출 가능한지
그렇지 않은지에 따라 호출하거나 참조한다.
"""
import sys, re, operator, string


class TFQuarantine:
    def __init__(self, func):
        self._funcs = [func]

    def bind(self, func):
        self._funcs.append(func)
        return self

    def execute(self):
        def guard_callable(v):
            return v() if hasattr(v, '__call__') else v

        value = lambda: None
        for func in self._funcs:
            value = func(guard_callable(value))
        print(guard_callable(value))


def get_input(arg):
    def _f():
        return sys.argv[1]
    return _f


def extract_words(path_to_file):
    def _f():
        with open(path_to_file) as f:
            data = f.read()
        pattern = re.compile('[\W_]+')
        word_list = pattern.sub(' ', data).lower().split()
        return word_list
    return _f


def remove_stop_words(word_list):
    def _f():
        with open('../stop_words.txt') as f:
            stop_words = f.read().split(',')
        stop_words.extend(list(string.ascii_lowercase))
        return [w for w in word_list if not w in stop_words]
    return _f


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
        top25 += str(tf[0]) + ' - ' + str(tf[1]) + '\n'
    return top25


TFQuarantine(get_input)\
.bind(extract_words)\
.bind(remove_stop_words)\
.bind(frequencies)\
.bind(sort)\
.bind(top25_freqs)\
.execute()

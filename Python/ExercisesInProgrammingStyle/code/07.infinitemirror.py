# 책에서 이해되지 않는 부분을 일단 적는다.
# count 함수를 재귀적으로 호출할 때 새로운 호출은 스택에서 새로운 부분을 차지한다.
# 스택은 가장 끝에서만 제거할 수 있기 때문이다.
# 그런데 메모리의 양은 유한하므로 결국 프로그램은 스택 오버플로를 일으킨다.
# 이를 방지하고자 먼저 재귀 한계를 증가시킨다.
# 하지만 오만과 편견처럼 본문이 많을 때는 여전히 충분치 않다.
# 그러므로 count 함수를 단어 목록 전체에 대해 실행하는 대신
# 그 리스틑를 N 덩어리로 분할하고 한 번에 한 덩어리에 대해 함수를 호출한다.

# 많은 프로그래밍 언어에서 재귀 호출로 인한 스택 오버플로 문제를
# 꼬리 재귀 최적화(tail recursion optimization) 기법으로 제거한다.
# 꼬리 호출(tail call)은  함수에서 가장 마지막 행동으로 취하는 함수 호출이다.
# 꼬리 재귀는 해당 함수의 꼬리 위치에서 하는 재귀 호출이다.
# 이렇게 하면 언어 처리기에서는 이전 호출의 스택 기록을 모두 안전하게 제거할 수 있다.
# 해당 특정 함수 호출에 대해 처리할 일이 없기 때문이다.
# 이를 꼬리 재귀 최적화라 하며, 이를 통해 사실상 재귀 함수를 루프로 변형해 시간과 공간을 절약한다.
# 일부 프로그래밍 언어(ex 하스켈)에서는 재귀를 통해 루프를 처리한다.

# 파이썬에서는 꼬리 재귀 최적화를 하지 않으므로 예제에는 호출 스택 깊이를 제한하는 특징이 있다.

import re, sys, operator

# RECURSION_LIMIT를 3224 이상으로 설정하면 프로그램이 죽는다.
# 신기하네
RECURSION_LIMIT = 3224
sys.setrecursionlimit(RECURSION_LIMIT+10)


def count(word_list, stopwords, wordfreqs):
    if word_list == []:
        return
    else:
        word = word_list[0]
        if word not in stopwords:
            if word in wordfreqs:
                wordfreqs[word] += 1
            else:
                wordfreqs[word] = 1
        count(word_list[1:], stopwords, wordfreqs) 


def wf_print(wordfreq):
    if wordfreq == []:
        return
    else:
        (w, c) = wordfreq[0]
        print(f'{w} - {c}')
        wf_print(wordfreq[1:])


stop_words = set(open('../stop_words.txt').read().split(','))
words = re.findall('[a-z]{2,}', open(sys.argv[1]).read().lower())
word_freqs = {}

# 여기에 for문이 왜 필요한지 모르겠다.
for i in range(0, len(words), RECURSION_LIMIT):
    count(words[i:i+RECURSION_LIMIT], stop_words, word_freqs)

# operator가 무엇인지 찾아보자.
wf_print(sorted(word_freqs.items(), key=operator.itemgetter(1), reverse=True)[:25])

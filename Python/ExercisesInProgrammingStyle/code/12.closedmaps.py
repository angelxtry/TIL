"""
단순 객체가 this나 self 같은 자기 참조 키워드를 사용해는 대신,
삼인칭으로 자기 자신을 참조한다.

Closed Map 형식은 prototype으로 알려진 객체 기반 프로그래밍의 특색을 보여준다.
장점은 기존 객체를 기반으로 객체를 인스턴스화 하는 것이 매우 간단해진다.
어떤 시점에 객체의 기능을 확장하는 것도 간단하다.
단순히 해당 맵에 키만 더 추가하면 된다. 키를 제거하는 것도 가능하다.
단점은 접근 제어가 없어 모든 키를 색인할 수 있다는 점이다.
또한 클래스, 상속, 위임과 같은 유용한 코드 재사용 개념을 구현하려면
프로그래머가 직접 코드를 추가로 작성해야 한다.
"""

import sys, re, operator, string


def extract_words(obj, path_to_file):
    with open(path_to_file) as f:
        obj['data'] = f.read()
    pattern = re.compile('[\W_]+')
    data_str = ''.join(pattern.sub(' ', obj['data']).lower())
    obj['data'] = data_str.split()


def load_stop_words(obj):
    with open('../stop_words.txt') as f:
        obj['stop_words'] = f.read().split(',')
    obj['stop_words'].extend(list(string.ascii_lowercase))


def increment_count(obj, w):
    obj['freqs'][w] = 1 if w not in obj['freqs'] else obj['freqs'][w] + 1


data_storage_obj = {
    'data' : [],
    'init' : lambda path_to_file : extract_words(data_storage_obj, path_to_file),
    'words' : lambda : data_storage_obj['data']
}


stop_words_obj = {
    'stop_words' : [],
    'init' : lambda : load_stop_words(stop_words_obj),
    'is_stop_word' : lambda word : word in stop_words_obj['stop_words']
}


word_freqs_obj = {
    'freqs' : {},
    'increment_count' : lambda w : increment_count(word_freqs_obj, w),
    'sorted' : lambda : sorted(
        word_freqs_obj['freqs'].items(),
        key=operator.itemgetter(1),
        reverse=True)
}


data_storage_obj['init'](sys.argv[1])
stop_words_obj['init']()


for w in data_storage_obj['words']():
    if not stop_words_obj['is_stop_word'](w):
        word_freqs_obj['increment_count'](w)


word_freqs = word_freqs_obj['sorted']()
for (w, c) in word_freqs[0:25]:
    print(f'{w} - {c}')

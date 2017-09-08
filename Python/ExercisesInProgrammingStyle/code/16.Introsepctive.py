"""
프로그램이 자기 자신에 관한 정보에 접근하는 능력을 
introspection(자기관찰)이라 한다.
호출자의 식별 정보에 접근하는 것은 호출 스택을 조사(inspect.stack()) 하고
이전 프레임에 접근(현재 프레임이 [0]이므로 [1])한 다음,
그 프레임의 세 번째 요소(함수 이름을 나태낸다.)에 접근함으로써 처리한다.
함수에 전달한 인자에 자기 관찰적 런타임 구조인 locals()를 통해 접근한다.
파이썬에서 locals()는 현재 지역 기호 표(symbol table)를 나타내는
틱셔너리를 반환하는 함수
"""
import sys, re, operator, string, inspect


def read_stop_words():
    if inspect.stack()[1][3] != 'extract_words':
        return None

    with open('../stop_words.txt') as f:
        stop_words = f.read().split(',')
    stop_words.extend(list(string.ascii_lowercase))
    return stop_words


def extract_words(path_to_file):
    with open(locals()['path_to_file']) as f:
        str_data = f.read()
    pattern = re.compile('[\W_]+')
    word_list = pattern.sub(' ', str_data).lower().split()
    stop_words = read_stop_words()
    return [w for w in word_list if not w in stop_words]


def frequencies(word_list):
    word_freqs = {}
    for w in locals()['word_list']:
        if w in word_freqs:
            word_freqs[w] += 1
        else:
            word_freqs[w] = 1
    return word_freqs


def sort(word_freqs):
    return sorted(
        locals()['word_freqs'].items(),
        key=operator.itemgetter(1),
        reverse=True)


def main():
    word_freqs = sort(frequencies(extract_words(sys.argv[1])))
    for (w, c) in word_freqs[0:25]:
        print(f'{w} - {c}')


if __name__ == '__main__':
    main()

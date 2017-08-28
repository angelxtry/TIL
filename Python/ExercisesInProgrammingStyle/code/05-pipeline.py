# pipeline

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


"""
dict를 이렇게도 만들 수 있구나...
"""
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


"""
04-cookbook.py는 약 12초, 05-pipeline.py는 약 0.238초가 걸린다.
"""
print_all(sort(frequencies(remove_stop_words(
    scan(filter_chars_and_normalize(read_file(sys.argv[1]))))))[0:25])

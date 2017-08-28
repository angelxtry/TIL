#!/usr/bin/env python

import sys, string
# the global list of [word, frequency] pairs
word_freqs = []
# the list of stop words
with open('../stop_words.txt') as f:
    stop_words = f.read().split(',')
    # print(list(f.read()))

    """
    stop_words = f.read()
    단순히 f.read()로 처리하면 하나의 파일을 읽어서 하나의 문자열로 만든다.
    print(type(stop_words)) # <class 'str'>
    이 문자열은 ,로 구분된 단어들이다. 그래서 split(',')을 하면
    단어가 element인 list가 된다.
    """
stop_words.extend(list(string.ascii_lowercase))
"""
string.ascii_lowercase는 a부터 z까지 소문자로 된 문자열을 반환한다.
print(string.ascii_lowercase)
따라서 위 코드를 실행하면 stop_words list와 소문자 알파벳 하나하나가 
element인 list가 합쳐진다.
"""

# iterate through the file one line at a time 
for line in open(sys.argv[1]):
    # print(line)
    start_char = None
    i = 0
    for c in line:
        # print(c)
        if start_char == None:
            if c.isalnum():
                # We found the start of a word
                start_char = i
        else:
            if not c.isalnum():
                # We found the end of a word. Process it
                found = False
                word = line[start_char:i].lower()
                # Ignore stop words
                if word not in stop_words:
                    pair_index = 0
                    # Let's see if it already exists
                    for pair in word_freqs:
                        if word == pair[0]:
                            pair[1] += 1
                            found = True
                            found_at = pair_index
                            break
                        pair_index += 1
                    if not found:
                        word_freqs.append([word, 1])
                    elif len(word_freqs) > 1:
                        # We may need to reorder
                        for n in reversed(range(pair_index)):
                            if word_freqs[pair_index][1] > word_freqs[n][1]:
                                # swap
                                word_freqs[n], word_freqs[pair_index] = word_freqs[pair_index], word_freqs[n]
                                pair_index = n
                # Let's reset
                start_char = None
        i += 1

for tf in word_freqs[0:25]:
    print(f'{tf[0]} - {tf[1]}')

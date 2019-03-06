# Where my anagrams at

word와 문자열을 element로 갖는 list를 인자로 받아 word의 anagram만 list에 담아 반환한다.

## Example

```py
def test_anagrams():
    """ anagrams test """
    assert solve.anagrams(
            'abba', ['aabb', 'abcd', 'bbaa', 'dada']
            ) == ['aabb', 'bbaa']
    assert solve.anagrams(
            'racer', ['crazer', 'carer', 'racar', 'caers', 'racer']
            ) == ['carer', 'racer']
    assert solve.anagrams('laser', ['lazing', 'lazy',  'lacer']) == []
```

## 내가 작성한 코드

```py
def anagrams(word, words):
    condition = [c for c in word]
    word_dict = {}
    for char in set(condition):
        word_dict[char] = condition.count(char)

    anagram_list = []
    for candidate in words:
        is_anagram = True
        candidate_list = [c for c in candidate]
        if len(candidate) != len(word):
            continue
        for char, char_count in word_dict.items():
            if char_count != candidate_list.count(char):
                is_anagram = False
                break
        if is_anagram:
            anagram_list.append(candidate)
    return anagram_list
```

어렵지 않게 문제는 풀었는데 best_solve를 보니 충격과 공포다. 부끄러워서 코드를 올리기 싫을 정도네.

```py
def best_solve1(word, words):
    return [ana for ana in words if sorted(word) == sorted(ana)]
```

고민할 필요없이 sort해서 같은면 anagram. 이렇게 명쾌할수가!

```py
def best_solve2(word, words):
    return list(filter(lambda x: sorted(word) == sorted(x), words))
```

lambda와 filter를 사용했다.

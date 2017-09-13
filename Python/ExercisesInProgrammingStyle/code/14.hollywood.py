"""
호출자와 피호출자의 결합을 프로그램의 특정 시점으로 고정
(즉, 함수 호출. 이때는 함수를 명명함으로써 결합한다.)하는 대신
그 관계를 뒤바꿔서 수많은 호출자의 행동을 피호출자가 결정한 시점에
피효출자가 일으키게 한다.

제어 역전은 분산 시스템 설계에서 중요한 개념이다.
이는 네트워크의 한 노드에 있는 구성 요소가 다른 노드에 있는 다른 구성 요소를
주기적으로 폴링(polling)하는 대신 특정 조긴이 발생했을 때
첫 번째 구성요소가 두 번째 구성 요소에게 자신을 다시 호출하도록 요청할 때
유용하다.
극단적으로 추구하면 이벤트 주도 구조가 된다.
"""
import sys, re, operator, string


class WordFrequecyFramework:
    _load_event_handlers = []
    _dowork_event_handlers = []
    _end_event_handlers = []

    def register_for_load_event(self, handler):
        self._load_event_handlers.append(handler)

    def register_for_dowork_event(self, handler):
        self._dowork_event_handlers.append(handler)

    def register_for_end_event(self, handler):
        self._end_event_handlers.append(handler)

    def run(self, path_to_file):
        for h in self._load_event_handlers:
            h(path_to_file)
        for h in self._dowork_event_handlers:
            h()
        for h in self._end_event_handlers:
            h()


class DataStorage:
    _data = ''
    _stop_word_filter = None
    _word_event_handlers = []

    def __init__(self, wfapp, stop_word_filter):
        self._stop_word_filter = stop_word_filter
        wfapp.register_for_load_event(self.__load)
        wfapp.register_for_dowork_event(self.__produce_words)

    def __load(self, path_to_file):
        with open(path_to_file) as f:
            self._data = f.read()
        pattern = re.compile('[\W\+]')
        self._data = pattern.sub(' ', self._data).lower()

    def __produce_words(self):
        data_str = ''.join(self._data)
        for w in data_str.split():
            if not self._stop_word_filter.is_stop_word(w):
                for h in self._word_event_handlers:
                    h(w)

    def register_for_word_event(self, handler):
        self._word_event_handlers.append(handler)


class StopWordFilter:
    _stop_word = []

    def __init__(self, wfapp):
        wfapp.register_for_load_event(self.__load)

    def __load(self, ignore):
        with open('../stop_words.txt') as f:
            self._stop_words = f.read().split(',')
        self._stop_words.extend(list(string.ascii_lowercase))

    def is_stop_word(self, word):
        return word in self._stop_words


class WordFrequecyCounter:
    _word_freqs = {}

    def __init__(self, wfapp, data_storage):
        data_storage.register_for_word_event(self.__increment_count)
        wfapp.register_for_end_event(self.__print_freqs)

    def __increment_count(self, word):
        if word in self._word_freqs:
            self._word_freqs[word] += 1
        else:
            self._word_freqs[word] = 1

    def __print_freqs(self):
        word_freqs = sorted(
            self._word_freqs.items(),
            key=operator.itemgetter(1),
            reverse=True
        )
        for (w, c) in word_freqs[0:25]:
            print(f'{w} - {c}')


wfapp = WordFrequecyFramework()
stop_word_filter = StopWordFilter(wfapp)
data_storage = DataStorage(wfapp, stop_word_filter)
word_freq_counter = WordFrequecyCounter(wfapp, data_storage)
wfapp.run(sys.argv[1])

import sys, re, operator, string


class DataStorageManager():
    _data = ''

    def dispatch(self, message):
        if message[0] == 'init':
            return self._init(message[1])
        elif message[0] == 'words':
            return self._words()
        else:
            raise Exception("Message not understood " + message[0])

    def _init(self, path_to_file):
        with open(path_to_file) as f:
            self._data = f.read()
        pattern = re.compile('[\W_]')
        self._data = pattern.sub(' ', self._data).lower()

    def _word(self):
        data_str = ''.join(self._data)
        return data_str.split()


class StopWordManager():
    _stop_words = []

    def dispatch(self, message):
        if mess
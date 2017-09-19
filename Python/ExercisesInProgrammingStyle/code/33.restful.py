import re, string, sys


with open('../stop_words.txt') as f:
    stops = set(f.read().split(',') + list(string.ascii_lowercase))


data = {}


def error_state():
    return "Something wrong", ["get", "default", None]


def default_get_handler(args):
    rep = "What would you like to do?"
    rep += "\n1 - Quit" + "\n2 - Upload file"
    links = {"1": ["post", "execution", None], "2": ["get", "file_form", None]}
    return rep, links


def quit_handler(args):
    sys.exit("Goodbye cruel world...")


def upload_get_handler(args):
    return "Name of file to upload?", ["post", "flie"]


def upload_post_handler(args):
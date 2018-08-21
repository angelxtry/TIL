class Foo:
    def __await__(self):
        yield 42

async def bar():
    await Foo()

bar()

b = bar()

b.send(None)
b.send(None)
b.send(None)

# generator delegation을 문법으로 만들어 놓은 것이 async?


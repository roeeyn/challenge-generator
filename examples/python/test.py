from index import hello_world
import unittest

class TestHello(unittest.TestCase):
    def test_hello_world(self):
        assert hello_world() == "Hello World!"

if __name__ == '__main__':
    unittest.main()

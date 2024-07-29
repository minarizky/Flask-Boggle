import random
import string

class BoggleBoard:
    def __init__(self):
        self.board = self.make_board()

    def make_board(self):
        """Create and return a 5x5 board of random letters."""
        return [[random.choice(string.ascii_uppercase) for _ in range(5)] for _ in range(5)]

    def check_valid_word(self, word, board):
        """Check if a word is valid and exists on the board."""
        # This would contain the logic to check if the word can be formed on the board
        return True

def is_valid_word(word, words):
    """Check if a word is in the dictionary."""
    return word in words

from flask import Flask, render_template, session, redirect, url_for, jsonify, request
from boggle import BoggleBoard, is_valid_word

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'

WORDS = ["TEST", "WORDS", "EXAMPLE", "PYTHON"]  # This should be a more comprehensive word list

@app.route('/')
def homepage():
    """Display the Boggle board and form for word submission."""
    board = BoggleBoard().make_board()
    session['board'] = board
    session['plays'] = session.get('plays', 0)
    session['highscore'] = session.get('highscore', 0)
    return render_template('index.html', board=board)

@app.route('/check-word', methods=['POST'])
def check_word():
    """Check if a submitted word is valid."""
    word = request.json['word'].upper()
    board = session.get('board')
    if not board:
        return jsonify({'result': 'no-board'})

    if not is_valid_word(word, WORDS):
        return jsonify({'result': 'not-a-word'})

    if not BoggleBoard().check_valid_word(word, board):
        return jsonify({'result': 'not-on-board'})

    return jsonify({'result': 'ok'})

@app.route('/post-score', methods=['POST'])
def post_score():
    """Receive the score from the front-end and update stats."""
    score = request.json['score']
    session['plays'] = session.get('plays', 0) + 
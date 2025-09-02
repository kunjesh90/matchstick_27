from flask import Flask, request, jsonify

app = Flask(__name__)

def ai_move(remaining):
    mod = (remaining - 1) % 5
    return mod if mod != 0 else 1

@app.route('/api/move', methods=['POST'])
def move():
    data = request.json
    total = data.get('remaining', 0)
    user_move = data.get('user_move', 0)
    total -= user_move
    if total <= 0:
        return jsonify({'ai_move': 0, 'remaining': 0, 'game_over': True, 'ai_lost': False})
    ai_choice = ai_move(total)
    total -= ai_choice
    game_over = total <= 0
    return jsonify({
        'ai_move': ai_choice,
        'remaining': total,
        'game_over': game_over,
        'ai_lost': game_over
    })

if __name__ == '__main__':
    app.run()

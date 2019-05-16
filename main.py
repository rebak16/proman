from flask import Flask, render_template, url_for, request, session, redirect
from util import json_response

import data_handler
import password_manager

app = Flask(__name__)


app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler.get_boards()


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards_for_board(board_id)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user = data_handler.get_user_by_name(request.form.get('username'))
        if user is None:
            invalid_username_or_password = 'Invalid username or password!'
            return render_template('/login.html', invalid_username_or_password=invalid_username_or_password)

        if user['password'] and password_manager.verify_password(request.form['password'], user['password']) is False:
            invalid_username_or_password = 'Invalid username or password!'
            return render_template('/login.html', invalid_username_or_password=invalid_username_or_password)

        session['username'] = user['username']
        return redirect('/')
    return render_template('/login.html')


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect('/')


@app.route('/registration', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        confirm_pw = request.form['confirm_password']
        if password != confirm_pw:
            invalid_confirm_pw = "Invalid confirm password!"
            return render_template("register.html", invalid_confirm_pw=invalid_confirm_pw)



        try:
            data_handler.register(username, password)
            return redirect('/')
        except:
            invalid_username = "Username is already used"
            return render_template("register.html", invalid_username=invalid_username)


    return render_template("register.html")


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()

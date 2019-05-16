import database_common
import password_manager
import persistence
from datetime import datetime

def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    statuses = persistence.get_statuses()
    return next((status['title'] for status in statuses if status['id'] == int(status_id)), 'Unknown')


def get_boards():
    """
    Gather all boards
    :return:
    """
    return persistence.get_boards()


def get_cards_for_board(board_id):
    persistence.clear_cache()
    all_cards = persistence.get_cards()
    matching_cards = []
    for card in all_cards:
        if card['board_id'] == int(board_id):
            card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
            matching_cards.append(card)
    return matching_cards


@database_common.connection_handler
def register(cursor, username, password):
    dt = datetime.now()
    hash_pw = password_manager.hash_password(password)
    cursor.execute("insert into registration(username, password, submission_time) values (%(username)s, %(password)s,"
                   "%(submission_time)s)",
                   {'username': username,
                    'password': hash_pw,
                    'submission_time': dt
                    })


@database_common.connection_handler
def login(cursor, username):
    cursor.execute("select password FROM registration where username = %(username)s",
                   {'username': username})
    return cursor.fetchone()['password']


@database_common.connection_handler
def get_user_by_name(cursor, username):
    cursor.execute("select username, password FROM registration where username = %(username)s",
                    {'username': username})
    return cursor.fetchone()
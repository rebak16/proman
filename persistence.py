import database_common

_cache = {}  # We store cached data in this dict to avoid multiple file readings


def clear_cache():
    for k in list(_cache.keys()):
        _cache.pop(k)


@database_common.connection_handler
def get_statuses(cursor):
    cursor.execute("""select * FROM statuses""")
    keys_ = cursor.fetchall()
    a = []
    for i in keys_:
        a.append(dict(i))
    return a


@database_common.connection_handler
def get_boards(cursor):
    cursor.execute("""select * FROM boards""")
    keys_ = cursor.fetchall()
    a = []
    for i in keys_:
        a.append(dict(i))

    return a


@database_common.connection_handler
def get_cards(cursor):
    cursor.execute("""select * FROM cards""")
    keys_ = cursor.fetchall()
    a = []
    for i in keys_:
        a.append(dict(i))
    return a

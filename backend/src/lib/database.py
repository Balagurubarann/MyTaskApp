from pymysql import connect
from pymysql.err import OperationalError as OpErr

def create_database_if_not_exists():

    try:

        connection = connect(
            user="root",
            password="root",
            host="localhost"
        )

        cursor = connection.cursor()                                                

        cursor.execute(f"CREATE DATABASE IF NOT EXISTS task_app_db;")
        connection.commit()

        cursor.close()
        connection.close()

    except OpErr as Ex:

        raise Ex("Error Happened while db connection!")
    

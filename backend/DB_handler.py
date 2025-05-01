import sqlite3
import os


class DBHandler:
    def __init__(self):
        self.db_path = os.path.join(os.path.dirname(__file__), 'tours.db')
        self.conn = sqlite3.connect(self.db_path, check_same_thread=False)
        self.cursor = self.conn.cursor()
        self.create_table()

    def create_table(self):
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS tours (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tour_name TEXT NOT NULL,
                pic_URL TEXT NOT NULL,
                language TEXT NOT NULL
            )
        ''')
        self.conn.commit()
    
    def insert_tour(self, tour_name, pic_URL, language):
        self.cursor.execute('''
            INSERT INTO tours (tour_name, pic_URL, language)
            VALUES (?, ?, ?)
        ''', (tour_name, pic_URL, language))
        self.conn.commit()

    def get_tours(self):
        self.cursor.execute('SELECT * FROM tours')
        rows = self.cursor.fetchall()
        tours = [
            {"id": row[0], "tour_name": row[1], "pic_url": row[2], "language": row[3]}
            for row in rows
        ]
        return tours
    
    def update_tour(self, tour_id, tour_name, pic_URL, language):
        self.cursor.execute('''
            UPDATE tours
            SET tour_name = ?, pic_URL = ?, language = ?
            WHERE id = ?
        ''', (tour_name, pic_URL, language, tour_id))
        self.conn.commit()
        
    def delete_tour(self, tour_id):
        self.cursor.execute('DELETE FROM tours WHERE id = ?', (tour_id,))
        self.conn.commit()
    
    def close(self):
        self.conn.close()
    

     
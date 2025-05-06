from flask import Flask, request, jsonify
from DB_handler import DBHandler

class Server:
    def __init__(self):
        self.app = Flask(__name__)
        self.app.add_url_rule('/api/tours', 'index', self.index, methods=['GET'])
        self.app.add_url_rule('/api/submit-tour', 'submit', self.submit, methods=['POST', 'PUT', 'GET'])
        self.app.add_url_rule('/api/tours/<language>', 'get_tour_by_language', self.get_tour_by_language, methods=['POST', 'GET'])
        self.db_handler = DBHandler()

    def run(self):
        self.app.run(debug=True, port=5000)

    def index(self):
        # show the tours in the database
        tours = self.db_handler.get_tours()
        return jsonify(tours, 200)
    
    def get_tour_by_language(self, language):
        # get the language from the request
        print(language)
        if language is None:
            return jsonify({"error": "language is required"}), 400
        # show the tours in the database by language
        if language == 'all':
            tours = self.db_handler.get_tours()
        else:
            tours = self.db_handler.get_tour_by_language(language)
        return jsonify(tours, 200)

    def submit(self):
        data = request.get_json()
        tour_name = data.get('tour_name')
        if tour_name is None:
            return jsonify({"error": "tour_name is required"}), 400
        pic_URL = data.get('pic_URL')
        language = data.get('language')
        
        # Insert the data into the database
        self.db_handler.insert_tour(tour_name, pic_URL, language)
        return jsonify({"message": "Data submitted successfully!"}, 200)

if __name__ == '__main__':
    server = Server()
    server.run()
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://prelok:heslo@localhost/sensor_db'
db = SQLAlchemy(app)

# ORM model dat, vytvorena test databaza cez tento objekt
class SensorData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    CO2 = db.Column(db.Float, nullable=False)
    humidity = db.Column(db.Float, nullable=False)
    temperature = db.Column(db.Float, nullable=False)
    index = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.now)

@app.route('/postData', methods=['POST'])
def receive_data():
    data = request.get_json()
    new_entry = SensorData(
        CO2=float(data['CO2']),
        temperature=float(data['temperature']),
        humidity=float(data['humidity']),
        index=int(data['index'])
    )
    db.session.add(new_entry)
    db.session.commit()
    return jsonify({"message": "Data saved"}), 201

@app.route('/getData', methods=['GET'])
def get_data():
    start_date_str = request.args.get('startDate')
    end_date_str = request.args.get('endDate')

    if start_date_str and end_date_str:
        try:
            start_date = datetime.fromisoformat(start_date_str)
            stop_date = datetime.fromisoformat(end_date_str)
        except ValueError:
            return jsonify({'error': 'Invalid datetime format. Use ISO format (e.g., 2024-06-03T14:00:00)'}), 400
        
        if stop_date < start_date:
            return jsonify({'error': 'stopDate must be the same as or later than startDate'}), 400
        
        results = SensorData.query.filter(
            SensorData.timestamp >= start_date,
            SensorData.timestamp <= stop_date
        ).order_by(SensorData.timestamp.desc()).all()
    else:
        results = SensorData.query.order_by(SensorData.timestamp.desc()).limit(1).all()

    return jsonify([
        {
            'CO2': d.CO2,
            'temperature': d.temperature,
            'humidity': d.humidity,
            'index': d.index,
            'timestamp': d.timestamp.isoformat()
        } for d in results
    ])

if __name__ == '__main__':
    app.run(debug=True)
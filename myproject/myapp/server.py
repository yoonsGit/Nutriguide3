from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 모든 엔드포인트에 대해 CORS를 허용합니다.

@app.route('/users')
def users():
    return {"members": ["M1", "M2", "M3"]}

if __name__ == "__main__":
    app.run(debug=True)

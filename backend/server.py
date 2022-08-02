from flask import Flask
from flask import jsonify
from flask import request

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "memecatto"  # Change this!
jwt = JWTManager(app)


# members api route


@app.route("/api/members", methods=['GET'])
@jwt_required()
def members():
    return {"oof": "oof1", "oof2": "oof2"}


@app.route("/api/test-token", methods=['GET'])
def gen_token():
    access_token = create_access_token(identity="test-token")
    return jsonify(access_token=access_token)


if __name__ == "__main__":
    app.run(debug=True)

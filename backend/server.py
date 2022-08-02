import email
from flask import Flask
from flask import jsonify
from flask import request

from flask_jwt_extended import create_access_token, decode_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "memecatto"  # Change this!
app.config['UPLOADED_PHOTOS_DEST'] = "uploads"
jwt = JWTManager(app)


# members api route


@app.route("/api/members", methods=['GET'])
@jwt_required()
def members():
    # decodedToken=decode_token(request.headers.get('Authorization').split()[1])
    return jsonify(auth=True,
                   userName=get_jwt_identity(),)


@app.route("/api/test", methods=['POST'])
def test():
    if request.form.get('test'):
        return jsonify(request.form.get('test'))

    return "oof"


@app.route("/api/test-token", methods=['GET'])
def gen_token():
    access_token = create_access_token(identity="test-token")
    return jsonify(access_token="Bearer "+access_token)


@app.route("/api/google-auth", methods=['POST'])
def google_auth():
    email = request.form.get('email')
    access_token = create_access_token(identity=email)
    return jsonify(access_token="Bearer "+access_token)


@app.route("/api/verify-token", methods=['GET', "POST"])
@jwt_required()
def verify_token():
    return jsonify(auth=True,
                   userName=get_jwt_identity(),)


@app.route("/api/upload-image", methods=["POST"])
@jwt_required()
def upload_image():
    return jsonify("oof")


if __name__ == "__main__":
    app.run(debug=True)

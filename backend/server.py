from flask import Flask, send_file, send_from_directory, render_template
from flask import jsonify
from flask import request
import os

from flask_jwt_extended import create_access_token, decode_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from flask_cors import CORS

from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__, static_folder="./static", template_folder="./static",
            )
CORS(app)

limiter = Limiter(app, key_func=get_remote_address)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "memecatto"  # Change this!
app.config['UPLOAD_FOLDER'] = "uploads"
jwt = JWTManager(app)


@app.route('/')
def index_redir():
    # Reached if the user hits example.com/ instead of example.com/index.html
    return render_template('index.html')
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
    access_token = create_access_token(identity="test@token")
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
@limiter.limit("5/minute")
def upload_image():
    img = request.files["image"]
    img.save(os.path.join("./backend/uploads/", img.filename))
    return jsonify(f"/api/display-image/{img.filename}")


@app.route("/api/display-image/<filename>", methods=["get"])
def display_image(filename):

    return send_from_directory('uploads', filename)


@app.route("/api/list-files", methods=["get"])
def list_files():
    files = os.listdir("./backend/uploads/")
    return jsonify(files)


if __name__ == "__main__":
    app.run(debug=True)

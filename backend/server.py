from flask import Flask

app = Flask(__name__)

# members api route


@app.route("/members")
def members():
    return {"oof": "oof1", "oof2": "oof2"}


if __name__ == "__main__":
    app.run(debug=True)

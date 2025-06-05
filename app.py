# app.py
from flask import Flask, render_template, request
from github_api import fetch_repos

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    repos = []
    error = None
    username = ""
    sort = "updated"
    page = 1

    if request.method == "POST":
        username = request.form.get("username")
        sort = request.form.get("sort") or "updated"
        page = int(request.form.get("page") or 1)

        repos = fetch_repos(username, page, sort)
        if repos is None:
            error = "GitHub user not found or API error."

    return render_template("index.html", repos=repos, error=error,
                           username=username, sort=sort, page=page)

if __name__ == "__main__":
    app.run(debug=True)

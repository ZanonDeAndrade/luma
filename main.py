from flask import Flask, render_template


app = Flask (__nome__)

@app.route("/")
def homepage ():
    return render_template("app.tsx")


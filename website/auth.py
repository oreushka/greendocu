from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask_login import current_user, login_required, login_user, logout_user
from werkzeug.security import check_password_hash, generate_password_hash

from . import db
from .models import User

auth = Blueprint("auth", __name__)


@auth.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")

        # filter_by работает как то, что мы ищем всех пользователей в бд с данным email, first выводит первого юзера
        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                flash("Lodded in successfully", category="success")
                login_user(user, remember=True)
                redirect(url_for("views.home"))
            else:
                flash("Incorrect password", category="error")
        else:
            flash("email does not exist", category="error")

    return render_template("enter.html", text="Testing", user=current_user)


@auth.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("auth.login"))


@auth.route("/sign-up", methods=["GET", "POST"])
def sign_up():
    if request.method == "POST":
        email = request.form.get("email")
        first_name = request.form.get("firstName")
        password1 = request.form.get("password1")
        password2 = request.form.get("password2")
        print(email)
        print(first_name)
        print(password1)
        print(password2)
        user = User.query.filter_by(email=email).first()
        if user:
            flash("Hey, bro, user is already exist", category="error")
        elif len(email) < 4:
            flash("Email must be greater than 4 characters.", category="error")
        elif len(first_name) < 2:
            flash("firstName must be greater than 2 character.", category="error")

        elif password1 != password2:
            flash("Passwords don't match.", category="error")

        elif len(password1) < 6:
            flash("Password must be at least 6 characters.", category="error")

        else:
            # add user to database
            new_user = User(
                email=email,
                first_name=first_name,
                password=generate_password_hash(password1, method="sha256"),
            )
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            # а вот и строчечка запоминающая current_user
            flash(
                "Accout created! Let's say hello to this GreenDocu world!",
                category="success",
            )

            return redirect(url_for("views.home"))

    return render_template("registration.html", user=current_user)


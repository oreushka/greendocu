# -*- coding: utf-8 -*-
"""
Created on Wed Oct 13 21:16:39 2022

@author: artbo
"""

from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask_login import current_user, login_required, login_user, logout_user
from werkzeug.security import check_password_hash, generate_password_hash

from . import db
from .models import User, update_user_statistic, create_new_user

auth = Blueprint("auth", __name__)

@auth.route("/login", methods=["POST", "GET"])
def login_post():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")

        # filter_by работает как то, что мы ищем всех пользователей в бд с данным email, first выводит первого юзера
        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                flash("Lodded in successfully", category="success")
                login_user(user, remember=True)
                return redirect(url_for("views.profile"))
            else:
                flash("Incorrect password", category="error")
        else:
            flash("email does not exist", category="error")

    return render_template("enter.html", text="Testing", user=current_user)


@auth.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("auth.login_post"))


@auth.route("/sign-up", methods=["GET", "POST"])
def sign_up():
    if request.method == "POST":
        email = request.form.get("email")
        first_name = request.form.get("firstName")
        password1 = request.form.get("password1")
        password2 = request.form.get("password2")

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
            new_user = create_new_user(email=email, first_name = first_name,password =generate_password_hash(password1, method="sha256"))
            login_user(new_user, remember=True)
            # а вот и строчечка запоминающая current_user
            flash(
                "Accout created! Let's say hello to this GreenDocu world!",
                category="success",
            )

            return redirect(url_for("views.home"))

    return render_template("registration.html", user=current_user)

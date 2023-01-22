# -*- coding: utf-8 -*-
"""
Created on Wed Oct 13 21:16:55 2022

@author: artbo
"""

import json

from flask import Blueprint, flash, jsonify, redirect, render_template, request, url_for
from flask_login import current_user, login_required
from . import db
from .auth import *
from .greendocu_gen import make_matrix
from .models import *

views = Blueprint("views", __name__)


@views.route("/", methods=["GET", "POST"])
def home():
    return render_template("game.html", user=current_user)


@views.route("/game", methods=["GET", "POST"])
@login_required
def game():
    matrix = make_matrix(to_del=20)
    return render_template("game.html", user=current_user, matrix=json.dumps(matrix))


@views.route("/profile", methods=["GET", "POST"])
@login_required
def profile():
    users = User.query.order_by(User.id)
    win = request.args.get('win')
    if win:
        return render_template("profile.html", users=users, user=current_user, win=True)
        
    return render_template("profile.html", users=users, user=current_user, win=False)


@views.route("/make_matrix")
def create():
    matrix = make_matrix(to_del=2)
    return jsonify(matrix)


@views.route("/increase_victories", methods=["GET", "POST"])
def increase_victories():
    if current_user.is_anonymous:
        return redirect(url_for("views.home", user=None))

    update_user_statistic(victories_flag=True)
    return redirect(url_for("views.profile", user=current_user, win=True))


@views.route("/started_play", methods=["GET", "POST"])
def started_play():
    if current_user.is_anonymous:
        return redirect(url_for("views.home", user=None))
        
    update_user_statistic(games_flag=True)
    return redirect(url_for("views.home", user=current_user))


"""
Всё что идёт дальше - бред гения, или просто бред, в зависимости от работоспособности.
НАСТОЯТЕЛЬНО НЕ СОВЕТУЮ ЧТО-ЛИБО МЕНЯТЬ, ибо только я знаю, что в каком костыле используется.
Приятного чтения и поменьше крови из глаз.
"""

# -*- coding: utf-8 -*-
"""
Created on Wed Oct 13 21:16:55 2021

@author: artbo
"""

from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask_login import current_user, login_required

from . import db
from .models import *

views = Blueprint("views", __name__)


@views.route("/", methods=["GET", "POST"])
def home():
    return render_template("game.html", user=current_user)


@views.route("/game", methods=["GET", "POST"])
@login_required
def game():
    return render_template("game.html", user=current_user)


@views.route("/profile")
def profile():
    users = User.query.order_by(User.id)
    return render_template("profile.html", users=users, user=current_user)


"""
Всё что идёт дальше - бред гения, или просто бред, в зависимости от работоспособности.
НАСТОЯТЕЛЬНО НЕ СОВЕТУЮ ЧТО-ЛИБО МЕНЯТЬ, ибо только я знаю, что в каком костыле используется.
Приятного чтения и поменьше крови из глаз.
"""

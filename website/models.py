# -*- coding: utf-8 -*-
"""
Created on Wed Oct 13 21:16:38 2022

@author: artbo
"""
from flask_login import UserMixin, current_user
from sqlalchemy import func

from . import db

# А вот для отнощения многие ко многим нужно создавать отдельную таблицу.
# В неё можно добавлять записи просто путём обыкновенного append для списка
# И названием колонки в любом из таблиц.
# ingridient = Ingridient(name=ingr)
# new_resipe.ingridients_in_resipe.append(ingridient)
# db.session.commit()


class User(db.Model, UserMixin):  # UserMixin для пихания класса User в flask
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    first_name = db.Column(db.String(150))
    games = db.Column(db.Integer, default=0)
    victories = db.Column(db.Integer, default=0)
    # Note пишется с большой буквы так как мы пишем название класса в db.relationship
    # db.relationship испольхуется тогда,
    # когда мы должны настроить множественное отнощение( Один пользователь имеет много постов)
    rank = db.Column(db.Integer, db.ForeignKey("rank.id"), default=0)


class Rank(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    users_with_rank = db.relationship("User", backref="RankOfUser")


def create_new_user(email, password, first_name, id=-1, games=0, victories=0, rank=0):
    new_user = None
    if id == -1:
        new_user = User(email=email, first_name=first_name, password=password,)
    else:
        new_user = User(
            email=email,
            first_name=first_name,
            password=password,
            id=id,
            games=games,
            victories=victories,
            rank=rank,
        )
    db.session.add(new_user)
    db.session.commit()
    return new_user


def update_user_statistic(games_flag=False, victories_flag=False):
    id = current_user.id
    email = current_user.email
    password = current_user.password
    first_name = current_user.first_name
    games = current_user.games
    victories = current_user.victories
    rank = current_user.rank
    db.session.delete(current_user)
    db.session.commit()
    
    if games_flag:
        games = games + 1
    if victories_flag:
        victories = victories + 1

    new_user = create_new_user(
        email=email,
        first_name=first_name,
        password=password,
        id=id,
        games=games,
        victories=victories,
        rank=rank,
    )


# -*- coding: utf-8 -*-
"""
Created on Wed Oct 13 21:16:38 2021

@author: artbo
"""
from flask_login import UserMixin
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
    #notes = db.relationship("Note", backref="Owner")
    # favorite_resipes = db.relationship(
    #     "Resipe", secondary=Favorite_Resipes, backref="lovers"
    # )
    # favorite_nirn_resipes = db.relationship(
    #     "Nirn", secondary=Favorite_Nirn, backref="lovers"
    # )
    # filter_resipes = db.relationship(
    #     "Resipe", secondary=Filter_Resipes, backref="filters"
    # )


class Rank(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    users_with_rank = db.relationship("User", backref="RankOfUser")


# Favorite_Resipes = db.Table(
#     "favorite_user_resipes",
#     db.Column("User_id", db.Integer, db.ForeignKey("user.id")),
#     db.Column("Resipe_id", db.Integer, db.ForeignKey("resipe.id")),
# )


# Ingridients_In_Resipe = db.Table(
#     "ingridients_in_resipe",
#     db.Column("Resipe_id", db.Integer, db.ForeignKey("resipe.id")),
#     db.Column("Ingridient_id", db.Integer, db.ForeignKey("ingridient.id")),
# )

# Favorite_Nirn = db.Table(
#     "favorite_nirn",
#     db.Column("User_id", db.Integer, db.ForeignKey("user.id")),
#     db.Column("Nirn_id", db.Integer, db.ForeignKey("nirn.id")),
# )

# NirnIngridients_In_Resipe = db.Table(
#     "nirn_ingridients_in_resipe",
#     db.Column("Nirn_id", db.Integer, db.ForeignKey("nirn.id")),
#     db.Column("NirnIngridient_id", db.Integer, db.ForeignKey("nirn_ingridient.id")),
# )

# Filter_Resipes = db.Table(
#     "filter_user_resipes",
#     db.Column("User_id", db.Integer, db.ForeignKey("user.id")),
#     db.Column("Resipe_id", db.Integer, db.ForeignKey("resipe.id")),
# )


# class Note(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     data = db.Column(db.String(10000))
#     date = db.Column(db.DateTime(timezone=True), default=func.now())
#     #   user.id пишется с маленькой буквы, так как мы используем db.ForeignKey а в нём в названии класса большие буквы превращаются в маленькие
#     user_id = db.Column(db.Integer, db.ForeignKey("user.id"))


# class Resipe(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(150), default="Вкусный пирожочек")
#     # ingridients = db.Column(db.String(1500), default="Вкусный вкусный ингридиент!")
#     time = db.Column(db.Integer, default=20)
#     stepbystep = db.Column(db.String(10000), default="Вкусный вкусный ингридиент!")
#     quantity = db.Column(db.Integer, default=20)
#     image = db.Column(db.String(300))
#     lover_users = db.relationship(
#         "User", secondary=Favorite_Resipes, backref="favorite_resipe"
#     )
#     add_time = db.Column(db.DateTime(timezone=True), default=func.now())
#     ingridients_in_resipe = db.relationship(
#         "Ingridient", secondary=Ingridients_In_Resipe, backref=db.backref("used_resipe")
#     )
#     filter_user_resipes = db.relationship(
#         "User", secondary=Filter_Resipes, backref=db.backref("filtered_resipe")
#     )
#     amount = db.Column(db.Integer)


# class Nirn(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(150), default="Вкусный сладкий рулет!")
#     # ingridients = db.Column(db.String(1500), default="Вкусный вкусный ингридиент!")
#     time = db.Column(db.Integer, default=20)
#     stepbystep = db.Column(db.String(10000), default="Один из камней Борензии!")
#     quantity = db.Column(db.Integer, default=20)
#     image = db.Column(db.String(300))
#     lover_users = db.relationship(
#         "User", secondary=Favorite_Nirn, backref="favorite_resipe_nirn"
#     )
#     add_time = db.Column(db.DateTime(timezone=True), default=func.now())
#     ingridients_in_resipe = db.relationship(
#         "NirnIngridient",
#         secondary=NirnIngridients_In_Resipe,
#         backref=db.backref("used_resipe_nirn"),
#     )


# class NirnIngridient(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100))
#     resipe_where_use = db.relationship(
#         "Nirn", secondary=NirnIngridients_In_Resipe, backref="used_ingr_nirn"
#     )


# class Ingridient(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100))
#     resipe_where_use = db.relationship(
#         "Resipe", secondary=Ingridients_In_Resipe, backref="used_ingr"
#     )


# class Addon(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100))
#     what_is_it = db.Column(db.String(500))

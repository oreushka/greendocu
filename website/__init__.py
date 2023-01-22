from os import path

from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from.config import VERY_SECRET_KEY, DB_CONF, DB_NAME
db = SQLAlchemy()



def create_app():

    app = Flask(__name__)
    app.config["SECRET_KEY"] = VERY_SECRET_KEY
    app.config["SQLALCHEMY_DATABASE_URI"] = DB_CONF
    db.init_app(app)

    from .auth import auth
    from .views import views

    app.register_blueprint(views, url_prefix="/")
    app.register_blueprint(auth, url_prefix="/")

    from .models import User

    with app.app_context():
        if not path.exists("./" + DB_NAME):
            db.create_all()
            print("Created Database!")

    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = "auth.login_post"

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    return app


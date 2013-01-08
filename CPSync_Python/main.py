from flask import Flask
from app import *
from endpoints import *

# most WSGI servers start here
if __name__ == '__main__':
    app.run(debug=True)
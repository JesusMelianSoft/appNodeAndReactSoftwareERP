import sys
import os

print("*************************");
print("**Arrancando servicios***");
print("*************************");

os.system("ls ../")
def runMySqlApache(route):
    os.system(route)
    print("Base de datos arrancada!");

def runNodeServer(route):
    os.system(route)
    print("Servidor node arrancado");

runMySqlApache("sudo /opt/lampp/lampp start");
runNodeServer("node ../ApiRestServer/src/app.js");



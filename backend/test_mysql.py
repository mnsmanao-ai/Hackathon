import pymysql
import os

try:

    # Tentative de connexion

    connection = pymysql.connect(
        host=os.getenv('MYSQL_HOST'),
        user=os.getenv('MYSQL_USER'),
        password="#cfvPQcp%Fi2K0",
        database=os.getenv('MYSQL_DATABASE'),
        port=3306
    )
    print(f"Connexion réussie au serveur MySQL sur !")
except pymysql.MySQLError as e:
    print(f"Erreur lors de la connexion : {e}")
finally:
    if 'connection' in locals() and connection.open:
        connection.close()
        print("Connexion fermée.")
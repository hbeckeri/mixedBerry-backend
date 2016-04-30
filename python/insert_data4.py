from pymongo import MongoClient
import hashlib
import base64
import xlrd

class Client:
    def __init__(self, ip, port, db_name):
        self.ip = ip
        self.port = port
        self.db_name = db_name
        self.client = MongoClient(self.ip, self.port)

    def connectDB(self, collection_name):
        #client = MongoClient(self.ip, self.port)
        #db = client.ironhack
        db = self.client[self.db_name]
        collection = db[collection_name]
        #print collection.find_one()
        return collection
    def close(self):
        self.client.close()

client2 = Client("localhost", 27017, "iot")
collection = client2.connectDB("meth")


#output.xls
book1 = xlrd.open_workbook('methIndyData_indy.xlsx')
sh1 = book1.sheet_by_index(0)
for row in range(sh1.nrows):
    data = {
        "description": sh1.cell(rowx=row, colx=0).value,
        "address": sh1.cell(rowx=row, colx=1).value,
        "city": sh1.cell(rowx=row, colx=2).value,
        "county": sh1.cell(rowx=row, colx=3).value,
        "fips": sh1.cell(rowx=row, colx=4).value,
        "latitude": sh1.cell(rowx=row, colx=5).value,
        "longitude": sh1.cell(rowx=row, colx=6).value
    }
    collection.insert(data)

client2.close()

'''
'''

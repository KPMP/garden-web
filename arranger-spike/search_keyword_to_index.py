#!/usr/bin/env python2
from collections import OrderedDict
import json
import copy
import csv
import sys
import mysql.connector
import pprint
from dotenv import load_dotenv
import os
from argparse import ArgumentParser

load_dotenv()

mysql_user = os.environ.get('mysql_user')
mysql_pwd = os.environ.get('mysql_pwd')

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="arrangerdb",
    database="arranger"
)
mycursor = mydb.cursor(buffered=True,dictionary=True)

class IndexDoc:
    def __init__(self, keyword, bio_data_id, unique_id, search_keyword_id, data_category, source_code, display_data_category):
        self.keyword = keyword
        self.bio_data_id = bio_data_id
        self.unique_id = unique_id
        self.search_keyword_id = search_keyword_id
        self.data_category = data_category
        self.display_data_category = display_data_category

def get_index_update_json(id):
    return '{"update":{"_index":"search_keyword","_id":"' + str(id) + '"}}'

def get_index_doc_json(index_doc):
    return '{"doc":' + json.dumps(index_doc.__dict__) + ',"doc_as_upsert":true}'

query = ("SELECT * FROM search_keyword")

mycursor.execute(query)
row_num = 1
last_file_id = -1
for row in mycursor:
    index_doc = IndexDoc(row["keyword"], row["bio_data_id"], row["unique_id"], row["search_keyword_id"], row["data_category"], row["source_code"], row["display_data_category"])
    print(get_index_update_json(index_doc.search_keyword_id) + "\n" +
        get_index_doc_json(index_doc))
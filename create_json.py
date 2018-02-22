#!/usr/bin/env python3

import sys,os,csv
import json

wave = {}

with open("data.csv") as f:
    for line in csv.DictReader(f):
      print "{\"name\":\"\", \"Short Description\":\"\", \"Official Description\":\"\", \"connections\": [{\"name\":\"1.3\", \"weight\":", line["1.3"],"}," , \
            "{\"name\":\"1.5\", \"weight\":", line["1.5"],"},", \
            "{\"name\":\"2.2\", \"weight\":", line["2.2"],"},", \
            "{\"name\":\"2.4\", \"weight\":", line["2.4"],"},", \
            "{\"name\":\"3.4\", \"weight\":", line["3.4"],"},", \
            "{\"name\":\"3.8\", \"weight\":", line["3.8"],"},", \
            "{\"name\":\"4.1\", \"weight\":", line["4.1"],"},", \
            "{\"name\":\"4.4\", \"weight\":", line["4.4"],"},", \
            "{\"name\":\"5.4\", \"weight\":", line["5.4"],"},", \
            "{\"name\":\"5.5\", \"weight\":", line["5.5"],"},", \
            "{\"name\":\"6.5\", \"weight\":", line["6.5"],"},", \
            "{\"name\":\"6.6\", \"weight\":", line["6.6"],"},", \
            "{\"name\":\"7.2\", \"weight\":", line["7.2"],"},", \
            "{\"name\":\"7.3\", \"weight\":", line["7.3"],"},", \
            "{\"name\":\"8.4\", \"weight\":", line["8.4"],"},", \
            "{\"name\":\"8.5\", \"weight\":", line["8.5"],"},", \
            "{\"name\":\"9.4\", \"weight\":", line["9.4"],"},", \
            "{\"name\":\"9.5\", \"weight\":", line["9.5"],"},", \
            "{\"name\":\"10.1\", \"weight\":", line["10.1"],"},", \
            "{\"name\":\"10.7\", \"weight\":", line["10.7"],"},", \
            "{\"name\":\"11.1\", \"weight\":", line["11.1"],"},", \
            "{\"name\":\"11.2\", \"weight\":", line["11.2"],"},", \
            "{\"name\":\"12.1\", \"weight\":", line["12.1"],"},", \
            "{\"name\":\"12.5\", \"weight\":", line["12.5"],"},", \
            "{\"name\":\"13.1\", \"weight\":", line["13.1"],"},", \
            "{\"name\":\"13.2\", \"weight\":", line["13.2"],"},", \
            "{\"name\":\"14.1\", \"weight\":", line["14.1"],"},", \
            "{\"name\":\"14.4\", \"weight\":", line["14.4"],"},", \
            "{\"name\":\"15.2\", \"weight\":", line["15.2"],"},", \
            "{\"name\":\"15.5\", \"weight\":", line["15.5"],"},", \
            "{\"name\":\"16.4\", \"weight\":", line["16.4"],"},", \
            "{\"name\":\"16.6\", \"weight\":", line["16.6"],"},", \
            "{\"name\":\"17.11\", \"weight\":", line["17.11"],"},", \
            "{\"name\":\"17.13\", \"weight\":", line["17.13"],"}]},"
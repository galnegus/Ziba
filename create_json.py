#!/usr/bin/env python3
from __future__ import print_function
import sys,os,csv
import json

wave = {}

with open("data.csv") as f:
      for line in csv.DictReader(f):
            # if (line["1.3"] != "0"):
            #       print (line["1.3"], ", ", end='')
            print ("{\"name\":\"\", \"Short Description\":\"\", \"Official Description\":\"\", \"connections\": [", end='')
            if (line["1.3"] != "0"): print( "{\"name\":\"1.3\", \"weight\":", line["1.3"],"}," , end='')
            if (line["1.5"] != "0"): print( "{\"name\":\"1.5\", \"weight\":", line["1.5"],"},", end='')
            if (line["2.2"] != "0"): print( "{\"name\":\"2.2\", \"weight\":", line["2.2"],"},",  end='')
            if (line["2.4"] != "0"): print( "{\"name\":\"2.4\", \"weight\":", line["2.4"],"},",  end='')
            if (line["3.4"] != "0"): print( "{\"name\":\"3.4\", \"weight\":", line["3.4"],"},",  end='')
            if (line["3.8"] != "0"): print( "{\"name\":\"3.8\", \"weight\":", line["3.8"],"},", end='')
            if (line["4.1"] != "0"): print( "{\"name\":\"4.1\", \"weight\":", line["4.1"],"},", end='')
            if (line["4.4"] != "0"): print( "{\"name\":\"4.4\", \"weight\":", line["4.4"],"},", end='')
            if (line["5.4"] != "0"): print( "{\"name\":\"5.4\", \"weight\":", line["5.4"],"},", end='')
            if (line["5.5"] != "0"): print( "{\"name\":\"5.5\", \"weight\":", line["5.5"],"},", end='')
            if (line["6.5"] != "0"): print( "{\"name\":\"6.5\", \"weight\":", line["6.5"],"},", end='')
            if (line["6.6"] != "0"): print( "{\"name\":\"6.6\", \"weight\":", line["6.6"],"},", end='')
            if (line["7.2"] != "0"): print( "{\"name\":\"7.2\", \"weight\":", line["7.2"],"},", end='')
            if (line["7.3"] != "0"): print( "{\"name\":\"7.3\", \"weight\":", line["7.3"],"},", end='')
            if (line["8.4"] != "0"): print( "{\"name\":\"8.4\", \"weight\":", line["8.4"],"},", end='')
            if (line["8.5"] != "0"): print( "{\"name\":\"8.5\", \"weight\":", line["8.5"],"},", end='')
            if (line["9.4"] != "0"): print( "{\"name\":\"9.4\", \"weight\":", line["9.4"],"},", end='')
            if (line["9.5"] != "0"): print( "{\"name\":\"9.5\", \"weight\":", line["9.5"],"},", end='')
            if (line["10.1"] != "0"): print( "{\"name\":\"10.1\", \"weight\":", line["10.1"],"},", end='')
            if (line["10.7"] != "0"): print( "{\"name\":\"10.7\", \"weight\":", line["10.7"],"},", end='')
            if (line["11.1"] != "0"): print( "{\"name\":\"11.1\", \"weight\":", line["11.1"],"},", end='')
            if (line["11.2"] != "0"): print( "{\"name\":\"11.2\", \"weight\":", line["11.2"],"},", end='')
            if (line["12.1"] != "0"): print( "{\"name\":\"12.1\", \"weight\":", line["12.1"],"},", end='')
            if (line["12.5"] != "0"): print( "{\"name\":\"12.5\", \"weight\":", line["12.5"],"},", end='')
            if (line["13.1"] != "0"): print( "{\"name\":\"13.1\", \"weight\":", line["13.1"],"},", end='')
            if (line["13.2"] != "0"): print( "{\"name\":\"13.2\", \"weight\":", line["13.2"],"},", end='')
            if (line["14.1"] != "0"): print( "{\"name\":\"14.1\", \"weight\":", line["14.1"],"},", end='')
            if (line["14.4"] != "0"): print( "{\"name\":\"14.4\", \"weight\":", line["14.4"],"},", end='')
            if (line["15.2"] != "0"): print( "{\"name\":\"15.2\", \"weight\":", line["15.2"],"},", end='')
            if (line["15.5"] != "0"): print( "{\"name\":\"15.5\", \"weight\":", line["15.5"],"},", end='')
            if (line["16.4"] != "0"): print( "{\"name\":\"16.4\", \"weight\":", line["16.4"],"},", end='')
            if (line["16.6"] != "0"): print( "{\"name\":\"16.6\", \"weight\":", line["16.6"],"},", end='')
            if (line["17.11"] != "0"): print( "{\"name\":\"17.11\", \"weight\":", line["17.11"],"},", end='')
            if (line["17.13"] != "0"): 
                  print( "{\"name\":\"17.13\", \"weight\":", line["17.13"],"}]," )
            else:
                  print("}],\n")
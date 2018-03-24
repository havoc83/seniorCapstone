#!/bin/bash

cd ~/workspace
tar -czf brewCityRentals.tar.gz brewCityRentals/
scp brewCityRentals.tar.gz jrhavlik@uwmsois.com:. 
ssh jrhavlik@uwmsois.com "tar -xzf brewCityRentals.tar.gz && rm brewCityRentals.tar.gz"
rm brewCityRentals.tar.gz

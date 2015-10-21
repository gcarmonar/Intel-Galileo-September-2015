#!/bin/bash

# Declare gpio40 as output (Arduino pin 8)
# 1. Export gpio40
echo -n "40" > /sys/class/gpio/export
# 2. Set gpio7 as output
echo -n "out" > /sys/class/gpio/gpio40/direction

for i in `seq 1 10`;
do
	# Print
    echo $i
    # Turn ON
	echo -n "1" > /sys/class/gpio/gpio40/value
	sleep 1
	# Turn OFF
	echo -n "0" > /sys/class/gpio/gpio40/value
	sleep 1
done

echo -n "40" > /sys/class/gpio/unexport
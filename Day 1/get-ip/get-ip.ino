/*
 * Arduino-Linux-get-ip.ino
 * 
 * Author: Gerardo Carmona
 * Webpage: www.makeroboticsprojects.com
 * Date: July, 2015
 * 
 * About:
 * Use this code to get your Intel Galileo
 * IP addresss by printing it to the serial
 * monitor.
 * 
 * Licence:
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <phk@FreeBSD.ORG> wrote this file.  As long 
 * as you retain this notice you can do whatever 
 * you want with this stuff. If we meet some day, 
 * and you think this stuff is worth it, you can 
 * buy me a beer in return.
 */


void setup() {
  // Init serial com
  Serial.begin(9600);
  // Waits 5 seconds before printing it again
  delay(5000);
  // Gets network interface info and sends 
  // it through the serial interface
  system("ifconfig > /dev/ttyGS0");
}
 
void loop() {
  

  
}

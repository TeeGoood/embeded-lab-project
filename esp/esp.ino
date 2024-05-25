#include <SoftwareSerial.h>
EspSoftwareSerial::UART testSerial;
void setup() {
  testSerial.begin(115200, EspSoftwareSerial::SWSERIAL_8N1, D7, D8, false);
  Serial.begin(9600);
}
void loop() {
  while (testSerial.available() > 0) {
    String buf = testSerial.readString();
    Serial.println(buf);
    testSerial.println("BoomHee");
  }
}
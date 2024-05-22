#include <ESP8266WiFi.h>
#include <PubSubClient.h>

#include <SoftwareSerial.h>
EspSoftwareSerial::UART testSerial;

const char* ssid = "Tee";
const char* password = "iloveyou";
const char* mqtt_server = "broker.netpie.io";
const int mqtt_port = 1883;
const char* mqtt_Client = "ac8d58ce-75f5-46f0-87dc-e092dfe74a4b";
const char* mqtt_username = "VtZPBn1E3vuiU3mHGu7SeRyWELiF9cp8";
const char* mqtt_password = "ypvdVFSe7Mz6SfwLwPGi8JfS8dZMxpAX";

WiFiClient espClient;
PubSubClient client(espClient);

long lastMsg = 0;
int value = 0;

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection…");
    if (client.connect(mqtt_Client, mqtt_username, mqtt_password)) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println("try again in 5 seconds");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  testSerial.begin(115200, EspSoftwareSerial::SWSERIAL_8N1, D7, D8, false);
  
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  client.setServer(mqtt_server, mqtt_port);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  while (testSerial.available() > 0) {
    // byte buf[31];
    String myString = testSerial.readString();
    client.publish("@msg/test", String(myString).c_str());
    Serial.println(myString);
  }
  // long now = millis();
  // if (now - lastMsg > 2000) {
  //   lastMsg = now;
  //   ++value;
  //   client.publish("@msg/test", "Hello NETPIE2020");
  //   Serial.println("Hello NETPIE2020");
  // }
  delay(10);
}

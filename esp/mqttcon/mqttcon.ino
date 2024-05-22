#include <ESP8266WiFi.h>
#include <PubSubClient.h>

#include <SoftwareSerial.h>
EspSoftwareSerial::UART testSerial;

const char* ssid = "Kittikun";
const char* password = "65309416";
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
      client.subscribe("@msg/switch");
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
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Handle Sensor data from STM32
  while (testSerial.available() > 0) {
    char *words[4];
    char delimiters[] = " ";

    String myString = testSerial.readString();
    char * data = new char[myString.length()];
    strcpy(data, myString.c_str() );

    splitString(data, delimiters, words);

    char dto[55];
    sprintf(dto, "{ \"data\" : { \"sensor1\" : %s, \"sensor2\" : %s } }", words[1], words[3]);

    client.publish("@shadow/data/update", dto);
    client.publish("@msg/test", myString.c_str());

    delete[] data;
  }
  // testSerial.write("Hell");
  // Serial.println("Hell");
  // delay(1000);
}

void sendDataFromSerial(uint8_t msg) {
  testSerial.write(msg);
}

void readDataFromSerial() {
  while (testSerial.available() > 0) {
    String income = testSerial.readString();
    Serial.print(income);
    yield();
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  String msg = "";
  int i = 0;
  while (i < length) msg += (char)payload[i++];
  
  Serial.println(msg);
  testSerial.write(msg.c_str());
}

void splitString(char* str, char* delimiters, char* resultArray[]) {
  char* token = strtok(str, delimiters);
  int index = 0;

  while (token != NULL) {
    resultArray[index] = token; // Store the token in the result array
    index++;sw``
    token = strtok(NULL, delimiters); // Get the next token
  }
}
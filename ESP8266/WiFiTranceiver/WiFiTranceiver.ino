#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include "DHT.h"

#ifndef STASSID
#define STASSID "Ultron"
#define STAPSK  "cr7njJzhJqnj"
#endif

#define DHTPIN 0
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

String serverName = "http://192.168.0.100:8080/data/";

String updateRooms = "rooms/update";
String getRoomLights = "lights?room_name=";
String getLight = "&name=";

String nodeName = "Room_A";
const char* ledNames[] = {"Led_A"};
int loraNodes = 1;

unsigned long lastTime = 0;
unsigned long timerDelay = 2000;


void setup(){
  Serial.begin(115200);
  Serial.println();

  WiFi.begin(STASSID, STAPSK);

  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }
  Serial.println();

  Serial.print("Connected, IP address: ");
  Serial.println(WiFi.localIP());

  dht.begin();
}

void updateInfo(){
  // try to parse packet
    //Send an HTTP POST request every 10 minutes
    //Check WiFi connection status
  if(WiFi.status()== WL_CONNECTED){
    WiFiClient client;
    HTTPClient http;

    String url = serverName + updateRooms;
    // Your Domain name with URL path or IP address with path
    http.begin(client, url);
    Serial.println(url);

    // Specify content-type header
    http.addHeader("Content-Type", "application/json");

    // Prepare JSON document
    DynamicJsonDocument doc(2048);

    float h = dht.readHumidity();
    float t = dht.readTemperature();
    
    doc["data"] = "\n temp: " + String(t) + "\n humd: " + String(h) + "\nname: " + nodeName;
    //String datos = "'name':'" + nodeName + "', 'temp':" + String(t) + ", 'humd':" + String(h);
    
    // Serialize JSON document
    String json;
    serializeJson(doc, json);
    Serial.print(json);
    // Data to send with HTTP POST
    String httpRequestData = {};           
    // Send HTTP POST request
    int httpResponseCode = http.PUT(json);
   
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
      
    // Free resources
    http.end();
  }
  else {
    Serial.println("WiFi Disconnected");
  }
}

void getInfo(){
  HTTPClient http;
  WiFiClient client;  

  String url = serverName + getRoomLights + nodeName + getLight + ledNames[0];
  
  http.begin(client, url);
  Serial.println(url);
  int httpResponseCode = http.GET();
  
  String payload = "{}"; 
  
  if (httpResponseCode>0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    payload = http.getString();
    Serial.println(payload);
  }
  else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  http.end();

  String state = getValue(getValue(payload, ':', 4), ',', 0);
  Serial.println(state);
}

void loop(){
  delay(500);
  updateInfo();
  delay(500);
  getInfo();
}

String getValue(String data, char separator, int index){
    int found = 0;
    int strIndex[] = { 0, -1 };
    int maxIndex = data.length() - 1;

    for (int i = 0; i <= maxIndex && found <= index; i++) {
        if (data.charAt(i) == separator || i == maxIndex) {
            found++;
            strIndex[0] = strIndex[1] + 1;
            strIndex[1] = (i == maxIndex) ? i+1 : i;
        }
    }
    return found > index ? data.substring(strIndex[0], strIndex[1]) : "";
}

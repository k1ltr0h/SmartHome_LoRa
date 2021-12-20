#include "heltec.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#define BAND    915E6  //you can set band here directly,e.g. 868E6,915E6

String getValue(String data, char separator, int index);

const char* ssid = "Ultron";
const char* password = "cr7njJzhJqnj";
String serverName = "http://192.168.0.100:8080/data/";

String updateRooms = "rooms/update";

const char* loraNodes_names[] = {"Balcony"};
const char* leds_names[] = {"Led_puerta"};
int loraNodes = 1;
String getRoomLights = "lights?room_name=";

unsigned long lastTime = 0;
unsigned long timerDelay = 2000;

void setup() {
    //WIFI Kit series V1 not support Vext control
  Heltec.begin(true /*DisplayEnable Enable*/, true /*Heltec.LoRa Disable*/, true /*Serial Enable*/, true /*PABOOST Enable*/, BAND /*long BAND*/);

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
 
  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
}

void receiver_httpPut() {
  // try to parse packet
  int packetSize = LoRa.parsePacket();
  //Serial.println("o.o\n" + (String)packetSize);
  if (packetSize) {
    // received a packet
    Serial.print("Received packet '");
    // read packet
    String str;
    while (LoRa.available()) {
      str += (char)LoRa.read();
    }
    Serial.print(str);
    Heltec.display -> clear();
    Heltec.display -> drawString(0, 0, str);
    Heltec.display -> display();
    // print RSSI of packet
    Serial.print("' with RSSI ");
    Serial.println(LoRa.packetRssi());

    //Send an HTTP POST request every 10 minutes
    //Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED){
      WiFiClient client;
      HTTPClient http;
    
      // Your Domain name with URL path or IP address with path
      http.begin(client, serverName + updateRooms);
      Serial.println(serverName + updateRooms);

      // Specify content-type header
      http.addHeader("Content-Type", "application/json");

      // Prepare JSON document
      DynamicJsonDocument doc(2048);
      doc["data"] = str;
      
      // Serialize JSON document
      String json;
      serializeJson(doc, json);
      Serial.print(json);
      // Data to send with HTTP POST
      String httpRequestData = {};           
      // Send HTTP POST request
      int httpResponseCode = http.PUT(json);
      
      // If you need an HTTP request with a content type: application/json, use the following:
      //http.addHeader("Content-Type", "application/json");
      //int httpResponseCode = http.POST("{\"api_key\":\"tPmAT5Ab3j7F9\",\"sensor\":\"BME280\",\"value1\":\"24.25\",\"value2\":\"49.54\",\"value3\":\"1005.14\"}");

      // If you need an HTTP request with a content type: text/plain
      //http.addHeader("Content-Type", "text/plain");
      //int httpResponseCode = http.POST("Hello, World!");
     
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
        
      // Free resources
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
  }
    //Serial.println("por fin\n");
}

void send_httpGet(){
  for(int i=0; i<loraNodes; i++){
    HTTPClient http;    
    http.begin(serverName + getRoomLights + loraNodes_names[i]);
    Serial.println(serverName + getRoomLights + loraNodes_names[i]);
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
    
    delay(10);
    LoRa.beginPacket();
    LoRa.setTxPower(14,RF_PACONFIG_PASELECT_PABOOST);
    for(int i=0; i < loraNodes; i++){
      LoRa.print("\nName: ");
      LoRa.print(loraNodes_names[i]);
      LoRa.print("\nLed_name: ");
      LoRa.print(leds_names[i]);
      LoRa.print("\nState: ");
      LoRa.print(state);
    }
    LoRa.endPacket();
    Serial.println("LoRa packet sended.");
    //digitalWrite(25, HIGH);   // turn the LED on (HIGH is the voltage level)
    //delay(1000);                       // wait for a second
    //digitalWrite(25, LOW);    // turn the LED off by making the voltage LOW
    //delay(1000); 
  }
}

void loop(){
  lastTime = millis();
  while ((millis() - lastTime) < timerDelay) {
    receiver_httpPut();
  }
  lastTime = millis();
  while ((millis() - lastTime) < timerDelay) {
    send_httpGet();
  }
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

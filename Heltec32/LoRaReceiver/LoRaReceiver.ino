#include "heltec.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#define BAND    915E6  //you can set band here directly,e.g. 868E6,915E6

const char* ssid = "VTR-1498496";
const char* password = "***";
String serverName = "http://192.168.0.100:8080/data/update";
unsigned long lastTime = 0;
unsigned long timerDelay = 10000;

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

void loop() {
  // try to parse packet
  int packetSize = LoRa.parsePacket();
  
  if (packetSize) {
    // received a packet
    Serial.print("Received packet '");
    // read packet
    int iter = 0;
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
    if ((millis() - lastTime) > timerDelay) {
      //Check WiFi connection status
      if(WiFi.status()== WL_CONNECTED){
        WiFiClient client;
        HTTPClient http;
      
        // Your Domain name with URL path or IP address with path
        http.begin(client, serverName);
  
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
        int httpResponseCode = http.POST(json);
        
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
      lastTime = millis();
    }
  }
}

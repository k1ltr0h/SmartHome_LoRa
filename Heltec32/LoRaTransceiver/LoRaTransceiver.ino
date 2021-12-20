#include "heltec.h"
#include "DHT.h"

#define DHTPIN 0
#define DHTTYPE DHT11
#define BAND    915E6  //you can set band here directly,e.g. 868E6,915E6

//int counter = 0;
int RelayPin = 32;
bool leds_states[] = {true};
String leds_names[] = {"Led_puerta"};
int leds = sizeof(leds_states) / sizeof(bool);

unsigned long lastTime = 0;
unsigned long timerDelay = 1000;

DHT dht(DHTPIN, DHTTYPE);

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

void setup() {
  
  //WIFI Kit series V1 not support Vext control
  Heltec.begin(true /*DisplayEnable Enable*/, true /*Heltec.LoRa Disable*/, true /*Serial Enable*/, true /*PABOOST Enable*/, BAND /*long BAND*/);
  dht.begin();
  pinMode(RelayPin, OUTPUT);
  digitalWrite(RelayPin, HIGH);
  
}

void receive(){
  // try to parse packet
  int packetSize = LoRa.parsePacket();
  //Serial.println(packetSize);
  if (packetSize) {
    // received a packet
    Serial.print("Received packet '");
    // read packet
    String str;
    while (LoRa.available()) {
      str += (char)LoRa.read();
    }
    Serial.print(str);
    String led_name = getValue(getValue(getValue(str, '\n', 2), ':', 1), ' ', 1);
    String state_data = getValue(getValue(getValue(str, '\n', 3), ':', 1), ' ', 1);
    int state = 0;
    Serial.println("\n" + state_data + "\n");
    if(state_data == "false"){
      state = 0;
    }
    else{
      state = 1;
    }
    //Serial.println(leds_states[0]);
    //Serial.println(state);
    for(int i=0; i<leds; i++){
      if(leds_names[i] == led_name){
        //Serial.println("Nombres iguales");
        if(leds_states[i] != state){
           Serial.println("Switch");
           leds_states[i] = state;
           digitalWrite(RelayPin, !state);
           Serial.println("Estado de luz actualizada: " + (String)state);
        }
      }
    }
    // print RSSI of packet
    Serial.print("' with RSSI ");
    Serial.println(LoRa.packetRssi());
  }
}

void send(){

  //delay(2000);
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (isnan(h) || isnan(t)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    delay(2000);
    return;
  }
  
  Serial.print("\nSending packet: ");
  Serial.println("Humidity: " + (String)h);
  Serial.println("Temperature: "+ (String)t);
  // send packet
  delay(10);
  LoRa.beginPacket();
/*
* LoRa.setTxPower(txPower,RFOUT_pin);
* txPower -- 0 ~ 20
* RFOUT_pin could be RF_PACONFIG_PASELECT_PABOOST or RF_PACONFIG_PASELECT_RFO
*   - RF_PACONFIG_PASELECT_PABOOST -- LoRa single output via PABOOST, maximum output 20dBm
*   - RF_PACONFIG_PASELECT_RFO     -- LoRa single output via RFO_HF / RFO_LF, maximum output 14dBm
*/
  LoRa.setTxPower(14,RF_PACONFIG_PASELECT_PABOOST);
  //LoRa.print("Mensaje:  ");
  //LoRa.print(counter);
  LoRa.print(" \nTemperature: ");
  LoRa.print(t);
  LoRa.print("\nHumidity: ");
  LoRa.print(h);
  LoRa.print("\nName: Balcony");
  LoRa.endPacket();
  
  //digitalWrite(25, HIGH);   // turn the LED on (HIGH is the voltage level)
  //delay(500);                       // wait for a second
  //digitalWrite(25, LOW);    // turn the LED off by making the voltage LOW
  //delay(500);                       // wait for a second
}

void loop(){
  //send();
  lastTime = millis();
  while ((millis() - lastTime) < timerDelay*2) {
    //Serial.println((String)(millis() - lastTime));
    receive();
  }
  lastTime = millis();
  while ((millis() - lastTime) < timerDelay) {
    //Serial.println((String)(millis() - lastTime));
    send();
  }
  
}

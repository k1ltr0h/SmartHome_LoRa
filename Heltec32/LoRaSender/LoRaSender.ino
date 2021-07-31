#include "heltec.h"
#include "DHT.h"

#define DHTPIN 0
#define DHTTYPE DHT11
#define BAND    915E6  //you can set band here directly,e.g. 868E6,915E6

int counter = 0;
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  
  //WIFI Kit series V1 not support Vext control
  Heltec.begin(true /*DisplayEnable Enable*/, true /*Heltec.LoRa Disable*/, true /*Serial Enable*/, true /*PABOOST Enable*/, BAND /*long BAND*/);
  dht.begin();
  
}

void loop() {

  //delay(2000);
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (isnan(h) || isnan(t)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    delay(2000);
    return;
  }
  
  Serial.print("Sending packet: ");
  Serial.println(counter);
  Serial.println("Humedad: " + (String)h);
  Serial.println("Temperatura: "+ (String)t);
  // send packet
  LoRa.beginPacket();
/*
* LoRa.setTxPower(txPower,RFOUT_pin);
* txPower -- 0 ~ 20
* RFOUT_pin could be RF_PACONFIG_PASELECT_PABOOST or RF_PACONFIG_PASELECT_RFO
*   - RF_PACONFIG_PASELECT_PABOOST -- LoRa single output via PABOOST, maximum output 20dBm
*   - RF_PACONFIG_PASELECT_RFO     -- LoRa single output via RFO_HF / RFO_LF, maximum output 14dBm
*/
  LoRa.setTxPower(17,RF_PACONFIG_PASELECT_PABOOST);
  //LoRa.print("Mensaje:  ");
  //LoRa.print(counter);
  LoRa.print(" \nTemperatura: ");
  LoRa.print(t);
  LoRa.print("\nHumedad: ");
  LoRa.print(h);
  LoRa.endPacket();
  
  counter++;
  digitalWrite(25, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(1000);                       // wait for a second
  digitalWrite(25, LOW);    // turn the LED off by making the voltage LOW
  delay(1000);                       // wait for a second
}

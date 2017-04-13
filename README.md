# Module: MMM-temp-ds18b20
Display DS18B20 sensor's temperature on your [MagicMirror](https://github.com/MichMich/MagicMirror) 

![DS18B20 visualisation](https://github.com/Thlb/MMM-temp-ds18b20/blob/gh-pages/.github/screenshot-01.png?raw=true)

![DS18B20 visualisation](https://github.com/Thlb/MMM-temp-ds18b20/blob/gh-pages/.github/screenshot-02.png?raw=true) ![DS18B20 visualisation](https://github.com/Thlb/MMM-temp-ds18b20/blob/gh-pages/.github/screenshot-03.png?raw=true)

# Module installation
## Dependencies
- An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
- [ds18x20](http://npmjs.com/package/ds18x20)
- And of course, have DS18B20 sensor(s) !

## Useful commands

List DS18B20 sensors IDs:

```bash
find /sys/bus/w1/devices/ -name "28-*"
```


Get DS18B20 sensors temperatures:

```bash
find /sys/bus/w1/devices/ -name "28-*" -exec cat {}/w1_slave \; | grep "t=" | awk -F "t=" '{print $2/1000}'
```


## Installation

Navigate into your MagicMirror's `modules` folder:
```bash
cd ~/MagicMirror/modules
```

Clone this repository:
```bash
git clone https://github.com/thlb/MMM-temp-ds18b20
```

Navigate to the new `MMM-temp-ds18b20` folder and install the node dependencies.
```bash
npm install
```

Configure the module in your `config.js` file.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:

```javascript
modules: [
   {
       module: 'MMM-temp-ds18b20',
       position: 'top_right',
       header: 'Temperature sensors',
       config: {
            refreshInterval: 10, // in seconds
            displayMode: 'x-stack',
            sensors:[
                {
                    id: "28-800000xxxxxx",
                    label: "Inside"
                },
                {
                    id: "28-800000xxxxxx",
                    label: "Outside"
                }
            ]
        }
    },
]

```

## Configuration options

The sensors property contains an array with multiple objects (one per sensor connected the Raspberry). These objects have the following properties:

| Option                       | Description
| ---------------------------- | -----------
| `id`                         | Unique ID of a DS18B20 sensor. This ID always beggin with '28-'.<br><br>To find the sensor value, go to "Useful commands" section.<br><br>**Required**<br>**Possible values:** `28-XXXXXXXXXXXX`
| `label`                      | Sensor name.<br><br>**Required**<br>**Possible values:** `Inside`, `Kitchen`, or any String you want.


The following properties can be configured:

| Option                       | Description
| ---------------------------- | -----------
| `refreshInterval`            | The refresh interval of sensors values (in seconds).<br><br>**Default value:** `10`
| `displayMode`                | Display in horizontal/vertical mode.<br><br>**Required**<br>**Possible values:** `x-stack` or `y-stack`<br>**Default value:** `y-stack`
| `displayTempIcon`            | Display the "termomether" icon.<br><br>**Possible values:** `true` or `false`<br>**Default value:** `true`	 
| `iconSize`                   | Size of thermometer icon.  <br><br>**Possible values:** `xsmall`, `small`, `medium`, `large`, `xlarge`<br>**Default value:** `small`
| `labelSize`                  | Size of sensor name. <br><br>**Possible values:** `xsmall`, `small`, `medium`, `large`, `xlarge`<br>**Default value:** `medium`
| `tempSize`                   | Display sensor's temperature value.<br><br>**Possible values:** `xsmall`, `small`, `medium`, `large`, `xlarge`<br>**Default value:** `medium`
| `units`                      | What units to use. Specified by config.js<br><br>**Possible values:** `config.units` = Specified by config.js, `default` = Kelvin, `metric` = Celsius, `imperial` = Fahrenheit<br>**Default value:** `config.units`


# DS18B20 Installation

## Requirements
* Raspberry
* DS18B20 sensor(s)
* 4.7kΩ resistor (Yellow, Violet, Red, Gold)
* Breadboard (optionnal)
* Jumper wires (optionnal)

## Foreword
The DS18B20 communicates with the controlling device via the “One-Wire” communication protocol, a proprietary serial communication protocol that uses only one wire to transmit the temperature reading to the microcontroller. There is differents models :

* [DS18B20+](https://www.modmypi.com/electronics/sensors/ds18b20-one-wire-digital-temperature-sensor/) : Genuine
* [DS18B20](https://www.modmypi.com/electronics/sensors/waterproof-ds18b20-digital-temperature-sensor--plus-extras/) :  Pre-wired and waterproofed version

###Technical specifications :

* -55°C to 125°C range 
* 3.0V to 5.0V operating voltage
* 750 ms sampling
* 0.5°C (9 bit); 0.25°C (10 bit); 0.125°C (11 bit); 0.0625°C (12 bit) resolution
* 64 bit unique address
* One-Wire communication protocol

## DS18B20 Layout

This sensor has three pins :

| PIN                       | DS18B20+ Genuine          | DS18B20 Pre-wired waterproof
| --------------------------| --------------------------| --------------------------|
| GND                       | PIN 1 (Cf. diagram below) | Black wire
| DATA                      | PIN 2 (Cf. diagram below) | Yellow or Blue wire
| 3.3V power line           | PIN 3 (Cf. diagram below) | Red wire


![DS18B20+ Diagram](https://github.com/Thlb/MMM-temp-ds18b20/blob/gh-pages/.github/DS18B20P-diagram.png?raw=true)



## Hardware installation

1. Power off the Raspberry.
2. Follow this diagram :

![DS18B20+ Diagram](https://github.com/Thlb/MMM-temp-ds18b20/blob/gh-pages/.github/DS18B20-diagram.png?raw=true)

## Using multiples sensors

Plug multiples sensors on the Raspberry is very easy. With multiples sensors, we still only have three connections to the Raspberry (+3.3V, GND & Data). The single data wire will return the temperature readings from all th sensors. This is possible because each DS18B20 sensor has a unique serial number coded into it which the Raspberry Pi can be used to identify them by.

![DS18B20 Multiple Diagram](https://github.com/Thlb/MMM-temp-ds18b20/blob/gh-pages/.github/DS18B20-mutliple-diagram.png?raw=true)

## Raspberry configuration

Edit file <code>/boot/config.txt</code> and add the following line :

```
dtoverlay=w1-gpio
```

Load the drivers :

```bash
sudo modprobe w1-gpio
sudo modprobe w1-therm
```

Edit file <code>/etc/modules</code> and add the following lines to auto-load drivers on boot :

```
w1-therm
w1-gpio
```

Check that sensors are well recognized by the Raspberry :

```bash
find /sys/bus/w1/devices/ -name "28-*"
```
You should see as many lines as sensors plugged. Note that the part <code>28-xxxxxxxxxxxx</code> is the ID of the sensor.

Now, if you want to check the temperatures value af all your sensors :

```
find /sys/bus/w1/devices/ -name "28-*" -exec cat {}/w1_slave \; | grep "t=" | awk -F "t=" '{print $2/1000}'
```

Finnaly, perform a <code>sudo reboot</code> of your Raspberry to check the proper load of the driver on boot. If the previous command still works, the drivers are correctly loaded.

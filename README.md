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

<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>

		<tr>
			<td><code>id</code></td>
			<td>Unique ID of a DS18B20 sensor. This ID always beggin with '28-'.
				<br>
				<br>
				To find the sensor value, go to "Useful commands" section.
				<br>
				<br>
				<b>Required</b>
				<br>
				<b>Possible values:</b> <code>28-XXXXXXXXXXXX</code>
			</td>
		</tr>
		
		<tr>
			<td><code>label</code></td>
			<td>Sensor name.
				<br>
				<br>
				<b>Required</b>
				<br>
				<b>Possible values:</b> <code>Inside</code>, <code>Kitchen</code>, or any String you want.
			</td>
		</tr>

	</tbody>
</table>



The following properties can be configured:

<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>

		<tr>
			<td><code>displayMode</code></td>
			<td>Display in horizontal/vertical mode.
				<br>
				<br>
				<b>Required</b>
				<br>
				<b>Possible values:</b> <code>x-stack</code> or <code>y-stack</code>
				<br>
				<b>Default value:</b> <code>y-stack</code>
			</td>
		</tr>
		
		<tr>
			<td><code>displayTempIcon</code></td>
			<td>Display the "termomether" icon.
				<br>
				<br>
				<b>Possible values:</b> <code>true</code> or <code>false</code>
				<br>
				<b>Default value:</b> <code>true</code>			</td>
		</tr>

		<tr>
			<td><code>iconSize</code></td>
			<td>Size of thermometer icon.  
				<br>
				<br>
				<b>Possible values:</b> <code>xsmall</code>, <code>small</code>, <code>medium</code>, <code>large</code>, <code>xlarge</code>
				<br>
				<b>Default value:</b> <code>small</code>
			</td>
		</tr>

		<tr>
			<td><code>labelSize</code></td>
			<td>Size of sensor name. 
				<br>
				<br>
				<b>Possible values:</b> <code>xsmall</code>, <code>small</code>, <code>medium</code>, <code>large</code>, <code>xlarge</code>
				<br>
				<b>Default value:</b> <code>medium</code>
			</td>
		</tr>
    
		<tr>
			<td><code>tempSize</code></td>
			<td>Display sensor's temperature value.
				<br>
				<br>
				<b>Possible values:</b> <code>xsmall</code>, <code>small</code>, <code>medium</code>, <code>large</code>, <code>xlarge</code>
				<br>
				<b>Default value:</b> <code>medium</code>
			</td>
		</tr>
	</tbody>
</table>

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

<table width="100%">
    <!-- why, markdown... -->
    <thead>
        <tr>
            <th>PIN</th>
            <th>DS18B20+ Genuine</th>
            <th>DS18B20 Pre-wired waterproof</th>
        </tr>
    <thead>
    <tbody>
        <tr>
            <th>GND</th>
            <td>PIN 1 (Cf. diagram below)</td>
            <td>Black wire</td>
        </tr>
        <tr>
            <th>DATA</th>
            <td>PIN 2 (Cf. diagram below)</td>
            <td>Yellow or Blue wire</td>
        </tr>
        <tr>
            <th>3.3V power line</th>
            <td>PIN 3 (Cf. diagram below)</td>
            <td>Red wire</td>
        </tr>
    </tbody>
</table>

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


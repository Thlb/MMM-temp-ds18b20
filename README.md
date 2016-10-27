# Module: MMM-temp-ds18b20
Display DS18B20 sensor's temperature on your [MagicMirror](https://github.com/MichMich/MagicMirror) 

![DS18B20 visualisation](https://github.com/thlb/MMM-tem-ds18b20/blob/gh-pages/.github/screenshot-01.png)

## Dependencies
- An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
- [ds18x20](http://npmjs.com/package/ds18x20)
- And of course, have DS18B20 sensor(s) !

## Useful commands

List DS18B20 sensors IDs:

```
find /sys/bus/w1/devices/ -name "28-*"
```


Get DS18B20 sensors temperatures:

```
find /sys/bus/w1/devices/ -name "28-*" -exec cat {}/w1_slave \; | grep "t=" | awk -F "t=" '{print $2/1000}'
```


## Installation

Navigate into your MagicMirror's `modules` folder:
```
cd ~/MagicMirror/modules
```

Clone this repository:
```
git clone https://github.com/thlb/MMM-temp-ds18b20
```

Navigate to the new `MMM-temp-ds18b20` folder and install the node dependencies.
```
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

The sensors property contains an array with multiple objects (one per sensor connected the raspberry). These objects have the following properties:

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

## Hardware installation diagram

![Hardware installation](https://github.com/thlb/MMM-tem-ds18b20/blob/gh-pages/.github/DS18B20-diagram.png)
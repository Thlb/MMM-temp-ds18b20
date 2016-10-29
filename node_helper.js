/* Magic Mirror
 * Node Helper: MMM-temp-ds18b20
 *
 * npm : https://www.npmjs.com/package/ds18x20
 * MIT Licensed.
 */
 
var NodeHelper = require("node_helper");
var Sensor = require('ds18x20');
var util = require('util');

 module.exports = NodeHelper.create({
	 	consolePrefix: 'MMM-temp-ds18b20 : ',
		
        start: function function_name () {
			"use strict";
			this.initialized = false;
        },
	
	socketNotificationReceived: function(notification, payload){
		"use strict";
		var self = this;
		
		// Get configuration
		if(notification === 'DS18B20-INITIALIZE'){
			this.config = payload;
		}
		
		if(!this.initialized){
			// Check driver loaded (modprobe w1-gpio && modprobe w1-therm)
			var isLoaded = Sensor.isDriverLoaded();
			
			// If not loaded : error notification
			if(!isLoaded){
				console.error(self.consolePrefix + 'Error : DRIVER-NOT-LOADED');
				self.sendSocketNotification('DS18B20-ERROR', 'DRIVER-NOT-LOADED');
			}
			else{
				// If loaded : check sensor values
				 setInterval(function() {
					self.sendTemperature();
                }, self.config.refreshInterval * 1000);
			}	
			this.initialized = true;
		}
		
		
	},

	sendTemperature: function() {
		"use strict";
		var self = this;
		var listSensors = Sensor.getAll();
		var value;
		
		// For each sensor referenced in config
		for(var i in this.config.sensors){
			value = null;
			
			// If sensor id is plugged : ok : get value
			if(listSensors[this.config.sensors[i].id]){
				value = Sensor.get(this.config.sensors[i].id);
			}
			else{
				// Sensor not found : maybe bad id
				console.error(self.consolePrefix + 'Error: sensor ' + this.config.sensors[i].id + ' not found');	
			}
			this.config.sensors[i].value = self.formatTempValue(value);
		} 
		
		self.sendSocketNotification('DS18B20-VALUES', this.config.sensors);
	},
	
	formatTempValue: function(value){
		"use strict";
		var self = this;
		
		switch(true){
			case (value === null):
				return 'N/A';
			
			// Kelvin
			case (self.config.units === 'default'):
				return parseFloat(value + 273.15).toFixed(1) + " K";	
			
			// Fahrenheit
			case (self.config.units === 'imperial'):
				return parseFloat((value * 1.8) + 32).toFixed(1) + "&deg;";	
				
			// Celsius
			case (self.config.units === 'metric'):
				return parseFloat(value).toFixed(1) + "&deg;";
				
			default :
				return parseFloat(value).toFixed(1);
		}
				
	}
	
 });
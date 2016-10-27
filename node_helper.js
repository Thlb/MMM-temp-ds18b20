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
        start: function function_name () {
			"use strict";
			this.initialized = false;
        },
	
	socketNotificationReceived: function(notification, payload){
		"use strict";
		var self = this;
		
		if(!this.initialized){
			// Check driver loaded (modprobe w1-gpio && modprobe w1-therm)
			var isLoaded = Sensor.isDriverLoaded();
			
			if(!isLoaded){
				console.error('Erreur : DRIVER-NOT-LOADED');
				self.sendSocketNotification('DS18B20-ERROR', 'DRIVER-NOT-LOADED');
			}
			else{
				 setInterval(function() {
					self.sendTemperature();
                }, 60000);
			}	
			this.initialized = true;
		}
		
		if(notification === 'DS18B20-CONFIG'){
			this.config = payload;
		}
	},

	sendTemperature: function() {
		"use strict";
		var self = this;
		var listSensors = Sensor.getAll();
		var value;
		
		for(var i in this.config.sensors){
			value = null;
			
			if(listSensors[this.config.sensors[i].id]){
				value = Sensor.get(this.config.sensors[i].id);
			}
			else{
				console.error('Erreur: sensor ' + this.config.sensors[i].id + ' not found');	
			}
			this.config.sensors[i].value = (!value) ? 'N/A' : (parseFloat(value).toFixed(1) + "&deg;");
		} 
		
		self.sendSocketNotification('DS18B20-VALUES', this.config.sensors);
	}
 });
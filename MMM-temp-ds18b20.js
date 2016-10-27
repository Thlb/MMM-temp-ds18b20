/* Magic Mirror
 * Module: MMM-temp-ds18b20
 *
 * MIT Licensed.
 */
 
 Module.register('MMM-temp-ds18b20', {

	defaults: {
	displayMode: 'y-stack',
	displayTempIcon: true,
	iconSize: 'small',
	labelSize: 'medium',
	tempSize: 'medium'
	},
	
	getStyles: function() {
		"use strict";
		return ["font-awesome.css", "MMM-temp-ds18b20.css"];
	},

	start: function() {
		"use strict";
		this.message = this.translate('LOADING');
		this.sendSocketNotification('DS18B20-CONFIG', this.config);
	},

	socketNotificationReceived: function(notification, data) {
		"use strict";
		
		switch(notification){
			case 'DS18B20-VALUES':
				this.message = null;
				this.config.sensors = data;
				this.updateDom();
			break;
			
			case 'DS18B20-ERROR':
				switch(data){
					case 'DRIVER-NOT-LOADED':
						
						this.message = 'Error : driver not loaded (w1-gpio & w1-therm)';
					break;
				}
				this.updateDom();
			break;	
		}
		
	},

	// Override dom generator.
	getDom: function() {
		"use strict";
		var wrapper = document.createElement("div");
		var table = document.createElement("table");
		var row;
		var sensor;
		
		// If message/error : display & exit
		if(this.message){
			wrapper.className = 'dimmed light small';
			wrapper.innerHTML = this.message;
			return wrapper;
		}
		
		var labelCell;
		
		// Horizontal mode
		if(this.config.displayMode === 'x-stack'){
			var percent = 100 / this.config.sensors.length;
			var rowLabels = document.createElement("tr");
			rowLabels.className = "light";
			table.appendChild(rowLabels);
	
			for(var s in this.config.sensors){
				sensor = this.config.sensors[s];
				
				labelCell = document.createElement("td");
				labelCell.className = "x-label " + this.config.labelSize + ' w-' + percent;
				labelCell.innerHTML = sensor.label; 	
				rowLabels.appendChild(labelCell);
				
			}
	
			row = document.createElement("tr");
			row.className = "light";
			table.appendChild(row);
			
		}
		// Vertical mode
		for(var s in this.config.sensors){		
			sensor = this.config.sensors[s];
			
			if(this.config.displayMode === 'y-stack'){
				row = document.createElement("tr");
				row.className = "light";
				table.appendChild(row);
			}
			
			if(this.config.displayMode === "y-stack"){
				labelCell = document.createElement("td");
				labelCell.className = "align-right " + this.config.labelSize;
				labelCell.innerHTML = sensor.label;
				row.appendChild(labelCell);
			}
	
			var tempCell = document.createElement("td");
			if(this.config.displayMode === "y-stack"){
				tempCell.className = "align-right bright " + this.config.tempSize;
			}
			else{
				tempCell.className = "bright " + this.config.tempSize;
			}
			
			// Display thermometer icon
			if(this.config.displayTempIcon){
				tempCell.innerHTML = '<i class="' + this.config.iconSize + ' dimmed wi wi-thermometer"></i>       ';
			}
			
			tempCell.innerHTML += sensor.value;
			row.appendChild(tempCell);
		}
		
		wrapper.appendChild(table);
		return wrapper;
	}

});
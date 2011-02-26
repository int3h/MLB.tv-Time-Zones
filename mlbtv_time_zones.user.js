// ==UserScript==
// @name           MLB.tv Time Zones
// @namespace      mtvz
// @description    Modifies the times listed on the MLB.tv media center to have times in Pacific Time, instead of Eastern Time
// @include        http://mlb.mlb.com/mediacenter/*
// ==/UserScript==

var time_differential = -3;
var time_header = 'Time PST';

var mgTimes = document.evaluate("//*[@class='mmg_time']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = mgTimes.snapshotLength - 1; i >= 0; i--) {
 var elem = mgTimes.snapshotItem(i);
	
	var time_parts = new Array();
	
	// Check to make sure if this is a time cell
	if(elem.innerHTML.indexOf(':') == -1) {
		// If not, is this the header?
		if(elem.innerHTML.indexOf('ET') != -1) {
			elem.innerHTML = time_header;
		}
		continue;
	}
	
	// Break up the time cell into its component parts
	time_parts =  elem.innerHTML.split(':');
	hour = time_parts[0] * 1;
	m_ampm = time_parts[1].split(' ');
	minutes = m_ampm[0];
	ampm = m_ampm[1];
	
	hour = hour + time_differential;
	
	if(hour < 1) {
		hour = hour + 12;
		
		 // Switch am/pm when we cross the 12 hour barrier
		if(hour != 12) {	// Don't change am/pm for noon times
			if(ampm == 'AM') {
				ampm = 'PM';
			} else {
				ampm = 'AM';
			}
		}
	}
	
	elem.innerHTML = hour.toString() + ':' + minutes + ' ' + ampm;
}
var pollInterval = 1000 * 60; // 1 minute, in milliseconds
var timerId;

var tab_title = ["facebook","google","yahoo"];
var tab_time = ["1 mins","12 mins", "10 mins"];


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	
    if (request.message == "hello"){
      sendResponse({s_tab_title: tab_title,s_tab_time:tab_time,done:"yes"});
    
    }
    
  });



chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
     //  	tab_title[tab_title.length] = tabs.url;
   		// tab_time[tab_time.length] = "a mins";
});

chrome.tabs.onCreated.addListener(function(tab) {
	//	tab_title[tab_title.length] = "created";
   //		tab_time[tab_time.length] = "t mins";

 });

 chrome.tabs.onUpdated.addListener(function(tab) {

   	
});

chrome.tabs.onActivated.addListener(function(tabId, changeInfo, tab){
		tab_title[tab_title.length] = "act";
   		tab_time[tab_time.length] = "a mins";
 
});

function startRequest() {
	tabs();
	timerId = window.setTimeout(startRequest, pollInterval);
}

function stopRequest() {
	window.clearTimeout(timerId);
}
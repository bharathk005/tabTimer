var pollInterval = 1000 * 60; // 1 minute, in milliseconds
var timerId;

var tab_title = ["facebook","google","yahoo"];
var tab_time = ["1 mins","12 mins", "10 mins"];


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	
    if (request.message == "hello")
    {
      sendResponse({s_tab_title: tab_title,s_tab_time:tab_time,done:"yes"});
    }
    else if(request.message == "reset")
    {

      sendResponse({r_tab_title: tab_title});
       tab_title = [];
       tab_time = [];
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
	chrome.tabs.getSelected(null,function(tab) {
    var tablink = tab.url;
    var domain;
    if (tablink.indexOf("://") > -1) {
        tablink = tablink.split('/')[2];
    }
    else {
        tablink = tablink.split('/')[0];
    }
    //find & remove port number
    tablink = tablink.split(':')[0];

    if(tablink.indexOf("www.")>-1)
    tablink = tablink.split("www.")[1];

	if(tab_title.indexOf(tablink)>-1){}
	else 
	{
    	tab_title[tab_title.length] = tablink;
   		tab_time[tab_time.length] = "a mins";
   	}
});
 
});

function startRequest() {
	tabs();
	timerId = window.setTimeout(startRequest, pollInterval);
}

function stopRequest() {
	window.clearTimeout(timerId);
}
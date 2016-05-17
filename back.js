var pollInterval = 1000 * 10; // in milliseconds
var timerId;

var tab_title = [];
var tab_time = [];
var currtab = 0;
var oldtab = 0;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	
    if (request.message == "hello")
    {
      sendResponse({s_tab_title: tab_title,s_tab_time:tab_time});
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

	 chrome.tabs.onUpdated.addListener(function(tab) {

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
	if(tablink.indexOf(".")>-1)
    tablink = tablink.split(".")[0];
	
	if(tablink != "newtab")
	{
	if(tab_title.indexOf(tablink)>-1)
	{	
		stopRequest();
		currtab = tab_title.indexOf(tablink);
		startRequest();
	}
	else 
	{
    	tab_title[tab_title.length] = tablink;
   		tab_time[tab_time.length] = 0;
   		currtab = tab_title.lengt-1;
   		stopRequest();
   		startRequest();
   	}
   }
});



   	
});
	

});



chrome.tabs.onActivated.addListener(function(tabId, changeInfo, tabs){
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
	if(tablink.indexOf(".")>-1)
    tablink = tablink.split(".")[0];
	
	if(tablink != "newtab")
	{
	if(tab_title.indexOf(tablink)>-1)
	{	
		stopRequest();
		currtab = tab_title.indexOf(tablink);
		startRequest();
	}
	else 
	{
    	tab_title[tab_title.length] = tablink;
   		tab_time[tab_time.length] = 0;
   		currtab = tab_title.lengt-1;
   		stopRequest();
   		startRequest();
   	}
   }
});
 
});

function tabUpdate(){
		tab_time[currtab] += 0.17;
}

function startRequest() {
	timerId = window.setInterval(tabUpdate, pollInterval);
}

function stopRequest() {
	window.clearInterval(timerId);
}
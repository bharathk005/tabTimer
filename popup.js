window.addEventListener('load',function(){
	document.getElementById('bt1').addEventListener("click",reset);
	
	//var view;
	//view = chrome.extension.getBackgroundPage();

	disp();

});


var rCol = ["#4d79ff","#ffff1a","#809fff","#ffff4d","#b3c6ff","#ffff80","#e6ecff","#ffffb3"];
var rColCount = 0;
var change =1; 

function disp()
{
	chrome.runtime.sendMessage({message: "hello"}, function(response) {
  			
		var tab_title = response.s_tab_title;
		var tab_time = response.s_tab_time;
		if(response.done == "yes") 
		{
		for(var j = 0;j<=tab_title.length-1;j++)
			{
				var page = document.createTextNode(tab_title[j]);
				var td1 = document.createElement("td");
				td1.appendChild(page);

				var dur = document.createTextNode(tab_time[j]);
				var td2 = document.createElement("td");
				td2.appendChild(dur);

				var tr = document.createElement("tr");
				tr.setAttribute("id",tab_title[j]);
				tr.setAttribute("bgcolor",rCol[rColCount]);
				rColCount += change;
				if(rColCount >= rCol.length-1){change = -1;}
				else if (rColCount <=0) {change = 1;}
				tr.appendChild(td1);
				tr.appendChild(td2);

				var table = document.getElementById('tb1');
				table.appendChild(tr); 
			}
		}
		else 
		{
				var page = document.createTextNode("not done");
				var td1 = document.createElement("td");
				td1.appendChild(page);

				var dur = document.createTextNode("not done");
				var td2 = document.createElement("td");
				td2.appendChild(dur);

				var tr = document.createElement("tr");
				tr.setAttribute("id",tab_title[j])
				tr.appendChild(td1);
				tr.appendChild(td2);

				var table = document.getElementById('tb1');
				table.appendChild(tr);
		}

	});

}

function reset()
{
	
	var table = document.getElementById("tb1");
	for(var j = 0;j<=tab_title.length-1;j++)
	{
	var row = document.getElementById(tab_title[j]);
	//table.removeChild(row);
	row.parentNode.removeChild(row);
	}
	
	tab_title = [];
	tab_time = [];
	disp();
}

function tabs()
{
	
}



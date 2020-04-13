
var table=document.querySelector("#t1");
var table1=document.querySelector("#t2");
var input=document.getElementById("search");
var search=document.getElementById("searching");
var toggle=document.getElementById("toggle");
var searchdiv=document.getElementById("searchon");
var charts=document.getElementById("charts");
console.log(input);
var tabledata=[];
var table1data=[];
var timedata=[];
var countrypoints=[];
window.onload = function() {
    var dataPoints = [];

    function getDataPointsFromCSV(json) {

        for (var i = 0; i < json.statewise.length; i++)
            { if(parseFloat(json.statewise[i].active)>0)
              {
                dataPoints.push({
                    y: parseFloat(json.statewise[i].active),
                    label: json.statewise[i].state
                });
              }

            }

        return dataPoints;
    }

jQuery.get("https://api.covid19india.org/data.json", function(data) {
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled:true,
    dataPointWidth:5,
    theme:"light2",
    axisX:{
      interval:1,
      labelAngle:-70
    },
    title: {
         text: "Current Status",
    },
    data: [{
         type: "column",
         dataPoints: getDataPointsFromCSV(data)
      }]
   });

    chart.render();
    //chart.set("dataPointWidth",Math.ceil(chart.axisX[0].bounds.width/chart.data[0].dataPoints.length),true);
});

}
function generatetable(table1,tabledata1)
{

  for(var i=0;i<tabledata1.length;i++)
 {
     var row=table1.insertRow();
     for(var key in tabledata1[i])
   { var cell=row.insertCell();
     var text=document.createTextNode(tabledata1[i][key]);
     cell.appendChild(text);
   }
 }
}

jQuery.get("https://api.rootnet.in/covid19-in/stats/latest", function(data) {
     filltabledata(data);
    //chart.set("dataPointWidth",Math.ceil(chart.axisX[0].bounds.width/chart.data[0].dataPoints.length),true);
});
$.get("https://corona.lmao.ninja/all",function(data){
  filltabledata1(data);
})
$.get("https://pomber.github.io/covid19/timeseries.json",function(data){
  for(var i in data)
  { var name=i;
    timedata.push({country: i,
      data: data[i]});
  }
  console.log(timedata);
});
function filltabledata(file)
{
  var data=file.data;
  for(var i=0;i<data.regional.length;i++)
  {
    tabledata.push({
      state:data.regional[i].loc,
      current:parseFloat(data.regional[i].totalConfirmed),
      dischared:data.regional[i].discharged,
      deaths:data.regional[i].deaths,


    });
  }
  tabledata.push({

      state:"Total",
      current:data.summary.total,
      discharged:data.summary.discharged,
      deaths:data.summary.deaths

  });
  
 generatetable(table,tabledata);
}
function filltabledata1(data)
{
   table1data.push(
     {
       Active:data.cases,
        Recent:data.todayCases,
        RecentDeaths:data.todayDeaths,
        TotalDeaths:data.deaths,
        Critical:data.critical,
        countries:data.affectedCountries
     }

   );
  generatetable(table1,table1data);
}
search.addEventListener("click",function(){
  ser(input.value);
});
function ser(text)
{ var counter=0;
  for(var i=0;i<timedata.length;i++)
  {
    if(text === timedata[i].country)
    {
      console.log(timedata[i]);
      createdataset(timedata[i].data);
      break;
    }
    counter++;
  }
  if(counter == timedata.length)
  {
    console.log("no data found");
  }
}
function createdataset(data)
{ var counter=1;
  countrypoints=[];
  console.log(data);
  for(var i=0;i<data.length;i++)
  {
    if(parseFloat(data[i].confirmed)>0)
    {
      console.log("in if");
      countrypoints.push(
        {
          x:counter,
          y:parseFloat(data[i].confirmed),
          label:data.date
        }
      );
      counter++;
    }
  }
  console.log(countrypoints);
  var chart1=new CanvasJS.Chart("livechart",{
    animationEnabled:true,
    theme:"light2",
    title:{
      text:"Date wise status",
    },
    data:[{
      type:"line",
      dataPoints:countrypoints
    }]
  });
   chart1.render();
}
toogle.addEventListener("click",function(){
   charts.classList.toggle("togglesearch");
   searchdiv.classList.toggle("togglesearch");
});

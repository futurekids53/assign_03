var citys = ['基隆','台北','新北市','桃園','新竹','苗栗','台中','彰化','雲林','南投','嘉義','台南','高雄','屏東','台東','花蓮','宜蘭',];

var subcity = {};
subcity['基隆']=['七堵',];
subcity['台北']=['內湖','新店',];
subcity['新北市']=['淡水','鶯歌','金山','三芝','萬里','雙溪',];
subcity['桃園']=['大園','中壢','觀音','龍潭','桃園機場',];
subcity['新竹']=['東區',];
subcity['苗栗']=['三灣',];
subcity['台中']=['西屯','石岡','清水','新社','大甲',];
subcity['彰化']=['彰化市','二林','鹿港',];
subcity['雲林']=['斗南','虎尾',];
subcity['南投']=['南投市',];
subcity['嘉義']=['布袋',];
subcity['台南']=['安平','佳里','麻豆','新化','玉井',];
subcity['高雄']=['左營','岡山','高雄機場',];
subcity['屏東']=['屏東市','東港','枋山',];
subcity['台東']=['台東市','關山',];
subcity['花蓮']=['花蓮市',];
subcity['宜蘭']=['宜蘭市','蘇澳','南澳',];

var cityNum = {};
cityNum['七堵'] = 2306188;
cityNum['內湖'] = 2306179;
cityNum['新店'] = 2306186;
cityNum['淡水'] = 2306211;
cityNum['鶯歌'] = 2306214;
cityNum['金山'] = 2306223;
cityNum['三芝'] = 2306228;
cityNum['萬里'] = 2306231;
cityNum['雙溪'] = 2306251;
cityNum['大園'] = 2306209;
cityNum['中壢'] = 2306184;
cityNum['觀音'] = 2306200;
cityNum['龍潭'] = 2306202;
cityNum['桃園機場'] = 2306254;
cityNum['東區'] = 2306185;
cityNum['三灣'] = 2306229;
cityNum['西屯'] = 2306181;
cityNum['石岡'] = 2306207;
cityNum['清水'] = 2306194;
cityNum['新社'] = 2306218;
cityNum['大甲'] = 2306210;
cityNum['彰化市'] = 2306183;
cityNum['二林'] = 2306195;
cityNum['鹿港'] = 2306201;
cityNum['斗南'] = 2306212;
cityNum['虎尾'] = 2306250;
cityNum['南投市'] = 2306204;
cityNum['布袋'] = 2306206;
cityNum['安平'] = 2306182;
cityNum['佳里'] = 2306193;
cityNum['麻豆'] = 2306203;
cityNum['新化'] = 2306217;
cityNum['玉井'] = 2306232;
cityNum['左營'] = 2306180;
cityNum['岡山'] = 2306199;
cityNum['高雄機場'] = 2306255;
cityNum['屏東市'] = 2306189;
cityNum['東港'] = 2306213;
cityNum['枋山'] = 2306224;
cityNum['台東市'] = 2306190;
cityNum['關山'] = 2306227;
cityNum['花蓮市'] = 2306187;
cityNum['宜蘭市'] = 2306198;
cityNum['蘇澳'] = 2306208;
cityNum['南澳'] = 2306243;

var init = function(){

	var cityArray1 = [];
	for (var i in cityNum){
		cityArray1.push('<div class="btn btn-link" id='+cityNum[i]+">"+i+"</div>");
	};

	$("#func1").append(cityArray1);

	var cityArray2 = [];
	for (var j in citys){
		cityArray2.push("<option>"+citys[j]+"</option>");


	};

	$("#box1").append(cityArray2);
  $('#box1').ready( function(e) {

      var chosen = $(this).find(':selected').text();
      var newOption = [];
      var first = subcity[chosen][0];
      var woeid = cityNum[first]; 

      for(var i in subcity[chosen]) {
        newOption.push('<option>'+subcity[chosen][i]+'</option>');
      }

      $('#box2').children().remove();
      $('#box2').append(newOption);
      updateWeather(woeid);
    });

};

var updateWeather = function(woeid) {
    var query = 'select * from weather.forecast where woeid=' + woeid;
    var url = 'http://query.yahooapis.com/v1/public/yql?format=json&q=' + query;
	
    	$.getJSON(url,{},
    		function(data,status){
    			console.log("data",data);
    			console.log("status",status);

    		  var item = data['query']['results']['channel']['item'];
      		var title = item['title'];
      		var location = item['lat']+','+item['long'];
      		var date = item['pubDate'];
      		var temp = item['condition']['temp'];
      		var text = item['condition']['text'];
    	
    		$("#return #title").text(title);
    		$("#return #location").text(location);
    		$("#return #temp").text(temp+'℉');
    		$("#return #text").text(text);
      	$("#return #date").text(date);

      		console.log(title, date, location, temp, text);

    		}
    	);
    };

    $('#func1').on('click', 'div.btn.btn-link', function(e) {
      console.log(e.target.id);
      var woeid = e.target.id;
      updateWeather(woeid);
   	});

   	$('#box1').change( function(e) {

  		var chosen = $(this).find(':selected').text();
  		var newOption = [];
  		var first = subcity[chosen][0];
  		var woeid = cityNum[first]; 

  		for(var i in subcity[chosen]) {
    		newOption.push('<option>'+subcity[chosen][i]+'</option>');
  		}

  		$('#box2').children().remove();
  		$('#box2').append(newOption);
  		updateWeather(woeid);
  	});

  	$('#box2').change( function(e) {
  		var chosen = $(this).find(':selected').text();
  		var woeid = cityNum[chosen];
  		updateWeather(woeid);
      console.log(box2)
  	});



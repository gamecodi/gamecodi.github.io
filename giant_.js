(function() {
  var jq = document.createElement('script'); jq.type = 'text/javascript'; jq.async = false;
	jq.src = '//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(jq, s);
 
 	var giant_gamecodi = function(){

 		var giant_name = jQuery("#giant-name").val() || "진격의 고양이";
 		var giant_hp = parseInt(jQuery("#giant-hp").val()) || 730666;

 		var giant_image = jQuery("#giant-image-path").val() ? jQuery.parseJSON(jQuery("#giant-image-path").val()) : ["http://rack.2.mshcdn.com/media/ZgkyMDEyLzA3LzAyLzExXzM0XzA4XzcwMF9maWxlCnAJdGh1bWIJODUweDU5MD4KZQlqcGc/c5c888af.jpg"];
 		var giant_image_lose = jQuery("#giant-image-lose-path").val() ? jQuery.parseJSON(jQuery("#giant-image-lose-path").val()) : ["http://www.funnythreat.com/funny_animals/images/clean-shoes-5.jpg"];

 		var result = get_dice_result();

 		init_giant(giant_name, giant_hp);

 		var record;
 		var current_hp = giant_hp;
 		var is_loop = true;

 		if(result == false)
 		{
 			is_loop = false;
 		}

 		while(is_loop){
 			if(result.length == 0) break;;
 			record = result.shift();
 			current_hp = current_hp - record.dice_num;
 			if(current_hp <= 0){
	 			insert_record(record, "last");
	 			is_loop = false;
 			}else{
	 			insert_record(record, "attack");
 			}
 			update_giant_hp(current_hp, giant_hp);
 		};

 		if(current_hp <= 0)
 		{
 			jQuery.shuffle(giant_image_lose);
 			jQuery("<img>").attr("src",giant_image_lose[0]).appendTo(jQuery("#giant-image"));
 		}
 		else
 		{
 			jQuery.shuffle(giant_image);
 			jQuery("<img>").attr("src",giant_image[0]).appendTo(jQuery("#giant-image"));
 		}
 	};

 	var update_giant_hp = function(current_hp, giant_hp){
 		if(current_hp < 0) current_hp = 0;
 		jQuery("#giant-hp strong").html(current_hp);
 		jQuery("#giant-hp-bar div").css("width", current_hp / giant_hp * 100 + "%");
 	};

 	var insert_record = function(rec, method){
 		var name = rec.username;
 		var dice_num = rec.dice_num;
 		var log = jQuery("<div>").css("margin","10px").html("<img src='/dice_20130617.gif' border='0'> <strong>"+rec.username+"</strong>의 공격! <strong style='color:red;'>"+dice_num+"</strong>의 데미지를 입혔다!").prependTo(jQuery("#giant-log"));
 		if(method == "last"){
 			jQuery("<div>").html("<strong>"+rec.username+"</strong>의 마지막 공격으로 지구의 평화는 지켜졌다!").css({"font-size":"20px","color":"blue"}).prependTo(jQuery("#giant-log"));
 		}
 	};

 	var init_giant = function(gname, ghp, gfinished){
 		var giant = jQuery("<div>").attr("id","giant").css({"line-height":"normal","border-top":"1px solid #ddd","padding-top":"20px"});
 		jQuery("<div>").attr("id","giant-image").css({"text-align":"center","margin":"20px"}).appendTo(giant);
 		jQuery("<div>").attr("id","giant-name").html("<strong>[[[" + gname + "]]]</strong> " + "출현!").css({"font-family":"궁서,serif","font-size":"40px","font-weight":"bold","text-align":"center"}).appendTo(giant);
 		jQuery("<div>").attr("id","giant-hp").html("HP : <strong>" + ghp + "</strong>/" + ghp).appendTo(giant);
		var bar = jQuery("<div>").css({"height":"10px","width":"100%","background":"green"});
 		jQuery("<div>").attr("id","giant-hp-bar").css({"height":"10px","width":"100%","margin-bottom":"20px","background":"#eee"}).append(bar).appendTo(giant);
 		jQuery("<div>").attr("id","giant-log").css({"background":"#efefef","overflow":"auto","height":"300px","width":"100%"}).appendTo(giant);
 		jQuery("img[src^=\"/dice_\"]:first").parents("td:first").append(giant);
 	};

	var get_dice_result = function(){
		if(jQuery("#dice_result").length != 0) return false;
		var dice_img = jQuery("img[src^=\"/dice_\"]");
		var dice = [];
		var user = [];
		if(dice_img.length == 0) return false;
		dice_img.each(function(i){
			if(i==0) return true;

			var self = jQuery(this);
			var name = jQuery.trim(self.parent().parent().find("td:first").text());

			if( user.indexOf(name) === -1 ){
				user.push(name);
			}
			else{
				var remove_dice_text = self.parent().html().split("<br><br>")[0];
				var new_text = self.parent().html().replace(remove_dice_text+"<br><br>","");
				self.parent().html(new_text);
				return true;
			}

			var dice_num = self.parent().html().split("<br><br>")[0].split(" ");
			dice_num = dice_num[dice_num.length-1];
			dice.push({"username":name, "dice_num":dice_num});
		});

		return dice;
	};
 
	var jQuery_init = function(){
		if(typeof jQuery == 'undefined')
		{
			setTimeout(jQuery_init, 100);
		}
		else
		{

		    jQuery.fn.shuffle = function() {
		        return this.each(function(){
		            var items = jQuery(this).children().clone(true);
		            return (items.length) ? jQuery(this).html(jQuery.shuffle(items)) : this;
		        });
		    }

		    jQuery.shuffle = function(arr) {
		        for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
		        return arr;
		    }

			jQuery(function(){giant_gamecodi();});
		}
		
	};
	jQuery_init();
})();
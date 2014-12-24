var dtd = {
	'price|100-500': 128,
	'shop|1': ['特步', '安踏', '匹克', '鸿星尔克', '乔丹'],
	'deals|100-9000': 200,
	'assess': function() {
      return Mock.Random.integer(100, this.deals);
    }
};

var source = 
	'<div class="product">\
		<div class="product-wrap">\
			<div class="productImg-wrap">\
				<a href="" class="productImg">\
					<img src="img/{{shop}}.jpg">\
				</a>\
			</div>\
			<div class="productPrice">\
				<em><b>¥</b>{{price}}.00</em>\
			</div>\
			<div class="productTitle">\
				<a href="">{{shop}}男鞋正品秋冬新款潮流休闲运动鞋男防滑加绒保暖棉鞋雪地鞋</a>\
			</div>\
			<div class="productShop">\
				<a href="">\
					{{shop}}官方旗舰店\
				</a>\
			</div>\
			<div class="productStatus">\
				<span>月成交 <em>{{deals}}笔</em></span>\
				<span>评价 <a href="">{{assess}}</a></span>\
			</div>\
		</div>\
	</div>';

var template = Handlebars.compile(source);
var html = '';
var count = Mock.Random.integer(3, 10);

for(var i=0; i<count; i++){
	html += template(Mock.mock(dtd));
}	

$("#part2").append(html);
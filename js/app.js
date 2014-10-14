var App = {};

App.model = {
	name: 'Армен',
	type: 'cat',
	age : '23',
	mark: 'шатен',
	gender: 'мальчик',
	// price: '100',
	// currency: 'USD',
	city: 'Минск',
	owner: '',
	phones: [0503334455, 0673334455],
	id: '',
	text: "Очень добрый котик",
	pic: 'http://uslavika.ru/wp-content/uploads/2010/06/nasha_russia_uslavika.ru008.jpg'
};

App.model_extra = {
	name: 'Диана',
	type: 'dog',
	age : '23',
	mark: 'блондинка',
	gender: 'мальчик',
	// price: '100',
	// currency: 'USD',
	// city: 'Минск',
	// owner: 'Артур',
	phones: [0503334455, 0673334455],
	id: '',
	text: "Очень добрая киска",
	pic: 'http://img-fotki.yandex.ru/get/4401/sweetlankakiss.60/0_4741d_530821e_L'
};

App.model_other = {
	name: 'Ж+Ж',
	type: 'other',
	age : '3',
	mark: 'белый',
	gender: 'девочка',
	// price: '100',
	// currency: 'USD',
	// city: 'Минск',
	// owner: 'Артур',
	phones: [0503334455, 0673334455],
	id: '',
	text: "Очень добрые киски",
	pic: 'http://99px.ru/sstorage/53/2010/05/image_5320051018003821978_tmb.jpg'
};

App.collection = new Array(9);

App.poligon = $('#container');
App.subjects_list = $('#subjects_list');
App.details = $('#details');

App.fetch = function(type){
	/*fetch collection*/
	// $.ajax(function(){

	// });
	/*tmp fetching via hardcode*/
	$(App.collection).each(function(i){
		

		if (i % 2 === 0) {
			App.model_extra.id = i;
			App.collection[i] = App.model_extra;
		}
		else{
			App.model.id = i;
			App.collection[i] = App.model;
		}
		if(i == 5 || i == 7){
			App.model_other.id = i;
			App.collection[i] = App.model_other;
		}
		
	});

	App.subjects_list.empty();
	
	$(App.collection).each(function(i){

		var item = App.collection[i];

		if(type && App.collection[i].type != type){
			return;
		}
		/*mini template*/
		var mini_tmpl = $('<div class="col-6 col-sm-6 col-lg-4"><h3>'+item.name+'</h3><img src="'+item.pic+'" alt="Фоточка" class="img-thumbnail"><p>'+item.name+" "+item.age+'</p><p><a class="btn btn-warning" href="'+item.id+'" role="button">Посмотреть »</a></p></div>');
		App.subjects_list.append(mini_tmpl);
	});

	App.details.hide();
	App.subjects_list.show();
};

/*popup constructor*/
App.popup = function(type){
	console.log(type)
};

/*not route but joint*/
App.route = function(path){

	switch (path){

		case 'buy':
			App.fetch();
		break;

		case 'cat':
			App.fetch(path);
		break;

		case 'dog':
			App.fetch(path);
		break;

		case 'other':
			App.fetch(path);
		break;
	}
	
};

App.tmpl = function(){

};

$(function(){
	App.fetch();	

	/*main navigation*/
	$('body').on('click', 'a', function(e){
		e.preventDefault();

		var role = $(e.target).attr('role');
		var target = $(e.target).attr('href');

		/*more details*/
		if(role == 'button'){
			var model = App.collection[target];
			App.subjects_list.hide();

			/*render template*/
			App.details.find('#pet_name').text(model.name);
			App.details.find('img').attr('src', model.pic);

			App.details.find('#pet_mark' ).text(model.mark);
			App.details.find('#pet_gender' ).text(model.gender);
			App.details.find('#pet_age'  ).text(model.age);
			App.details.find('#pet_price').text(model.price);
			App.details.find('#pet_currency').text(model.currency);
			App.details.find('#pet_phones' ).text(model.phones);
			App.details.find('#pet_owner' ).text(model.owner);
			App.details.find('#pet_city' ).text(model.city);
			App.details.find('#pet_text' ).text(model.text);
			
			App.details.show();
		}

		/*route*/
		if(role == 'route'){
			App.route(target);
		}
	});

	/*file select change*/
	$(document).on('change', '.btn-file :file', function() {
	    var input = $(this),
	        numFiles = input.get(0).files ? input.get(0).files.length : 1,
	        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
	    input.trigger('fileselect', [numFiles, label]);
	});

	$('.btn-file :file').on('fileselect', function(event, numFiles, label) {
        console.log(numFiles);
        console.log(label);
        $('#preview_img').attr('src',label);
    });
});
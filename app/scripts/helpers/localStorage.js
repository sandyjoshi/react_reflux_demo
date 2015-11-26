
// http://www.raymondcamden.com/2015/04/14/blowing-up-localstorage-or-what-happens-when-you-exceed-quota

const saveLocalStorage = function(data){
	try {
		for( var i = 0 , len = data.length ; i < len ; i++ ){
			var item = data[i];
			localStorage.setItem( item.key, item.val );
		}
	} catch(e) {
		console.log(e) ;
	}
}

export default saveLocalStorage;
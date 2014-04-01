(function($){
    $.store = function(key, val){
	function dom_store() {
	    var s = window.sessionStorage;
	    s.setItem(key, val);
	    $.currentStorage = 'dom';
	}
	function cookie_store() {
	    document.cookie = key + '=' + val;
	    $.currentStorage = 'cookie';
	}
	
	if (window.sessionStorage) { dom_store(); }
	else { cookie_store(); }
	return true;
    };

    $.read = function(key){
	if (window.sessionStorage) { return window.sessionStorage.getItem(key); }
	else {
	    re = RegExp(key+'=[a-zA-Z0-9]*');
	    return String(re.exec(document.cookie)).split('=')[1];
	}
    };
 
})(jQuery);
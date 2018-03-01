//listen for form submit

	
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// save bookmark
function saveBookmark(e){

	//get form values
	var siteName= document.getElementById('siteName').value;
	var siteURL= document.getElementById('siteURL').value;
	
	if(!siteName || !siteURL){
		alert('Please fill the form');	
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteURL.match(regex)){
		alert('Use valid URL');
		return false;
	}

	var bookmark={
		name: siteName,
		url: siteURL
	}
	// localStorage.setItem('test','hello');
	// console.log()
	if(localStorage.getItem('bookmarks')=== null){
		//init an array 
		var bookmarks=[];
		//add to array 
		bookmarks.push(bookmark);
		//set to local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		//get bookmarks from local storage
		var bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
		//add bookmark to array
		bookmarks.push(bookmark);
		//re-set back to local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
//clear form
document.getElementById('myForm').reset();
	
//re-fetch bookmarks
fetchBookmarks();
	//prevent form from submitting
	e.preventDefault();
}
function deleteBookmark(url)
{
		//get bookmarks from local storage
		var bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
		//loop through bookmarks
		for(var i=0;i<bookmarks.length;i++){
			if(bookmarks[i].url == url){
				//Remove from array
				bookmarks.splice(i,1);
			}
		}
	//re-set back to local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));	
	//re-fetch bookmarks
	fetchBookmarks();		
}	


//fetch bookmarks
function fetchBookmarks(){
	var bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
	console.log(bookmarks);

	// //get output id
	var bookmarksResults = document.getElementById('bookmarksResults');
	//build output
	bookmarksResults.innerHTML='';
	for(var i=0; i<bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url=bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="well">'+ 
		'<h3>'+name+ 
		'</h3>'+
		'<a class="btn btn-primary " target="_blank" href="'+url+'">Visit </a> ' + 
		'<a onclick= "deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#"> Delete</a>'+
			'</div>'; 

	}
}


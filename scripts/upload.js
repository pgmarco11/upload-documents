
jQuery(document).ready(function($){

			 $('.remove_button').click(function() {
			 	if(confirm("Are you sure you want to remove this file?") == false)
			 		return;

				 var currentIDs = document.getElementById('my_file_ID').value;
				 var currentfiles  = document.getElementById('my_file_URL').value;

				 var allIDs = currentIDs.split(',');
				 var allfiles = currentfiles.split(',');
	 

						var buttonID = $(this).attr('name');

						var ID = document.getElementById(buttonID).value;

						 if( ID === buttonID) {

							 $( '.'+buttonID ).val('');

							 for(var f = 0; f < allIDs.length; f++ ){

									var removeIndex = allIDs[f];
									var removefileIndex = allfiles[f];

									if(removeIndex === ID) {

										 var removeID = allIDs.indexOf(removeIndex);

										 allIDs.splice(removeID, 1);
										 allIDs = allIDs.toString();

										 var removefile = allfiles.indexOf(removefileIndex);

										 allfiles.splice(removefile, 1);
										 allfiles = allfiles.toString();

										 $( '#my_file_ID' ).val(allIDs);
										 $( '#my_file_URL' ).val(allfiles);

										 $( '.'+buttonID ).remove();

										 alert("Click Update to Complete Removal");
															
										 break;

									} else {

										 continue;
									}

							 } 

				 }       

			 });

});

var new_files = [];
var new_files_url = [];

jQuery(document).ready(function($){

			 var custom_uploader;

			 $('#my_upl_button').click(function(e) {

			 e.preventDefault();
			 var currentfiles = document.getElementById('my_file_URL').value;
			 var currentIDs = document.getElementById('my_file_ID').value;
			

					 //If the uploader object has already been created, reopen the dialog
					 if (custom_uploader) {
							 custom_uploader.open();
							 return;
					 } 

					 //Extend the wp.media object
					 custom_uploader = wp.media.frames.file_frame = wp.media({
							 title: 'Choose File',
							 button: {
									 text: 'Choose File'
							 },
							 multiple: true
					 });

					  //When a file is selected, grab the URL and set it as the text field's value
					  custom_uploader.on('select', function() {

						//assign current values to the hidden fields
						if(currentIDs != ''){
							$('#my_file_ID').val(currentIDs);									
					 	}
						
						if(currentfiles != ''){											 
							$( '#my_file_URL' ).val(currentfiles);
					 	}

						var selection = custom_uploader.state().get('selection').toJSON();

						//var newAttachments = 
						selection.map( function(attachment){
							
							var allIDs = currentIDs.split(',');
							
								if(allIDs.indexOf(attachment.id+'') < 0){

									new_files.push(attachment.id);
									new_files_url.push(attachment.url);

									//update id's field
									if($('#my_file_ID').val() != '')
										$('#my_file_ID').val($('#my_file_ID').val() + ',' + attachment.id);
									else
										$('#my_file_ID').val(attachment.id);

									//update urls's field
									if($('#my_file_URL').val() != '')
										$( '#my_file_URL' ).val($('#my_file_URL').val() + ',' + attachment.url);
									else
										$( '#my_file_URL' ).val(attachment.url);

									document.getElementById("files").innerHTML += '<label><strong>File URL:</strong></label><p id="fileurl_'+attachment.id+'">' + attachment.url + '</p><label><strong>Description:</strong></label><p>' + attachment.description + '</p>';
									
								}
						});

						alert("Click Update or Publish to Complete Upload");

						custom_uploader = null;
						});


					 //Open the uploader dialog
					 custom_uploader.open();

			 });

});

jQuery(document).ready(function($){

					$('#my_clear_button').click(function(e) {

					var currentfiles = document.getElementById('my_file_URL').value;

					var currentIDs = document.getElementById('my_file_ID').value;

					var allIDs = currentIDs.split(',');
					var allfiles = currentfiles.split(',');

					var original_ids = [];
					var original_urls = [];

					for(var f = 0; f < allIDs.length; f++ ){

						if(new_files.indexOf(parseInt(allIDs[f])) == -1){

							 original_ids.push(allIDs[f]);
							 original_urls.push(allfiles[f]);

						}

					}

				 $( '#my_file_ID' ).val(original_ids);
				 $( '#my_file_URL' ).val(original_urls);
				 $('#files').html("");

				 return;
					 
			});

});
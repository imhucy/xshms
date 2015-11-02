/*-------------------------------------------
	Function for File upload page (form_file_uploader.html)
---------------------------------------------*/
function FileUpload(){
	$('#bootstrapped-fine-uploader').fineUploader({
		template: 'qq-template-bootstrap',
		classes: {
			success: 'alert alert-success',
			fail: 'alert alert-error'
		},
		thumbnails: {
			placeholders: {
				waitingPath: "assets/waiting-generic.png",
				notAvailablePath: "assets/not_available-generic.png"
			}
		},
		request: {
			endpoint: 'server/handleUploads'
		},
		validation: {
			allowedExtensions: ['jpeg', 'jpg', 'gif', 'png']
		}
	});
}
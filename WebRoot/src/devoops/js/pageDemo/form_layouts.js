/*-------------------------------------------
	Function for Form Layout page (form_layouts.html)
---------------------------------------------*/
//
// Example form validator function
//
function DemoFormValidator(){
	$('#defaultForm').bootstrapValidator({
		message: 'This value is not valid',
		fields: {
			username: {
				message: 'The username is not valid',
				validators: {
					notEmpty: {
						message: 'The username is required and can\'t be empty'
					},
					stringLength: {
						min: 6,
						max: 30,
						message: 'The username must be more than 6 and less than 30 characters long'
					},
					regexp: {
						regexp: /^[a-zA-Z0-9_\.]+$/,
						message: 'The username can only consist of alphabetical, number, dot and underscore'
					}
				}
			},
			country: {
				validators: {
					notEmpty: {
						message: 'The country is required and can\'t be empty'
					}
				}
			},
			acceptTerms: {
				validators: {
					notEmpty: {
						message: 'You have to accept the terms and policies'
					}
				}
			},
			email: {
				validators: {
					notEmpty: {
						message: 'The email address is required and can\'t be empty'
					},
					emailAddress: {
						message: 'The input is not a valid email address'
					}
				}
			},
			website: {
				validators: {
					uri: {
						message: 'The input is not a valid URL'
					}
				}
			},
			phoneNumber: {
				validators: {
					digits: {
						message: 'The value can contain only digits'
					}
				}
			},
			color: {
				validators: {
					hexColor: {
						message: 'The input is not a valid hex color'
					}
				}
			},
			zipCode: {
				validators: {
					usZipCode: {
						message: 'The input is not a valid US zip code'
					}
				}
			},
			password: {
				validators: {
					notEmpty: {
						message: 'The password is required and can\'t be empty'
					},
					identical: {
						field: 'confirmPassword',
						message: 'The password and its confirm are not the same'
					}
				}
			},
			confirmPassword: {
				validators: {
					notEmpty: {
						message: 'The confirm password is required and can\'t be empty'
					},
					identical: {
						field: 'password',
						message: 'The password and its confirm are not the same'
					}
				}
			},
			ages: {
				validators: {
					lessThan: {
						value: 100,
						inclusive: true,
						message: 'The ages has to be less than 100'
					},
					greaterThan: {
						value: 10,
						inclusive: false,
						message: 'The ages has to be greater than or equals to 10'
					}
				}
			}
		}
	});
}
//
// Function for Dynamically Change input size on Form Layout page
//
function FormLayoutExampleInputLength(selector){
	var steps = [
		"col-sm-1",
		"col-sm-2",
		"col-sm-3",
		"col-sm-4",
		"col-sm-5",
		"col-sm-6",
		"col-sm-7",
		"col-sm-8",
		"col-sm-9",
		"col-sm-10",
		"col-sm-11",
		"col-sm-12"
	];
	selector.slider({
	   range: 'min',
		value: 1,
		min: 0,
		max: 11,
		step: 1,
		slide: function(event, ui) {
			if (ui.value < 1) {
				return false;
			}
			var input = $("#form-styles");
			var f = input.parent();
			f.removeClass();
			f.addClass(steps[ui.value]);
			input.attr("placeholder",'.'+steps[ui.value]);
		}
	});
}
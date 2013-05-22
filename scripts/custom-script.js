$(document).ready(function() {

		// First focus is good UI/UX only if infobox requires no user interaction
		// $('#customerInfo .fieldContainer input').first().focus();
                
		// Progessive enhancement - input mask must be integrated into regular expression match
        $("#formPhoneNumber").inputmask("(999)999-9999"); 

		/* ******* Validation Debug/Utility scripts ***********************************/
		// checks all form fields for validation
		//$('#customerInfo').validate().form();

		// validate a single element
		//$("#customerInfo").validate().element( "#formPhoneNumber" );

		// reset the form!
		//$("#customerInfo").validate().resetForm();
	
		// form input field styles need to be a part of the validation plugin
		// password field length, mask, and strength

		// show a custom error message at will
		//$("#customerInfo").validate().showErrors({'formEmail':'sdfsdf'});

		// number of invalids; form needs to be checked first!
		//$('#customerInfo').validate().form();
		//alert( $("#customerInfo").validate().numberOfInvalids() );

    
    
                /* Main jQuery form validation config */
		var validator = $('#customerInfo').validate({

			debug: true,

			// Set input field validation rules
			rules: {
				formFName: {
					required: true
				},
				formLName: {
					required: true
				},
				formSAdr1: {
					required: true
				},
				formSAdr2: {
					required: false
				},
				formEmail: {
					required: true,
					email: true
				},
				formPhoneNumber: {
					phoneUS: true
				},
				formUserName: {
					required: true
				},
				formPassword: {
					required: true
				}
			
			},
			messages: {
				formFName: "Please enter your first name",
				formLName: "Please enter your last name",
				formSAdr1: "Please enter your street address",
				
				formEmail: {
					required: "We need your email address to contact you",
					email: "Email address format: name@domain.com"
				},
				formPhoneNumber: {
					required: "Please enter a valid U.S. phone number",
					minlength: "Phone number must be 10 digits in length"
				},
				formUserName: {
					required: "Please enter a valid user name"
				},
				formPassword: {
					required: "Please enter a valid password"
				}
				
				
			},
                        
			// validation on blur
			onfocusout: function(element) {
				var validElement = $(element);
				// check element for validity
				var validCheck = validElement.valid();  
				
				// change validation indicator classes
				if (validCheck) { 
					// form changes colors
					validElement.addClass('validInput').removeClass('errorInput');
				}
				// form field empty, required or error classes?
				if ( ((validElement.val() === "") && (validElement.hasClass('required'))) || validElement.hasClass('error') )  {
					// then change icon to red
					validElement.addClass('errorInput').removeClass('validInput');
					validElement.next().addClass('errorIcon').removeClass('validIcon').hide().fadeIn(500, function(){});
				} else {
					// change icon to green
					validElement.addClass('validInput').removeClass('errorInput');
					validElement.removeClass('error');
					validElement.next().addClass('validIcon').removeClass('errorIcon').hide().fadeIn(500, function(){});
				}
			},
			
			onkeyup: false,
					
			// Submit handling
			submitHandler: function(form) {
				
				form.submit();
				
			},

						
			// Error handling
			errorClass: 'error',
			errorElement: "div",
			errorPlacement: function(error, element) {
					var elem = $(element);
					elem.next().addClass('errorIcon');
					var target = "#" + element.attr("name") + " + div.validBox";
					$("#" + element.attr("name")).addClass('errorInput');
					error.insertAfter(target).hide().fadeIn(400, function() {});
					
			}
		});
		
		$.validator.addMethod("phoneUS", function(phone_number, element) {
			phone_number = phone_number.replace(/\s+/g, ""); 
			return this.optional(element) || phone_number.length > 9 &&
				phone_number.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
		}, "Please specify a valid phone number");

		/* form jQuery styles */
		$('.fieldContainer:odd').css('background-color','#bb5');

		/* formInfo box scripts */
			
		// sequentially display list elements
		$('#regBenefitsList li').hide();
		$('#formInfo p').click(function() {
			var delayTime = 500;     
			$('#regBenefitsList li').each(function(index) {
				$(this).delay(delayTime).fadeIn(500);
				delayTime += 200;
			});
		});
});
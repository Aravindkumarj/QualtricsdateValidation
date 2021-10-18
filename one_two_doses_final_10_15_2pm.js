Qualtrics.SurveyEngine.addOnload(function () {
    /*Place your JavaScript here to run when the page loads*/

});

Qualtrics.SurveyEngine.addOnReady(function () {
    /*Place your JavaScript here to run when the page is fully displayed*/

    var question = this;
    var QID = question.questionId;
    console.log("here is the QID")
    console.log(QID)
    var inputValueBox_formfield1 = document.getElementById("QR~QID65~1");
    var inputValue_formfield1 = inputValueBox_formfield1.value;

    var inputValueBox_formfield2 = document.getElementById("QR~QID96~1");
    var inputValue_formfield2 = inputValueBox_formfield2.value;

    var radioButtonDiv = document.getElementsByClassName("QuestionBody")[0];


    jQuery(
        "<span style='padding-left:5px;color:red' id='inputValidationError_formfield1'></span>"
    ).insertAfter(inputValueBox_formfield1);

    jQuery(
        "<span style='padding-left:5px;color:red' id='inputValidationError_formfield2'></span>"
    ).insertAfter(inputValueBox_formfield2);

    // inputValueValidation_formfield1("inputValidationError_formfield1",inputValue_formfield1, QID);
    // inputValueValidation_formfield1("inputValidationError_formfield2", inputValue_formfield2, QID);
    var form1_valid = true;
    // var form2_valid = true;
    var form2_valid = inputValueBox_formfield2.value!= "" ? true : false;
    console.log("value in 2nd date: "+ inputValueBox_formfield2.value);
    radioButtonDiv.on("mouseleave", function() {
        document.getElementById("NextButton").disabled=form1_valid || form2_valid;
    })

    inputValueBox_formfield1.on("blur", function () {
        inputValue = inputValueBox_formfield1.value;
        console.log("here is the QID")
        console.log(QID)
        console.log(inputValue)

        if (!isValidVaccinationDate("inputValidationError_formfield1", inputValue, "QR~QID65~1")){
            form1_valid = true;
        }
        else
        {
            form1_valid = false;
            jQuery("#" + "inputValidationError_formfield1").html("");
        }
        document.getElementById("NextButton").disabled=form1_valid || form2_valid;
        console.log("form1_valid : "+ form1_valid +" "+ "form2_valid : "+ form2_valid);
    })

    inputValueBox_formfield2.on("blur", function () {
        inputValue = inputValueBox_formfield2.value;
        console.log("here is the QID")
        console.log(QID)
        console.log(inputValue)
        if (!isValidVaccinationDate("inputValidationError_formfield2", inputValue, "QR~QID96~1")){
            form2_valid = true;
        }
        else
        {
            form2_valid = false;
            jQuery("#" + "inputValidationError_formfield2").html("");
        }
        document.getElementById("NextButton").disabled= form1_valid || form2_valid;
        console.log("form1_valid : "+ form1_valid +" "+ "form2_valid : "+ form2_valid);
    })
});

function isValidVaccinationDate(error_code, dateValue, QID) {

    if (isDateOK(dateValue)) {
        var today = new Date();
        if (new Date(dateValue) > today) {
            //  alert('You can\'t enter a date beyond today as vaccination date.');
            // return false;
            jQuery("#" + error_code).html("&#10060;&nbspEnter a valid date");
        } else {
            //    alert('This is a good date!');
            return true;
            jQuery("#" + error_code).html("");
        }

    } else {
        //   alert('This doesn\'t appear to be a valid date.');
        // return false;
        jQuery("#" + error_code).html("&#10060;&nbspEnter a valid date");
    }

    function isDateOK(dateValue) {
        const minYear = 2019;
        var splitVals, year;

        if (isValidDate(dateValue)) {

            splitVals = dateValue.split('-');
            year = splitVals[2]
            year = parseInt(year);

            if (year >= minYear) {
                return true;
            }
        }

        return false;
    }

    function isValidDate(dateString) {
        var parts, day, month, year, monthLength;
        // First check for the pattern MM-DD-YYYY
        // if (!/^\d{1,2}\-\d{1,2}\-\d{4}$/.test(dateString))
        if (!/^(0\d{1}|1[0-2])\-([0-2]\d{1}|3[0-1])\-(202)[0-1]{1}$/.test(dateString))
            return false;

        // Parse the date parts to integers
        parts = dateString.split("-");
        day = parseInt(parts[1], 10);
        month = parseInt(parts[0], 10);
        year = parseInt(parts[2], 10);

        // Check the ranges of month and year
        if (year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;

        monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Adjust for leap years
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
    }
}
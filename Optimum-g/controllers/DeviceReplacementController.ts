angular.module('deviceFormApp')
  .controller('DeviceReplacementController', function() {
    var vm = this;

    vm.formData = {
      currentDate: new Date(),
      employee: {},
      previousDevice: {},
      replacementDevice: {
        dateIssued: new Date()
      },
      consent: {
        agreed: false,
        employeeSignatureDate: new Date()
      },
      officialUse: {
        oldDeviceReturned: false,
        returnedCondition: 'Good'
      }
    };

    vm.submitForm = function(form) {
      if (form.$valid) {
        console.log('Replacement Form Payload:', vm.formData);
        alert('Device Replacement Form submitted successfully!');
      } else {
        alert('Please complete all required fields before submitting.');
      }
    };
  });
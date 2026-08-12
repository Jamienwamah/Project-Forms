angular.module('deviceFormApp')
  .controller('DeviceTroubleshootingController', function() {
    var vm = this;

    vm.formData = {
      currentDate: new Date(),
      employee: {},
      device: {},
      issue: {
        troubleshootingAttempted: false
      },
      consent: {
        agreed: false
      },
      itRep: {},
      officialUse: {
        initialAssessment: {},
        troubleshootingPerformed: {}
      }
    };

    vm.assessmentOptions = {
      hardware: 'Hardware Issue',
      software: 'Software Issue',
      network: 'Network Issue',
      os: 'Operating System Issue',
      malware: 'Malware/Virus',
      userConfig: 'User Configuration'
    };

    vm.troubleshootingOptions = {
      hwDiag: 'Hardware Diagnostics',
      osRepair: 'Operating System Repair',
      driverUpdates: 'Driver Updates',
      swReinstall: 'Software Reinstallation',
      malwareRemoval: 'Malware Removal',
      winUpdates: 'Windows Updates',
      dataBackup: 'Data Backup',
      pwdReset: 'Password Reset',
      hwReplacement: 'Hardware Replacement'
    };

    vm.submitForm = function(form) {
      if (form.$valid) {
        console.log('Troubleshooting Form Payload:', vm.formData);
        alert('Troubleshooting Form submitted successfully!');
      } else {
        alert('Please complete all required fields before submitting.');
      }
    };
  });
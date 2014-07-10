'use strict';
angular.module('flyService.system').factory('Step', function(){
    return function(lastStep, data, currentStep){
        var that = this;
        this.lastStep = lastStep;
        this.currentStep = 1;
        if(currentStep){
            this.currentStep = currentStep;
        }

        function checkArrivalLastStep(){
            return that.lastStep === that.currentStep;
        }

        this.isLastStep = checkArrivalLastStep();
        this.isFirstStep = true;
        if(currentStep > 1){
            this.isFirsetStep = false;
        }

        this.next = function(){
            if(that.currentStep > that.lastStep){
                that.currentStep = that.currentStep + 1;
                that.isLastStep = checkArrivalLastStep();
                if(that.currentStep === 1){
                    that.isFirstStep = true;
                }
            }
        };

        this.prev = function(){
            if(that.currentStep > 1){
                that.currentStep = that.currentStep - 1;
                if(that.currentStep === 1){
                    that.isFirstStep = true;
                }
            }    
        };
        this.data = data;
    }
});
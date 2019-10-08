"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stepsList;
exports.initSteps = function (steps) {
    stepsList = steps;
};
exports.getStepByIndex = function (index) {
    return stepsList[index];
};
exports.getStepById = function (id) {
    return stepsList.find(function (loopedStep) { return loopedStep.ID === id; });
};
exports.getNextStep = function (step) {
    var index = step.index;
    if (stepsList.length === index + 1)
        return null;
    return stepsList[index + 1];
};
exports.getPreviousStep = function (step) {
    var index = step.index;
    if (index === 0)
        return null;
    return stepsList[index - 1];
};
exports.getLastStep = function () {
    return stepsList[stepsList.length - 1];
};
exports.getStepInNumberFormat = function (stepString) {
    // return everything after the first 4 characters (-step-XXXXXXXX)
    return stepString.substring(4);
};

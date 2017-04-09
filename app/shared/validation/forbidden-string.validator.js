"use strict";
function forbiddenStringValidator(StrReg) {
    return function (control) {
        var str = control.value;
        var invalid = StrReg.test(str);
        return invalid ? { 'forbiddenString': { str: str } } : null;
    };
}
exports.forbiddenStringValidator = forbiddenStringValidator;
//# sourceMappingURL=forbidden-string.validator.js.map
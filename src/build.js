"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FS = require("fs-extra");
var PATH = require("path");
var type_1 = require("./constant/type");
function matchText(start, end, sourceText) {
    var res = "";
    try {
        var startIndex = sourceText.indexOf(start);
        if (startIndex === -1) {
            throw start + " wasn't matched!";
        }
        if (sourceText.indexOf(end) === -1) {
            throw end + " wasn't matched!";
        }
        var endIndex = sourceText.indexOf(end) + end.length;
        res = sourceText.substring(startIndex, endIndex);
    }
    finally {
    }
    return res;
}
function default_1(input, outputDir, rules) {
    var sourceText = FS.readFileSync(input, { encoding: "utf8" });
    function resolveRule(rule) {
        var start = rule.start, end = rule.end, file = rule.file, _a = rule.before, before = _a === void 0 ? "" : _a, _b = rule.after, after = _b === void 0 ? "" : _b, _c = rule.type, type = _c === void 0 ? type_1.MATCH : _c, _d = rule.inserted, inserted = _d === void 0 ? "" : _d;
        var outputingText;
        if (type === type_1.MATCH) {
            var matchedText = matchText(start, end, sourceText);
            outputingText = "" + before + matchedText + after;
        }
        if (type === type_1.INSERT) {
            outputingText = "" + before + inserted + after;
        }
        var outputPath = PATH.resolve(outputDir, file);
        FS.outputFileSync(outputPath, outputingText);
    }
    var filteredRules = rules.filter(function (rule) { return rule.file != null && rule.file.length > 0; });
    filteredRules.forEach(resolveRule);
}
exports.default = default_1;
//# sourceMappingURL=build.js.map
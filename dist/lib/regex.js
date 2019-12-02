"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patternPhone = /^((\+|00)32\s?|0)(\d\s?\d{3}|\d{2}\s?\d{2})(\s?\d{2}){2}$/i;
exports.patternPhoneMobile = /^((\+|00)32\s?|0)4(65|66|46|60|56|[789]\d)(\s?\d{2}){3}$/i;
exports.patternEmail = /[a-zA-Z0-9!#$%&\'*+\=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&\'*+\=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-z0-9])?/;

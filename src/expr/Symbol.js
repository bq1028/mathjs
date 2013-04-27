/**
 * A Symbol stores a variable or function, or a link to another symbol
 * @param {math.expr.Scope} scope
 * @param {String} name
 * @param {*} value
 * @constructor math.expr.Symbol
 */
math.expr.Symbol = function Symbol (scope, name, value) {
    this.scope = scope;
    this.name = name;
    this.value = value;
};

/**
 * Get the symbols value
 * @returns {*} value
 */
math.expr.Symbol.prototype.get = function () {
    var value = this.value;
    if (!value) {
        // try to resolve again
        value = this.value = this.scope.findDef(this.name);

        if (!value) {
            // TODO: throw an error or not?
            throw new Error('Undefined symbol ' + this.name);
        }
    }

    // resolve a chain of symbols
    while (value instanceof math.expr.Symbol) {
        value = value.get();
    }

    return value;
};

/**
 * Set the value for the symbol
 * @param {*} value
 */
math.expr.Symbol.prototype.set = function (value) {
    this.value = value;
};

/**
 * Get the symbols value
 * @returns {*} value
 */
math.expr.Symbol.prototype.valueOf = function () {
    return this.get();
};
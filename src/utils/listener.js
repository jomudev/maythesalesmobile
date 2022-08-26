export default class Listener {
    static propertyValueChanges(o, property, handler) {
        var originalValue = o[property];

        Object.defineProperty(o, property, {
            get: function () {
                return originalValue;
            }, 
            set: function(val) {
                console.log("new val ", val.length);
                handler(originalValue, val);
                return originalValue = val;
            }
        })
    }
}
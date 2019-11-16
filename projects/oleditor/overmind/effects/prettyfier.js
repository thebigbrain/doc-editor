import prettify from 'app/utils/prettify';
let _options;
export default {
    initialize(options) {
        _options = options;
    },
    prettify(moduleId, title, code) {
        return prettify(title, () => code, _options.getPrettierConfig(), () => _options.getCurrentModule().id === moduleId);
    },
};

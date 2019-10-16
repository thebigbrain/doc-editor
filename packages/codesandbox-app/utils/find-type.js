export default (code) => {
    if (code.includes('from \'react\''))
        return 'react';
    return 'function';
};

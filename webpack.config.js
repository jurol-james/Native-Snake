var path = require('path');

module.exports = {
    entry : path.resolve(__dirname, 'js')+ '/engine.js',

    output:{
        path : path.resolve(__dirname,'dist'),
        filename : 'bundle.js'
    }
}
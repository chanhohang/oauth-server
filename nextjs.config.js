require ('style-loader')
require ('css-loader')

module.exports = {
    webpack: (config, { dev }) => {
        config.module.rules.push(
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        })
        return config;
    }    
}
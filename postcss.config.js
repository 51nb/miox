const AutoPrefixer = require('autoprefixer');
// const px2rem = require('postcss-px2rem');
// const px2remConfigs = {
//     baseDpr: 1,
//     remUnit: 37.5,
//     forcePxComment: '!px',
//     keepComment: '!no'
// };

module.exports = {
    plugins: [
        //px2rem(px2remConfigs),
        AutoPrefixer({
            browsers: ['last 20 versions']
        })
    ]
}
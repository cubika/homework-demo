var kmc = require('kmc')

kmc.config({
    packages: {
        mock: {
            base: 'http://mockjs.com/dist/'
        },
        components: {
        	base: 'script'
        }
    }
});

kmc.build('script/components/main.js','build/components/main.js');
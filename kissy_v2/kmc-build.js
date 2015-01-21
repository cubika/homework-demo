var kmc = require('kmc')

kmc.config({
    packages: {
        mock: {
            base: 'http://mockjs.com/dist/'
        },
        components: {
        	base: 'script',
        	ignorePackageNameInUri: true
        }
    }
});

kmc.build('script/main.js','build/main.js');
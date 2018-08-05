exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    params: {
        client: 'http://localhost:8000/'
    },
    multiCapabilities: [
        {
            browserName: 'chrome'
        }
    ]
};
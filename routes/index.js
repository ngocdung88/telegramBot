module.exports = function(app) {
    // Insert routes below
    // app.use('/api/devices', require('./api/device'));

    // All undefined asset or api routes should return a 404
    // app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    //     .get(errors[404]);

    // All other routes should redirect to the app.html
    app.route('/*')
        .get((req, res) => {
            res.json({
                status : 'Ok'
            });
        });
};

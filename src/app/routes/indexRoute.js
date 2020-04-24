module.exports = function(app){
    const index = require('../controllers/indexController');
    

    app.get('/app',index.default);

    const jwtMiddleware = require('../../../config/jwtMiddleware')
    const image = require('../../../config/multerMiddleware')
  
    // image 첨부
    app.route('/ApenImage').post(image.array('img'), index.default)
    // image list 조회
    // app.get('/list/image', jwtMiddleware, index.toonList)

    app.get('/search', jwtMiddleware, index.searchController);
};

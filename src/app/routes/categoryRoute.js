module.exports = function(app){

    const jwtMiddleware = require('../../../config/jwtMiddleware')
    const categoryCon = require('../controllers/categoryController.js');

    app.get('/category', jwtMiddleware, categoryCon.categoryList); // 카테고리 목록 보여주기
    app.route('/category').post(jwtMiddleware, categoryCon.addCategory); // 카테고리 추가하기
    app.route('/category/:categoryId').patch(jwtMiddleware, categoryCon.modifyCategory); // 카테고리 수정
    app.route('/category/:categoryId').delete(jwtMiddleware, categoryCon.deleteCategory); // 카테고리 삭제

};

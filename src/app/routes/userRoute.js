module.exports = function (app) {
    const user = require('../controllers/userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    app.route('/signUp').post(user.signUp); // 회원가입
    app.route('/signIn').post(user.signIn); // 로그인

    app.get('/user/info', jwtMiddleware, user.userInfo); // 정보조회
    app.route('/user/modifyInfo').patch(jwtMiddleware, user.modifyUser); // 정보 수정
    
    app.get('/check', jwtMiddleware, user.check);
};
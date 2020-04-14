module.exports = function (app) {
    const user = require('../controllers/userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    app.route('/signUp').post(user.signUp); // 회원가입
    app.route('/signIn').post(user.signIn); // 로그인

    app.get('/test', async function(req,res){
        console.log("test")
        res.json({
            code :"success"
        })
    })
    app.get('/check', jwtMiddleware, user.check);
};
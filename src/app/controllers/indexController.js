const {pool} = require('../../../config/database');
const {logger} = require('../../../config/winston');

exports.default = async function (req, res) {
    console.log("default check")
    try {
        return res.json({
            isSuccess: false,
            code: 301,
            message: '아이디를 입력해주세요.',
          })
    } catch (err) {
        logger.error(`example non transaction DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
    }
};
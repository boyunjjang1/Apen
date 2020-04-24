const {pool} = require('../../../config/database');
const {logger} = require('../../../config/winston');

exports.default = async function (req, res) {
    console.log("default check")
    try {
        return res.json({
            isSuccess: true,
            code: 200,
            message: 'image삽입 성공',
          })
    } catch (err) {
        logger.error(`example non transaction DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
    }
};

exports.searchController = async function (req, res) {
    console.log("searchController In")
    const json = req.body
    const token = req.verifiedToken
    const connection = await pool.getConnection(async (conn) => conn)
    try {
      const SearchQuery = `SELECT nickname,name FROM User
          WHERE
              name LIKE '%${json.word}%' OR
              nickname LIKE '%${json.word}%';`
      const [rows] = await connection.query(SearchQuery)
      console.log(rows)
      const list = []
      if (rows.length === 0) list[0] = '검색 결과가 없습니다.'
      else {
        for (var i = 0; i < rows.length; i++) {
          list[i] = rows[i]
        }
      }
  
      console.log(list)
  
      connection.release()
      return res.json({
        isSuccess: true,
        code: 200,
        result: rows,
        message: '검색 성공',
      })
    } catch (err) {
      logger.error(`example non transaction Query error\n: ${JSON.stringify(err)}`)
      connection.release()
      return res.json({
        isSuccess: false,
        code: 313,
        message: '검색 실패',
      })
    }
  }
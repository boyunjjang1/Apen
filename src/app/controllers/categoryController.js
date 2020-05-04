const {
    pool
  } = require('../../../config/database')
  const {
    logger
  } = require('../../../config/winston')
  
  const jwt = require('jsonwebtoken')
  const idReg = /^[A-za-z]/g
  const crypto = require('crypto')
  const secret_config = require('../../../config/secret')
  
  // 카테고리 목록 보여주기
  exports.categoryList = async function (req, res) {
    const token = req.verifiedToken
    const connection = await pool.getConnection(async (conn) => conn)
    try {
      const CategoryListQuery = `SELECT categoryName, idcategory
      FROM Category WHERE status != 'DELETED';`
      const [rows] = await connection.query(CategoryListQuery)
  
      const list = []
  
      for (var i = 0; i < rows.length; i++) {
        list[i] = rows[i]
      }
      console.log(list)
  
      connection.release()
      return res.json({
        isSuccess: true,
        code: 200,
        result: list,
        message: '카테고리 조회 성공',
      })
    } catch (err) {
      logger.error(`Category List Query error\n: ${JSON.stringify(err)}`)
      connection.release()
      return res.json({
        isSuccess: false,
        code: 314,
        message: '카테고리 조회 실패',
      })
    }
  }

  exports.addCategory = async function(req,res){
    const json = req.body
    const token = req.verifiedToken

    console.log(token.id)
    
    if(token.id != 'boyunjjang@naver.com'){
        return res.json({
            isSuccess: false,
            code: 315,
            message: '관리자가 아닙니다'
        }) 
    }
    const connection = await pool.getConnection(async (conn) => conn)
  
    try {
      const CategoryAddQuery = `INSERT INTO Category (categoryName) VALUES (?);`
      const [rows] = await connection.query(CategoryAddQuery, [json.categoryName])
      connection.release()
      return res.json({
        isSuccess: true,
        code: 200,
        message: '카테고리 추가 성공',
      })
    } catch (err) {
      logger.error(`Category ADD Query error\n: ${JSON.stringify(err)}`)
      connection.release()
      return res.json({
        isSuccess: false,
        code: 316,
        message: '카테고리 추가 실패',
      })
    }

  }

  exports.modifyCategory = async function(req,res){
    const json = req.body
    const token = req.verifiedToken
    console.log(token.id)
    if(token.id != 'boyunjjang@naver.com'){
        return res.json({
            isSuccess: false,
            code: 315,
            message: '관리자가 아닙니다'
        }) 
    } 
    const connection = await pool.getConnection(async (conn) => conn)
  
    const isCategoryQuery = `SELECT idcategory FROM Category WHERE status != 'DELETED' AND categoryName=?;`
    const [result] = await connection.query(isCategoryQuery, [json.categoryName])
    console.log(result)
    if (result.length != 0) {
      connection.release()
      return res.json({
        isSuccess: false,
        code: 317,
        message: '이미 존재하는 카테고리 입니다.',
      })
    }
  
    try {
      const modifyCafeQuery = `UPDATE Category SET categoryName=? WHERE idcategory=?;`
      const [rows] = await connection.query(modifyCafeQuery, [json.categoryName, req.params.categoryId])
      connection.release()
      return res.json({
        isSuccess: true,
        code: 200,
        message: '카테고리 수정 성공',
      })
    } catch (err) {
      logger.error(`Category Modify Query error\n: ${JSON.stringify(err)}`)
      connection.release()
      return res.json({
        isSuccess: false,
        code: 318,
        message: '카테고리 수정 실패',
      })
    }
      
}

    exports.deleteCategory = async function(req,res){
        const json = req.body
        const token = req.verifiedToken
        const categoryIndex = req.params.categoryId
        if(token.id != 'boyunjjang@naver.com'){
            return res.json({
                isSuccess: false,
                code: 315,
                message: '관리자가 아닙니다'
            }) 
        } 
      
        const connection = await pool.getConnection(async (conn) => conn)
        try {
          const CategoryDeleteQuery = `UPDATE Category SET status='DELETED' WHERE idcategory=?;`
          const [rows] = await connection.query(CategoryDeleteQuery, [req.params.categoryId])
      
        //   const boardDeleteQuery = `UPDATE board SET status='DELETED' WHERE categoryType=? AND userIdx=?;`
        //   const [result] = await connection.query(boardDeleteQuery, [req.params.categoryId, token.idx])
      
          connection.release()
          return res.json({
            isSuccess: true,
            code: 200,
            message: '카테고리 삭제 성공',
          })
        } catch (err) {
          logger.error(`Category Delete Query error\n: ${JSON.stringify(err)}`)
          connection.release()
          return res.json({
            isSuccess: false,
            code: 319,
            message: '카테고리 삭제 실패',
          })
        }
      
}
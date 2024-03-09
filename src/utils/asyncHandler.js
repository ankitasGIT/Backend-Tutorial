//Just creates a method and exports (promise & trycatch)




// 1-> try catch
// const asnycHandler = (func) => 
//     async (err, req, res, next) => {
//         try {
//             await fn(err, req, res, next)
//         } catch (error) {
//             res.status(err.code || 500).json({
//                 success: false, 
//                 message : err.message
//             })
//         }
//     }


//2 - Promise
// Is a higher order function
const asnycHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => {
            next(err)
        })
    }
}


export {asnycHandler}



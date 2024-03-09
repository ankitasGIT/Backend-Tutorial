import {asnycHandler} from "../utils/asyncHandler.js";

const resgisterUser = asnycHandler (async (req, res) => {
    return res.status(200).json(
        {
            message: "ok"
        }
    )
})   

export {
    resgisterUser
}
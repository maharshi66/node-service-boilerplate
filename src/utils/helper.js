export function sendSuccessResponse(res, data, message = 'Success') {
    res.status(200).json({
        error: false,
        message: message,
        code: 200,
        data: data
    })
}

export function sendErrorResponse(res, error, message = 'Something went wrong', status = 400) {
    res.status(status).json({
        error: true,
        message: message,
        code: status,
        data: null
    })
}
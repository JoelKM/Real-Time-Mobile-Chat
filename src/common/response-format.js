module.exports = async (res, data, statusCode) => {
    return res.status(statusCode).json({
        data: data
    });
}
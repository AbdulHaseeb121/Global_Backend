const CourseResponse = (isSuccessfull, message, data) => {
    return (
        {
            isSuccessfull,
            message: isSuccessfull ? message : '',
            error: !isSuccessfull ? message : '',
            data
        }

    )
}
module.exports = {CourseResponse}
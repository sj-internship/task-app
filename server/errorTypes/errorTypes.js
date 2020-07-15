class NotFoundError extends Error{
}
class UnauthorizedError extends Error{
}
class AuthenticationError extends Error{
}
class UnavailableServiceError extends Error{
}
class BadRequestError extends Error{
}

module.exports={
    NotFoundError,
    UnauthorizedError,
    AuthenticationError,
    UnavailableServiceError,
    BadRequestError
}
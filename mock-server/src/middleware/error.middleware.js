function errorHandler(error, request, response, next) {
  if (error.type === 'entity.parse.failed' && /^\/api\/v1\/users(?:\/|$)/.test(request.path)) {
    response.status(400).json({
      type: 'invalid-json',
      title: 'Invalid JSON',
      status: 400,
      code: 'REQ-400-01',
      detail: 'Request body contains invalid JSON.',
      instance: request.path,
    });
    return;
  }
  next(error);
}

module.exports = { errorHandler };

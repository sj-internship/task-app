const taskModel = require('../model/taskModel');
const { NotFoundError, UnauthorizedError } = require('../errorTypes/errorTypes')
module.exports = {
    validateUserTask: async (req, res, next) => {
        const id = req.params.id;
        const user = req.user;
        const task = await taskModel.getOne(id);
        if (task == null) {
            const error = new NotFoundError(`Task not found`);
            res.handleError(error, res);
        }
        else if (task.createdBy !== user.name) {
            const error = new UnauthorizedError(`You have no access to this task`);
            res.handleError(error, res);
        }
        else {
            next();
        }
    },
}
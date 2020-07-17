const taskModel = require('../model/taskModel');
const { NotFoundError, UnauthorizedError } = require('../errorTypes/errorTypes')
module.exports = {
    validateUserTask: async (id, user) => {
        const task = await taskModel.getOne(id);
        if (task == null) {
            throw new NotFoundError(`Task not found`);
        }
        else if (task.createdBy !== user.name) {
            throw new UnauthorizedError(`You have no access to this task`);
        }
        return task;
    }
}
const authorizationJWT = require('./auth');
const handleErrors = require('./errorHandler');
const {validateUniqueName} = require('./userValidator');
const {validateUserTask} = require('./taskValidator')
const endpointsConfig={
    get:{
        '/api/tasks':[authorizationJWT],
        '/api/task/:id':[authorizationJWT, validateUserTask],
        '/api/tags':[authorizationJWT]
    },
    post:{
        '/api/task':[authorizationJWT],
        '/api/register':[validateUniqueName],
        '/api/signIn':[],
        '/api/register':[validateUniqueName],
        '/api/task/:id': [authorizationJWT, validateUniqueName]
    },
    delete:{
        '/api/task/:id':[authorizationJWT, validateUserTask]
    }
}

module.exports=(app)=>{
    //all paths use handleErrors
    app.use(handleErrors);

    const methods = Object.keys(endpointsConfig);
    methods.forEach(method=>{
        const paths = Object.keys(endpointsConfig[method]);
        switch(method){
            case 'get':
                paths.forEach(path=>{
                    const middlewares = endpointsConfig[method][path];
                    middlewares.forEach(middleware=>{
                        app.get(path, middleware);
                    });
                });
                break;
            case 'post':
                paths.forEach(path=>{
                    const middlewares = endpointsConfig[method][path];
                    middlewares.forEach(middleware=>{
                        app.post(path, middleware);
                    });
                });
                break;
            case 'delete':
                paths.forEach(path=>{
                    const middlewares = endpointsConfig[method][path];
                    middlewares.forEach(middleware=>{
                        app.delete(path, middleware);
                    });
                });
                break;
            case 'put':
                paths.forEach(path=>{
                    const middlewares = endpointsConfig[method][path];
                    middlewares.forEach(middleware=>{
                        app.put(path, middleware);
                    });
                });
                break;
        };
    });
};

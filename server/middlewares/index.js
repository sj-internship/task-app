//require all middlewares
const authorizationJWT = require('./auth');
const handleErrors = require('./errorHandler');
//create config object where u sign all middlwares to correct paths
const endpointsConfig={
    get:{
        '/api/tasks':{
            middlewares:[authorizationJWT]
        },
        '/api/task/:id':{
            middlewares:[authorizationJWT]
        },
        '/api/tags':{
            middlewares:[authorizationJWT]
        }
    },
    post:{
        '/api/task':{
            middlewares:[authorizationJWT]
        },
        '/api/register':{
            middlewares:[]
        },
        '/api/signIn':{
            middlewares:[]
        }
    },
    delete:{
        '/api/task/:id':{
            middlewares:[authorizationJWT]
        }
    }
}

//apply middlewares to paths? 
module.exports=(app)=>{
    //all paths use handleErrors
    app.use(handleErrors);

    const methods = Object.keys(endpointsConfig);
    methods.forEach(method=>{
        const paths = Object.keys(endpointsConfig[method]);
        switch(method){
            case 'get':
                paths.forEach(path=>{
                    const middlewares = endpointsConfig[method][path].middlewares;
                    middlewares.forEach(middleware=>{
                        app.get(path, middleware);
                        console.log(middleware);
                    })
                })
                break;
            case 'post':
                paths.forEach(path=>{
                    const middlewares = endpointsConfig[method][path].middlewares;
                    middlewares.forEach(middleware=>{
                        app.post(path, middleware);
                    })
                })
                break;
            case 'delete':
                paths.forEach(path=>{
                    const middlewares = endpointsConfig[method][path].middlewares;
                    middlewares.forEach(middleware=>{
                        app.delete(path, middleware);
                    })
                })
                break;
            case 'put':
                paths.forEach(path=>{
                    const middlewares = endpointsConfig[method][path].middlewares;
                    middlewares.forEach(middleware=>{
                        app.put(path, middleware);
                    })
                })
                break;
        }
    })
}

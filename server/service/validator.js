module.exports = {
    validateAttributes: (modelAttributes, attributes) => {
        //filtering attributes which aren't in the schema

        const modelKeys = Object.keys(modelAttributes);
        const filteredAttributes = Object.keys(attributes)
            .filter(key => modelKeys.includes(key))
            .reduce((acc, key) => Object.assign(acc, { [key]: attributes[key] }), {});

            
        //check required
        modelKeys.forEach(attributeKey => {
            if (modelAttributes[attributeKey].required && filteredAttributes[attributeKey] == undefined) {
                throw new Error(`${attributeKey} must be provided`)
            }
        });

        //check types
        Object.keys(filteredAttributes).forEach(key => {
            if (typeof filteredAttributes[key] !== modelAttributes[key].type) {
                if (!(typeof filteredAttributes[key] === 'object' && modelAttributes[key].type === 'array' && filteredAttributes[key].constructor === Array)) {
                    //if modelAttributes[key].type == 'object' we could remove this if 
                    throw new Error(`Type of ${key} doesnt match`);
                }
            }
        })
        return
    }
}

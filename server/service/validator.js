const {BadRequestError} = require('../errorTypes/errorTypes')
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
                throw new BadRequestError(`${attributeKey} must be provided`)
            }
        });

        //check types
        Object.keys(filteredAttributes).forEach(key => {
            const constructorName = filteredAttributes[key].constructor.name
            if (constructorName.toLowerCase() !== modelAttributes[key].type) {
                throw new BadRequestError(`Type of ${key} doesnt match`);
            }
        })
        //length, in
        modelKeys.forEach(modelKey => {
            const attribute = filteredAttributes[modelKey];
            if (attribute) {
                const rulesKeys = Object.keys(modelAttributes[modelKey])
                rulesKeys.forEach(ruleKey => {
                    const ruleValue = modelAttributes[modelKey][ruleKey];
                    switch (ruleKey) {
                        case 'maxLength':
                            if (attribute.length > ruleValue) {
                                throw new BadRequestError(`${modelKey} is too long`);
                            }
                            break;
                        case 'minLength':
                            if (attribute.length < ruleValue) {
                                throw new BadRequestError(`${modelKey} is too short`);
                            }
                            break;
                        case 'in':
                            if (!ruleValue.includes(attribute)) {
                                throw new BadRequestError({priority: `${modelKey} has a bad value`});
                            }
                            break;
                        case 'hasOneDigit':
                            const digitPattern = /[\d]{1}/;
                            if (!digitPattern.test(attribute)) {
                                throw new BadRequestError(`${modelKey} has to have at least one digit`);
                            }
                            break;
                        case 'hasOneCapitalLetter':
                            const capitalLetterPattern = /[A-Z]+/;
                            if (!capitalLetterPattern.test(attribute)) {
                                throw new BadRequestError(`${modelKey} has to have at least one capital letter`);
                            }
                            break;
                    }
                })
            }
        })
    }
}

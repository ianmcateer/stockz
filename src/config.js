const requiredEnvironment = [
    "REACT_APP_FINANICAL_MODELLING_PREP_BASE_URL",
    "REACT_APP_FINANCIAL_MODELLING_PREP_API_KEYS",
];

const validateEnviornment = (requiredVars, actualEnviornment) => {
    requiredVars.forEach((requiredVar) => {
        if (!requiredVar in actualEnviornment) {
            throw new Error(`Required env var missing: ${requiredVar}`);
        }
    });
};

validateEnviornment(requiredEnvironment, process.env);

export const financialModellingPrepConfig = {
    baseUrl: process.env.REACT_APP_FINANICAL_MODELLING_PREP_BASE_URL,
    apiKeys: process.env.REACT_APP_FINANCIAL_MODELLING_PREP_API_KEYS?.split(
        " "
    ),
};

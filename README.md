# esUtils

## Project init

Some methods need to be called to bootstrap the project. These methods should be called in the js file that is first executed.

- appGlobalVarInit(name: string, prefix: string) to give access to the global variable containing app data
- initDataLayer(customMethods: KeyedObject<Function> = {}) to get the dataLayer ready and set custom methods
- initSteps(steps: Steps) to define the steps list for the app

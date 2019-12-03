# esUtils

:link: [See documentation](https://manuszep.github.io/esUtils/)


## Update & publish

- Setup NPM token in ~/.profile or ~/.bash_profile :
```
export NPM_TOKEN="0000-00000-00000-00000-00000"
```

- before each git commit, run ```yarn build```
- before deploy, run ```yarn build```, increase version in package.json, git commit and ```npm publish```


## Project init

Some methods need to be called to bootstrap the project. These methods should be called in the js file that is first executed.

- appGlobalVarInit(name: string, prefix: string) to give access to the global variable containing app data
- initDataLayer(customMethods: KeyedObject<Function> = {}) to get the dataLayer ready and set custom methods
- initSteps(steps: Steps) to define the steps list for the app
- initIcons(icons: KeyedObject<JSX.Element>) to append icons to the default set
- initModal(modalContainers: KeyedObject, prefix: string) to provide modal containers and app prefix
- setAppStoreVar(store: any) to provide access to the appStore

## Endpoints list

The initial state should provide a few endpoints for some modules:

```json
window.appName = {
  "endpoints": {
    "getLanguages": "/api/lang%%lang%%.json?1=1",
    "saveState": "/api/saveState.json?1=1",
    "getCountries": "/api/countries%%lang%%.json",
    "GetCityProposals": "/api/GetCityProposals.json",
    "GetPostalAddressProposals": "/api/GetPostalAddressProposals.json",
    "getIBPBrokers" : "/api/getIBPBrokers.json?1=1",
    "getAgentData": "/api/getAgentData.json?1=1",
    "saveBlockedInFlowReason": "/api/submitStep.json?1=1",
  }
}
```

## API

### Types

- ```typescript
  KeyedObject<T = any> = {[k: string]: T}
  ```
- ```typescript
  Step = {
    "index": number,
    "ID": string,
    "number": number,
    "pageTitle": string,
    "chapter": string
  }
  ```
- ```typescript
  Steps = Step[]
  ```


### Data

- ```typescript
  phoneCountriesList: {
    "name": {
      "FR": string,
      "NL": string
    },
    "dial_code": string,
    "code": string,
    "flag": string
  }[]
  ```


### RegExp

- ```typescript
  patternPhone
  ```
- ```typescript
  patternPhoneMobile
  ```
- ```typescript
  patternEmail
  ```


### Utils / Analytics

- ```typescript
  getGaAccount(): string
  ```
- ```typescript
  getGoogleAnalyticsId(): string
  ```
- ```typescript
  trackConversion(id: string): void
  ```


### Utils / DataLayer

- ```typescript
  initDataLayer(customMethods: KeyedObject<Function> = {}): void
  ```
- ```typescript
  getDataLayer(): DataLayer
  ```
- ```typescript
  dataLayerMiddleware: Middleware({ getState }: MiddlewareAPI)
  ```


### Utils / Dates

- ```typescript
  parseDate(date: string): moment.Moment
  ```
- ```typescript
  getCurrentDate(): moment.Moment
  ```
- ```typescript
  getDifferenceInYears(
    firstDate: moment.Moment,
    secondDate: moment.Moment
  ): number
  ```
- ```typescript
  getIsAdult(dob: string): boolean
  ```


### Utils / Display

- ```typescript
  scrollTo(speed = 100, scrollTargetY = 0): void
  ```
- ```typescript
  shouldShowIf(condition: boolean): { "hidden"?: boolean }
  ```


### Utils / FieldFormatters

- ```typescript
  priceFormatter(value: string): string
  ```
- ```typescript
  priceNormalizerFactory(digitsCount?: number, decimalCount?: number): Function
  ```
- ```typescript
  priceNormalizer(value: string): string
  ```


### Utils / GlobalVars

- ```typescript
  appGlobalVarInit(name: string, prefix: string): void
  ```
- ```typescript
  setAppStoreVar(store: any): void
  ```
- ```typescript
  getAppStore(): any
  ```
- ```typescript
  getAppGlobalVar(): KeyedObject
  ```
- ```typescript
  getAppPrefix(): string
  ```


### Utils / Performance

- ```typescript
  throttle(fn: Function, threshhold: number, scope: any): Function
  ```
- ```typescript
  requestAnimFrame(): Function
  ```


### Utils / State

- ```typescript
  getInitialState(): KeyedObject
  ```
- ```typescript
  getEndPoints(): KeyedObject
  ```
- ```typescript
  getWhatsappPhone(): KeyedObject
  ```
- ```typescript
  wrapMapStateToProps(
    state: KeyedObject,
    commonItems: KeyedObject,
    appItems: KeyedObject
  ): KeyedObject
  ```


### Utils / Steps

- ```typescript
  initSteps(steps: Steps): void
  ```
- ```typescript
  getStepByIndex(index: number): Step
  ```
- ```typescript
  getStepById(id: string): Step | undefined
  ```
- ```typescript
  getNextStep(step: Step): Step | null
  ```
- ```typescript
  getPreviousStep(step: Step): Step | null
  ```
- ```typescript
  getLastStep(): Step
  ```
- ```typescript
  getStepInNumberFormat(stepString: string): string
  ```


### Utils / Strings

- ```typescript
  PHONE_FIXED
  ```
- ```typescript
  PHONE_MOBILE
  ```
- ```typescript
  parseStringTemplate(
    str: string,
    replacements: KeyedObject<string>
  ): string
  ```
- ```typescript
  capitalizeFirstLetter(s: string): string
  ```
- ```typescript
  composeStreetAddress(
    street: string,
    streetNr: string,
    postalBoxText = "",
    boxNr = ""
  ): string
  ```
- ```typescript
  composeCityAddress(postalCode: number | string, city: string): string
  ```
- ```typescript
  composeFullAddress(
    street: string,
    streetNr: string,
    postalBoxText = "",
    boxNr = "",
    postalCode: number | string,
    city: string,
    oneLine: boolean
  ): string
  ```
- ```typescript
  composeGmapsAddress(
    street = "",
    streetNumber = "",
    postalCode = "",
    city = ""
  ): string
  ```
- ```typescript
  formatPrice(price: string, lang = "fr"): string
  ```
- ```typescript
  formatPercentage(num: number): string
  ```
- ```typescript
  normalizeCountryPrefixTo00(prefix: string): string
  ```
- ```typescript
  normalizeCountryPrefixToPlus(prefix: string): string
  ```
- ```typescript
  normalizeAreaPrefix(prefix: string): string
  ```
- ```typescript
  constructPhoneNumber(prefix: string, phoneNumber: string): string
  ```
- ```typescript
  getPhoneType(phone: string): string
  ```
- ```typescript
  phoneTransform(phone: string): string | null
  ```
- ```typescript
  getOptionLabelFromValue(
    options: Array<KeyedObject<string>>,
    value: string
  ): string
  ```
- ```typescript
  getGuid(): string
  ```


### Utils / URL

- ```typescript
  getHistoryLocation(): string
  ```


### Utils / Validation

- ```typescript
  required(value: any): undefined | JSX.Element
  ```
- ```typescript
  isValidDate(value: string): boolean
  ```
- ```typescript
  dateAfterToday(value: string): boolean | undefined | JSX.Element
  ```
- ```typescript
  dateWithinYear(value: string): boolean | undefined | JSX.Element
  ```
- ```typescript
  validDate(value: string): boolean | undefined | JSX.Element
  ```
- ```typescript
  dateNotBefore1900(value: string): undefined | JSX.Element
  ```
- ```typescript
  dateNotInFuture(value: string): undefined | JSX.Element
  ```
- ```typescript
  validEmail(value: string): undefined | JSX.Element
  ```
- ```typescript
  validPhoneLogic(phoneNumber: string): boolean
  ```
- ```typescript
  validPhone(value: string): undefined | JSX.Element
  ```

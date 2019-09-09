# Project init

Some methods need to be called to bootstrap the project. These methods should be called in the js file that is first executed.

## appGlobalVarInit(name: string, prefix: string)

Give access to the global variable containing app data

```typescript
  appGlobalVarInit("eBike", "EBIKE");
  ```


## initDataLayer(customMethods: KeyedObject<Function> = {})

Get the dataLayer ready and set custom methods.

```typescript
  initDataLayer({
    "setDataForStep3": (formValues, state) => {
      // Do stuff
    }
  });
  ```

:link: [See DataLayer documentation](dataLayer.md)


## initSteps(steps: Steps)

Define the steps list for the app

```typescript
  initSteps([
    {
      "index": 0,
      "ID": "step1",
      "number": 1,
      "pageTitle": "eBike-Step1",
      "chapter": "basic_info"
    },
    {
      "index": 1,
      "ID": "step2",
      "number": 2,
      "pageTitle": "eBike-Step2",
      "chapter": "basic_info"
    }
  ]);
  ```

:link: [See Steps documentation](steps.md)


## initIcons(icons: KeyedObject<JSX.Element>)
Append icons to the default set

```typescript
  initIcons({
    "icon1": (
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">...</svg>
    ),
    "icon2": (
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">...</svg>
    )
  });
  ```
:link: [See Icon documentation](icon.md)


## initModal(modalContainers: KeyedObject, prefix: string)
Provide modal containers and app prefix

```typescript
  import * as ModalContainers from "app/components/ModalContainers";
  initModal(ModalContainers, "eBike");
  ```
:link: [See Modal documentation](modal.md)


## setAppStoreVar(store: any)

Provide access to the appStore

```typescript
  export const appStore = createStore(AppReducer, enhancer);
  setAppStoreVar(appStore);
  ```
:link: [See GlobalVars documentation](globalVars.md)

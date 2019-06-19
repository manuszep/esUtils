export const throttle = (fn: Function, threshhold: number, scope: any) => {
  let last: number;
  let deferTimer: number;

  threshhold || (threshhold = 250);

  return function () {
    let context = scope || window;
    let now = +new Date;
    let args = arguments;

    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);

      deferTimer = window.setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

export const requestAnimFrame = (): Function => {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    (window as any).mozRequestAnimationFrame ||
    function (callback: Function) {
      window.setTimeout(callback, 1000 / 60);
    };
};

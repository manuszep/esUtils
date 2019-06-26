import { requestAnimFrame } from "./performance";

export const scrollTo = (speed = 100, scrollTargetY = 0) => {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  let currentTime = 0;

  // min time .1, max time .8 seconds
  const time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8));

  const easeOutCubic = function (t: number) {
    const newT = t - 1;

    return (newT * newT * newT) + 1;
  };

  // add animation loop
  function tick() {
    currentTime += 1 / 60;

    const p = currentTime / time;
    const t = easeOutCubic(p);

    if (p < 1) {
      requestAnimFrame()(tick);

      window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
    } else {
      window.scrollTo(0, scrollTargetY);
    }
  }

  // call it once to get started
  tick();
}

export const shouldShowIf = (condition: boolean): { "hidden"?: boolean } => {
  if (!condition) {
    return { "hidden": true };
  }
  return {};
}

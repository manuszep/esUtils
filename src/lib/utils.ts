import { KeyedObject } from "../index";

export const deepFind = (obj: KeyedObject, path: string) => {
  let current = obj;
  let i = 0;
  let idx;
  let tmp;
  const paths = path.split(".");

  for (i = 0; i < paths.length; i += 1) {
    idx = paths[i].match(/(.*)\[([^\]]{0,})\]$/);

    if (idx === null) {
      tmp = current[paths[i]];
    } else {
      tmp = (idx[1].length) ? current[idx[1]][idx[2]] : current[idx[2]];
    }

    if (typeof tmp === "undefined") {
      return undefined;
    }

    current = tmp;
  }

  return current;
};

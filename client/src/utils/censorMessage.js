import { Filter } from "bad-words";

const filter = new Filter();

export const censorMessage = (rawContent) => {
  return filter.clean(rawContent);
};

import "server-only";

const dictionaries = {
  "en-US": () =>
    import("../../dictionaries/en-US.json").then((module) => module.default),
  "zh-TW": () =>
    import("../../dictionaries/zh-TW.json").then((module) => module.default),
  "zh-CN": () =>
    import("../../dictionaries/zh-CN.json").then((module) => module.default),
};

export const getDictionary = async (locale) => dictionaries[locale]();

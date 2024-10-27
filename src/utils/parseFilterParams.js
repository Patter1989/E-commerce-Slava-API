// src/utils/parseFilterParams.js

const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isValidType = ['work', 'home', 'personal'].includes(type);

  if (isValidType) return type;
};

const parseIsFavourite = (isFavourite) => {
  const isString = typeof isFavourite === 'string';
  if (!isString) return;

  if (isFavourite === 'true') return true;
  if (isFavourite === 'false') return false;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const filter = {};

  const parsedType = parseContactType(type);
  if (parsedType) filter.contactType = parsedType;

  const parsedIsFavourite = parseIsFavourite(isFavourite);
  if (typeof parsedIsFavourite === 'boolean')
    filter.isFavourite = parsedIsFavourite;

  return filter;
};

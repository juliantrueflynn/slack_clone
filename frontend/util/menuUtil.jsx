export const itemDecorate = (entity, decoratorAttrs = {}) => {
  const { title: label, slug } = entity;
  const { urlPrefix, ...attrs } = decoratorAttrs;
  const prefix = urlPrefix || '/';
  const link = prefix + slug;

  return { label, link, ...attrs };
};

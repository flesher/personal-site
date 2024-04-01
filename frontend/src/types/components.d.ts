import type { Schema, Attribute } from '@strapi/strapi';

export interface LinkCustomLink extends Schema.Component {
  collectionName: 'components_link_custom_links';
  info: {
    displayName: 'Custom Link';
  };
  attributes: {
    url: Attribute.String;
    link_text: Attribute.String;
    meta: Attribute.JSON;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'link.custom-link': LinkCustomLink;
    }
  }
}

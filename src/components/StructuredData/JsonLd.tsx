import React, { FC } from 'react';

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export const JsonLd: FC<JsonLdProps> = ({ data }) => (
  <script type="application/ld+json">{JSON.stringify(data)}</script>
);

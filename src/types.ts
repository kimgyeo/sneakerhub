/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Colorway {
  id: string;
  name: string;
  nameEn?: string;
  hueClass: string;
  accentClass: string;
  glowClass: string;
  bgGlowClass: string;
  bgButtonClass: string;
  textColor: string;
  description: string;
  descriptionEn?: string;
}

export interface SneakerSpec {
  label: string;
  labelEn?: string;
  value: string;
  valueEn?: string;
  detail: string;
  detailEn?: string;
}

export interface InteractiveHotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
}

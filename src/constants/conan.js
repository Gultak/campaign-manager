import React from 'react';
import { FortunePoints } from '../components/FortunePoints';

export const POSITIONS = {
  name: {
    position: { x: 46, y: 15.5, w: 17, h: 3, size: 140, align: 'center' }
  },
  background: {
    position: { x: 36.5, y: 22, w: 35.7, h: 19 },
    data: {
      ageGender: { x: 20, y: 11, w: 30, h: 11, size: 100 },
      caste: { x: 20, y: 24, w: 30, h: 11, size: 100 },
      archetype: { x: 20, y: 37, w: 30, h: 11, size: 100 },
      education: { x: 20, y: 49, w: 30, h: 11, size: 100 },
      homeland: { x: 72, y: 11, w: 27, h: 11, size: 100 },
      trait: { x: 72, y: 24, w: 27, h: 11, size: 100 },
      nature: { x: 72, y: 37, w: 27, h: 11, size: 100 },
      warstory: { x: 72, y: 49, w: 27, h: 11, size: 100 },
      appearance: { x: 20, y: 63, w: 79, h: 11, size: 100 },
      personality: { x: 20, y: 76, w: 79, h: 11, size: 100 },
      languages: { x: 20, y: 89, w: 79, h: 11, size: 100 }
    }
  },
  campaignStats: {
    position: { x: 36, y: 42, w: 37, h: 7 },
    data: {
      fortune: { x: 1.5, y: 36, w: 23, h: 27, component: FortunePoints },
      reknown: { x: 27, y: 41, w: 14, h: 23, size: 80, align: 'center' },
      standing: { x: 45, y: 41, w: 14, h: 23, size: 80, align: 'center' },
      xpTotal: { x: 70, y: 41, w: 10, h: 23, size: 80, align: 'right', transform: ((number) => (number || 0).toLocaleString()) },
      xpSpent: { x: 90, y: 41, w: 10, h: 23, size: 80, align: 'right', transform: ((number) => (number || 0).toLocaleString()) }
    }
  },
  belongings: {
    position: { x: 36, y: 42, w: 37, h: 7 },
    data: {
      gold: {
        x: 100 - 30, y: 83, size: 200, align: 'right',
        sizer: ((value) => value < 100 ? 200 : (value < 1000 ? 150 : (value < 10000 ? 120 : 100))),
        offsetter: ((value) => value < 100 ? { x: 0, y: 0 } : (value < 1000 ? { x: -0.3, y: 1.2 } : (value < 10000 ? { x: -0.5, y: 1.8 } : { x: -0.5, y: 2 }))),
        transform: ((number) => (number || 0).toLocaleString())
      },
      upkeep: { x: 100 - 29, y: 91.5, size: 100, align: 'right' }
    }
  },
  stats: {
    position: {},
    attributes: {
    },
    skills: {

    }
  }
}
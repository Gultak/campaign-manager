import React, { useState } from 'react';
import { _CONAN as CONAN } from '../../constants/systems';
import * as ATTRIBUTES from '../../constants/attributes';
import { CONAN as SKILLS } from '../../constants/skills';
import { POSITIONS } from '../../constants/conan';
import { useCharacter } from '../../tools/Hooks';
import { SheetData } from '../SheetData';
import { useParams } from 'react-router-dom';
import useResizeObserver from 'use-resize-observer';
import { Image, Container, Icon, Dropdown, Popup, Menu, Button } from 'semantic-ui-react';

export function CharacterSheetConan() {
  const { uid } = useParams();
  const { character } = useCharacter(uid);
  const [fontSize, setFontSize] = useState(100);
  const [page, setPage] = useState(1);
  const { ref } = useResizeObserver({
    onResize: ({ width }) => {
      setFontSize(ref.current ? (ref.current.offsetWidth / 12) : 100);
    }
  });

  function getNested(obj, path) {
    for (var i = 0, j = path.split('.'), len = j.length; i < len; i++) {
      obj = (obj || {})[j[i]];
    }
    return obj;
  }

  function findTargetNumber(number, attribute) {
    console.log('find', arguments, SKILLS, attribute && attribute.split('.'), attribute && attribute.split('.')[1], attribute && SKILLS[attribute.split('.')[1]])
    return number + (attribute ? ((character?.attributes || dummy.attributes)[SKILLS[attribute.split('.')[1]]?.attribute]) : 0);
  }

  const background = `/images/Conan${page}.jpg`;

  const positions = [
    { attr: 'name', y: 16, x: 47, size: 120 },

    { attr: 'ageGender', y: 24.3, x: 44, size: 100 },
    { attr: 'caste', y: 26.75, x: 44, size: 100 },
    { attr: 'archetype', y: 29.2, x: 44, size: 100 },
    { attr: 'education', y: 31.65, x: 44, size: 100 },
    { attr: 'homeland', y: 24.3, x: 63, size: 100 },
    { attr: 'trait', y: 26.75, x: 63, size: 100 },
    { attr: 'nature', y: 29.2, x: 63, size: 100 },
    { attr: 'warstory', y: 31.65, x: 63, size: 100 },
    { attr: 'appearance', y: 34.1, x: 44, size: 100 },
    { attr: 'personality', y: 36.55, x: 44, size: 100 },
    { attr: 'languages', y: 39, x: 44, size: 100 },

    { attr: 'reknown', y: 44.9, x: 49, size: 80 },
    { attr: 'standing', y: 44.9, x: 55.5, size: 80 },

    { attr: 'xpTotal', y: 45, x: 100 - 65.6, size: 80, align: 'right', transform: ((number) => (number || 0).toLocaleString()) },
    { attr: 'xpSpent', y: 45, x: 100 - 72.7, size: 80, align: 'right', transform: ((number) => (number || 0).toLocaleString()) },

    {
      attr: 'gold', y: 83, x: 100 - 30, size: 200, align: 'right',
      sizer: ((value) => value < 100 ? 200 : (value < 1000 ? 150 : (value < 10000 ? 120 : 100))),
      offsetter: ((value) => value < 100 ? { x: 0, y: 0 } : (value < 1000 ? { x: -0.3, y: 1.2 } : (value < 10000 ? { x: -0.5, y: 1.8 } : { x: -0.5, y: 2 }))),
      transform: ((number) => (number || 0).toLocaleString())
    },
    { attr: 'upkeep', y: 91.5, x: 100 - 29, size: 100, align: 'right' },

    { attr: 'attributes.agility', y: 18.4, x: 100 - 93, size: 80, align: 'right', weight: 1000 },
    {
      attr: 'attributes.agility', y: 17.2, x: 95.1, component: <Popup trigger={<Icon link className='fas fa-dice-d20' inverted circular color='black' />}
        hoverable className='simple' offset={-6}>
        <Popup.Content>
          <Button.Group vertical>
            <Button compact>5&nbsp;&nbsp;<Icon className='fas fa-dice-d20' /></Button>
            <Button compact>4&nbsp;&nbsp;<Icon className='fas fa-dice-d20' /></Button>
            <Button compact>3&nbsp;&nbsp;<Icon className='fas fa-dice-d20' /></Button>
            <Button compact>2&nbsp;&nbsp;<Icon className='fas fa-dice-d20' /></Button>
          </Button.Group>
        </Popup.Content>
      </Popup>
    },
    { attr: 'attributes.awareness', y: 28, x: 100 - 93, size: 80, align: 'right', weight: 1000 },
    { attr: 'attributes.brawn', y: 39.7, x: 100 - 93, size: 80, align: 'right', weight: 1000 },
    { attr: 'attributes.coordination', y: 47.4, x: 100 - 93, size: 80, align: 'right', weight: 1000 },
    { attr: 'attributes.intelligence', y: 57, x: 100 - 93, size: 80, align: 'right', weight: 1000 },
    { attr: 'attributes.personality', y: 71.8, x: 100 - 93, size: 80, align: 'right', weight: 1000 },
    { attr: 'attributes.willpower', y: 85, x: 100 - 93, size: 80, align: 'right', weight: 1000 },

    { attr: 'skills.acrobatics.expertise', y: 22.2, x: 100 - 88.7, size: 80, align: 'right' },
    { attr: 'skills.acrobatics.focus', y: 22.2, x: 100 - 91.5, size: 80, align: 'right' },
    { attr: 'skills.acrobatics.expertise', y: 22.2, x: 100 - 94.2, size: 80, align: 'right', transform: findTargetNumber },
    { attr: 'skills.melee.expertise', y: 24.1, x: 100 - 88.7, size: 80, align: 'right' },
    { attr: 'skills.melee.focus', y: 24.1, x: 100 - 91.5, size: 80, align: 'right' },
    { attr: 'skills.melee.expertise', y: 24.1, x: 100 - 94.2, size: 80, align: 'right', transform: findTargetNumber },
    { attr: 'skills.stealth.expertise', y: 26, x: 100 - 88.7, size: 80, align: 'right' },
    { attr: 'skills.stealth.focus', y: 26, x: 100 - 91.5, size: 80, align: 'right' },
    { attr: 'skills.stealth.expertise', y: 26, x: 100 - 94.2, size: 80, align: 'right', transform: findTargetNumber },

    { attr: 'skills.insight.expertise', y: 32, x: 100 - 88.7, size: 80, align: 'right' },
    { attr: 'skills.insight.focus', y: 32, x: 100 - 91.5, size: 80, align: 'right' },
    { attr: 'skills.insight.expertise', y: 32, x: 100 - 94.2, size: 80, align: 'right', transform: findTargetNumber },
    { attr: 'skills.observation.expertise', y: 33.9, x: 100 - 88.7, size: 80, align: 'right' },
    { attr: 'skills.observation.focus', y: 33.9, x: 100 - 91.5, size: 80, align: 'right' },
    { attr: 'skills.observation.expertise', y: 33.9, x: 100 - 94.2, size: 80, align: 'right', transform: findTargetNumber },
    { attr: 'skills.survival.expertise', y: 35.8, x: 100 - 88.7, size: 80, align: 'right' },
    { attr: 'skills.survival.focus', y: 35.8, x: 100 - 91.5, size: 80, align: 'right' },
    { attr: 'skills.survival.expertise', y: 35.8, x: 100 - 94.2, size: 80, align: 'right', transform: findTargetNumber },
    { attr: 'skills.thievery.expertise', y: 37.7, x: 100 - 88.7, size: 80, align: 'right' },
    { attr: 'skills.thievery.focus', y: 37.7, x: 100 - 91.5, size: 80, align: 'right' },
    { attr: 'skills.thievery.expertise', y: 37.7, x: 100 - 94.2, size: 80, align: 'right', transform: findTargetNumber },

    { attr: 'skills.athletics.expertise', y: 43.4, x: 100 - 88.7, size: 80, align: 'right' },
    { attr: 'skills.athletics.focus', y: 43.4, x: 100 - 91.5, size: 80, align: 'right' },
    { attr: 'skills.athletics.expertise', y: 43.4, x: 100 - 94.2, size: 80, align: 'right', transform: findTargetNumber },
    { attr: 'skills.resistance.expertise', y: 45.4, x: 100 - 88.7, size: 80, align: 'right' },
    { attr: 'skills.resistance.focus', y: 45.4, x: 100 - 91.5, size: 80, align: 'right' },
    { attr: 'skills.resistance.expertise', y: 45.4, x: 100 - 94.2, size: 80, align: 'right', transform: findTargetNumber },

    { attr: 'skills.parry.expertise', y: 51.4, x: 100 - 88.7, size: 80, align: 'right' },
    { attr: 'skills.parry.focus', y: 51.4, x: 100 - 91.5, size: 80, align: 'right' },
    { attr: 'skills.parry.expertise', y: 51.4, x: 100 - 94.2, size: 80, align: 'right', transform: findTargetNumber },
    { attr: 'skills.ranged.expertise', y: 53.3, x: 100 - 88.7, size: 80, align: 'right' },
    { attr: 'skills.ranged.focus', y: 53.3, x: 100 - 91.5, size: 80, align: 'right' },
    { attr: 'skills.ranged.expertise', y: 53.3, x: 100 - 94.2, size: 80, align: 'right', transform: findTargetNumber },
    { attr: 'skills.sailing.expertise', y: 55.1, x: 100 - 88.7, size: 80, align: 'right' },
    { attr: 'skills.sailing.focus', y: 55.1, x: 100 - 91.5, size: 80, align: 'right' },
    { attr: 'skills.sailing.expertise', y: 55.1, x: 100 - 94.2, size: 80, align: 'right', transform: findTargetNumber },

    { attr: 'skills.alchemy.expertise', y: 60.9, x: 100 - 88.7, size: 80, align: 'right' },
    { attr: 'skills.alchemy.focus', y: 60.9, x: 100 - 91.5, size: 80, align: 'right' },
    { attr: 'skills.alchemy.expertise', y: 60.9, x: 100 - 94.2, size: 80, align: 'right', transform: findTargetNumber },
    { attr: 'skills.craft.expertise', y: 62.8, x: 100 - 88.7, size: 80, align: 'right' },
    { attr: 'skills.craft.focus', y: 62.8, x: 100 - 91.5, size: 80, align: 'right' },
    { attr: 'skills.craft.expertise', y: 62.8, x: 100 - 94.2, size: 80, align: 'right', transform: findTargetNumber },
    { attr: 'skills.healing.expertise', y: 64.6, x: 100 - 88.7, size: 80, align: 'right' },
    { attr: 'skills.healing.focus', y: 64.6, x: 100 - 91.5, size: 80, align: 'right' },
    { attr: 'skills.healing.expertise', y: 64.6, x: 100 - 94.2, size: 80, align: 'right', transform: findTargetNumber },
    { attr: 'skills.linguistics.expertise', y: 66.5, x: 100 - 88.7, size: 80, align: 'right' },
    { attr: 'skills.linguistics.focus', y: 66.5, x: 100 - 91.5, size: 80, align: 'right' },
    { attr: 'skills.linguistics.expertise', y: 66.5, x: 100 - 94.2, size: 80, align: 'right', transform: findTargetNumber },
    { attr: 'skills.lore.expertise', y: 68.3, x: 100 - 88.7, size: 80, align: 'right' },
    { attr: 'skills.lore.focus', y: 68.3, x: 100 - 91.5, size: 80, align: 'right' },
    { attr: 'skills.lore.expertise', y: 68.3, x: 100 - 94.2, size: 80, align: 'right', transform: findTargetNumber },
    { attr: 'skills.warfare.expertise', y: 70.1, x: 100 - 88.7, size: 80, align: 'right' },
    { attr: 'skills.warfare.focus', y: 70.1, x: 100 - 91.5, size: 80, align: 'right' },
    { attr: 'skills.warfare.expertise', y: 70.1, x: 100 - 94.2, size: 80, align: 'right', transform: findTargetNumber },

    { attr: 'skills.animals.expertise', y: 75.8, x: 100 - 88.7, size: 80, align: 'right' },
    { attr: 'skills.animals.focus', y: 75.8, x: 100 - 91.5, size: 80, align: 'right' },
    { attr: 'skills.animals.expertise', y: 75.8, x: 100 - 94.2, size: 80, align: 'right', transform: findTargetNumber },
    { attr: 'skills.command.expertise', y: 77.7, x: 100 - 88.7, size: 80, align: 'right' },
    { attr: 'skills.command.focus', y: 77.7, x: 100 - 91.5, size: 80, align: 'right' },
    { attr: 'skills.command.expertise', y: 77.7, x: 100 - 94.2, size: 80, align: 'right', transform: findTargetNumber },
    { attr: 'skills.counsel.expertise', y: 79.5, x: 100 - 88.7, size: 80, align: 'right' },
    { attr: 'skills.counsel.focus', y: 79.5, x: 100 - 91.5, size: 80, align: 'right' },
    { attr: 'skills.counsel.expertise', y: 79.5, x: 100 - 94.2, size: 80, align: 'right', transform: findTargetNumber },
    { attr: 'skills.persuade.expertise', y: 81.3, x: 100 - 88.7, size: 80, align: 'right' },
    { attr: 'skills.persuade.focus', y: 81.3, x: 100 - 91.5, size: 80, align: 'right' },
    { attr: 'skills.persuade.expertise', y: 81.3, x: 100 - 94.2, size: 80, align: 'right', transform: findTargetNumber },
    { attr: 'skills.society.expertise', y: 83.1, x: 100 - 88.7, size: 80, align: 'right' },
    { attr: 'skills.society.focus', y: 83.1, x: 100 - 91.5, size: 80, align: 'right' },
    { attr: 'skills.society.expertise', y: 83.1, x: 100 - 94.2, size: 80, align: 'right', transform: findTargetNumber },

    { attr: 'skills.discipline.expertise', y: 89.1, x: 100 - 88.7, size: 80, align: 'right' },
    { attr: 'skills.discipline.focus', y: 89.1, x: 100 - 91.5, size: 80, align: 'right' },
    { attr: 'skills.discipline.expertise', y: 89.1, x: 100 - 94.2, size: 80, align: 'right', transform: findTargetNumber },
    { attr: 'skills.sorcery.expertise', y: 90.9, x: 100 - 88.7, size: 80, align: 'right' },
    { attr: 'skills.sorcery.focus', y: 90.9, x: 100 - 91.5, size: 80, align: 'right' },
    { attr: 'skills.sorcery.expertise', y: 90.9, x: 100 - 94.2, size: 80, align: 'right', transform: findTargetNumber },



  ];

  const dummy = {
    reknown: 3,
    standing: 2,
    xpTotal: 12345,
    xpSpent: 10000,
    gold: 99999,
    upkeep: 5,
    fortune: {
      total: 3,
      used: 1
    },
    attributes: {
      agility: 9,
      awareness: 10,
      brawn: 12,
      coordination: 9,
      intelligence: 8,
      personality: 10,
      willpower: 8
    },
    skills: {
      acrobatics: { expertise: 2, focus: 2 },
      melee: { expertise: 2, focus: 2 },
      stealth: { expertise: 2, focus: 2 },
      insight: { expertise: 2, focus: 2 },
      observation: { expertise: 2, focus: 2 },
      survival: { expertise: 2, focus: 2 },
      thievery: { expertise: 2, focus: 2 },
      athletics: { expertise: 2, focus: 2 },
      resistance: { expertise: 2, focus: 2 },
      parry: { expertise: 2, focus: 2 },
      ranged: { expertise: 2, focus: 2 },
      sailing: { expertise: 2, focus: 2 },
      alchemy: { expertise: 2, focus: 2 },
      craft: { expertise: 2, focus: 2 },
      healing: { expertise: 2, focus: 2 },
      linguistics: { expertise: 2, focus: 2 },
      lore: { expertise: 2, focus: 2 },
      warfare: { expertise: 2, focus: 2 },
      animals: { expertise: 2, focus: 2 },
      command: { expertise: 2, focus: 2 },
      counsel: { expertise: 2, focus: 2 },
      persuade: { expertise: 2, focus: 2 },
      society: { expertise: 2, focus: 2 },
      discipline: { expertise: 2, focus: 2 },
      sorcery: { expertise: 2, focus: 2 },
    }
  };

  const data = { ...character, ...dummy };

  return (<Container style={{ position: 'relative', fontSize: `${fontSize}%`, lineHeight: `${fontSize}%` }}>
    <div ref={ref} style={{ position: 'relative' }}>
      <Image src={background} centered />
      {false
        ? positions.map((data, index) => {
          const value = getNested(character, data.attr) || getNested(dummy, data.attr) || data.attr || index;
          const size = data.sizer ? data.sizer(value) : data.size;
          const offset = data.offsetter ? data.offsetter(value) : { x: 0, y: 0 };
          return (
            <div key={index} style={{
              top: `${data.y + offset.y}%`, [data.align || 'left']: `${data.x + offset.x}%`, position: 'absolute',
              fontSize: `${size}%`, lineHeight: `${size}%`, fontWeight: `${data.weight || 700}`
            }}>
              {data.component || (data.transform || ((x) => x))(value, data.attr)}
            </div>);
        })
        : <div style={{
          border: '1px solid black', position: 'absolute',
          left: '36%', top: '62%', width: '37%', height: '7%'
        }}>
          <div style={{
            border: '1px solid black', position: 'absolute',
            left: '20%', top: '11%', width: '30%', height: '10%'
          }} />
        </div>}

      <SheetData key='name' name='name' position={POSITIONS.name.position} value={data?.name} />
      <SheetData key='background' position={POSITIONS.background.position}>{
        Object.entries(POSITIONS.background.data).map(([key, value]) => {
          return <SheetData key={`background.${key}`} position={value} name={key} value={data && data[key]} />
        })}
      }</SheetData>
      <SheetData key='campaignStats' position={POSITIONS.campaignStats.position}>{
        Object.entries(POSITIONS.campaignStats.data).map(([key, value]) => {
          return <SheetData key={`campaignStats.${key}`} position={value} name={key} value={data && data[key]} />
        })}
      }</SheetData>



    </div>
  </Container>)
    ;
}

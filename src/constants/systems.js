import { CharacterSheetInfinity } from '../components/infinity/CharacterSheetInfinity';
import { CharacterSheetConan } from '../components/conan/CharacterSheetConan';
import { CampaignSheetInfinity } from '../components/infinity/CampaignSheetInfinity';
import { CampaignSheetConan } from '../components/conan/CampaignSheetConan';

export const INFINITY = 'infinity';
export const CONAN = 'conan';

export const DEFAULT = INFINITY;

export const _INFINITY = {
  name: 'Infinity',
  image: '/logo-infinity.png',
  icon: 'infinity',
  characterSheet: CharacterSheetInfinity,
  campaignSheet: CampaignSheetInfinity
};

export const _CONAN = {
  name: 'Conan',
  image: '/logo-conan.png',
  icon: 'conan',
  characterSheet: CharacterSheetConan,
  campaignSheet: CampaignSheetConan
};

export const DEFS = {
  [INFINITY]: _INFINITY,
  [CONAN]: _CONAN
}
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  RAGE_BAIT_COLLECTION,
  REACTION_OPTIONS,
  CATEGORY_META,
  getRageBaitComeback,
  getRandomRageBait,
  getLocalizedTake,
} from './rageBait';

test('Rage bait collection has valid items across categories', () => {
  assert.ok(RAGE_BAIT_COLLECTION.length >= 15, 'Should have at least 15 items');
  for (const item of RAGE_BAIT_COLLECTION) {
    assert.ok(item.id, 'Item must have an id');
    assert.ok(item.headline, 'Item must have a headline');
    assert.ok(item.take, 'Item must have a take text');
    assert.ok(CATEGORY_META[item.category], `Category ${item.category} must exist in CATEGORY_META`);
  }
});

test('All 5 standard reactions are defined with labels', () => {
  assert.equal(REACTION_OPTIONS.length, 5);
  const types = REACTION_OPTIONS.map((r) => r.type);
  assert.ok(types.includes('agree'));
  assert.ok(types.includes('disagree'));
  assert.ok(types.includes('be_so_fr'));
  assert.ok(types.includes('excuse_me'));
  assert.ok(types.includes('block'));
});

test('Comebacks exist for all reactions across all 4 moods', () => {
  const moods = ['corporate', 'passive_aggressive', 'existential', 'dank_2016'] as const;
  const reactions = ['agree', 'disagree', 'be_so_fr', 'excuse_me', 'block'] as const;

  for (const mood of moods) {
    for (const reaction of reactions) {
      const comeback = getRageBaitComeback(reaction, mood);
      assert.ok(comeback && comeback.length > 5, `Expected valid comeback for ${mood} + ${reaction}`);
    }
  }
});

test('getRandomRageBait respects exclusion list when possible', () => {
  const first = RAGE_BAIT_COLLECTION[0];
  const item = getRandomRageBait('corporate', [first.id]);
  assert.notEqual(item.id, first.id, 'Should not return excluded item if alternatives exist');
});

test('getLocalizedTake returns mood override if defined', () => {
  const testItem = RAGE_BAIT_COLLECTION[0]; // has moodOverrides
  const corporateTake = getLocalizedTake(testItem, 'corporate');
  assert.ok(corporateTake, 'Should return text');
  if (testItem.moodOverrides?.corporate) {
    assert.equal(corporateTake, testItem.moodOverrides.corporate);
  }
});

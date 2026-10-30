import test from 'node:test';
import assert from 'node:assert/strict';
import { validateCommissionBrief, calculateEstimatedTurnaround } from './formValidation.ts';

test('validateCommissionBrief rejects empty brief', () => {
  const result = validateCommissionBrief({
    clientName: '',
    contactTag: '',
    platform: '',
    projectType: '',
    scopeDescription: '',
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.clientName);
  assert.ok(result.errors.contactTag);
  assert.ok(result.errors.platform);
  assert.ok(result.errors.projectType);
  assert.ok(result.errors.scopeDescription);
});

test('validateCommissionBrief accepts valid Discord tag and details', () => {
  const result = validateCommissionBrief({
    clientName: 'Alex (VoxelCraft SMP)',
    contactTag: 'alex_mc#1234',
    platform: 'PaperMC (1.20+)',
    projectType: 'Custom New Plugin',
    scopeDescription: 'We need a custom parkour checkpoint plugin with Redis synchronization.',
  });

  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('validateCommissionBrief accepts modern Discord username without discriminator', () => {
  const result = validateCommissionBrief({
    clientName: 'Voxel Network Lead',
    contactTag: 'alexvoxel',
    platform: 'Folia (Multi-thread)',
    projectType: 'Complete Minigame',
    scopeDescription: 'Distributed arena battle-royale minigame with instant rollback.',
  });

  assert.equal(result.isValid, true);
});

test('validateCommissionBrief accepts valid email', () => {
  const result = validateCommissionBrief({
    clientName: 'Network Director',
    contactTag: 'admin@playvoxelsmp.net',
    platform: 'Purpur',
    projectType: 'Bug Fix & Profiling',
    scopeDescription: 'Diagnose server tick stalls caused by mob AI pathfinding.',
  });

  assert.equal(result.isValid, true);
});

test('calculateEstimatedTurnaround returns accurate SLA timeframes', () => {
  assert.equal(calculateEstimatedTurnaround('Bug Fix & Profiling'), '24 - 48 Hours');
  assert.equal(calculateEstimatedTurnaround('Custom New Plugin'), '3 - 7 Days');
  assert.equal(calculateEstimatedTurnaround('Complete Minigame'), '7 - 14 Days');
  assert.equal(calculateEstimatedTurnaround('Full Server Infrastructure'), '14 - 21 Days');
  assert.equal(calculateEstimatedTurnaround('Unknown'), '3 - 10 Days');
});

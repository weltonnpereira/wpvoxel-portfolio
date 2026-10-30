/**
 * Validates and sanitizes commission brief submissions.
 */

export interface CommissionBrief {
  clientName: string;
  contactTag: string;
  platform: string;
  projectType: string;
  scopeDescription: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateCommissionBrief(brief: CommissionBrief): ValidationResult {
  const errors: Record<string, string> = {};

  if (!brief.clientName || brief.clientName.trim().length < 2) {
    errors.clientName = 'Please provide your name or server network name (at least 2 characters).';
  }

  const contact = brief.contactTag ? brief.contactTag.trim() : '';
  const isDiscordTag = /^.+#[0-9]{4}$/.test(contact) || /^[a-z0-9_.-]{2,32}$/i.test(contact);
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);

  if (!contact || (!isDiscordTag && !isEmail)) {
    errors.contactTag = 'Please provide a valid Discord username (e.g. wp_dev) or email address.';
  }

  const validPlatforms = ['PaperMC (1.20+)', 'Purpur', 'Folia (Multi-thread)', 'Velocity Proxy', 'Fabric'];
  if (!brief.platform || !validPlatforms.includes(brief.platform)) {
    errors.platform = 'Please select a supported server platform.';
  }

  const validTypes = ['Custom New Plugin', 'Bug Fix & Profiling', 'Complete Minigame', 'Full Server Infrastructure'];
  if (!brief.projectType || !validTypes.includes(brief.projectType)) {
    errors.projectType = 'Please select a project type.';
  }

  if (!brief.scopeDescription || brief.scopeDescription.trim().length < 10) {
    errors.scopeDescription = 'Please describe the project scope in at least 10 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function calculateEstimatedTurnaround(projectType: string): string {
  switch (projectType) {
    case 'Bug Fix & Profiling':
      return '24 - 48 Hours';
    case 'Custom New Plugin':
      return '3 - 7 Days';
    case 'Complete Minigame':
      return '7 - 14 Days';
    case 'Full Server Infrastructure':
      return '14 - 21 Days';
    default:
      return '3 - 10 Days';
  }
}

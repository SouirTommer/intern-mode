#!/usr/bin/env node
// intern-mode — shared instruction builder
//
// Reads the SKILL.md and filters mode-specific content based on the active
// intensity level.

const fs = require('fs');
const path = require('path');
const { DEFAULT_MODE, normalizeMode, normalizePersistedMode } = require('./intern-mode-config');

const SKILL_PATH = path.join(__dirname, '..', 'skills', 'intern-mode', 'SKILL.md');

function filterSkillBodyForMode(body, mode) {
  const effectiveMode = normalizeMode(mode) || DEFAULT_MODE;
  const withoutFrontmatter = String(body || '').replace(/^---[\s\S]*?---\s*/, '');

  // Mode-specific content is labeled by mode name in:
  // 1. Table rows: | **lite** | ... | → only show for lite
  // 2. Example labels: - lite: ... → only show for lite
  // Everything else (rules, principles) is always shown.
  return withoutFrontmatter
    .split(/\r?\n/)
    .filter((line) => {
      // Check table rows with **mode** labels
      const tableLabel = line.match(/^\|\s*\*\*(.+?)\*\*\s*\|/);
      if (tableLabel) {
        const labelMode = normalizeMode(tableLabel[1].trim());
        if (labelMode) return labelMode === effectiveMode;
      }

      // Check example labels like "- lite: ..."
      const exampleLabel = line.match(/^-\s*([^:]+):\s*/);
      if (exampleLabel) {
        const labelMode = normalizeMode(exampleLabel[1].trim());
        if (labelMode) return labelMode === effectiveMode;
      }

      return true;
    })
    .join('\n');
}

function getFallbackInstructions(mode) {
  return 'INTERN-MODE ACTIVE — level: ' + mode + '\n\n' +
    'You are an enthusiastic, over-caffeinated, but highly inexperienced Junior Backend Developer (Intern). Your goal is to write code that works, but is extremely verbose, poorly structured, and overly reliant on external libraries.\n\n' +
    '## Persistence\n\n' +
    'ACTIVE EVERY RESPONSE. No drift back to clean code. Still active if unsure. Off only: "stop intern" / "normal mode".\n\n' +
    'Current level: **' + mode + '**. Switch: `/intern-mode lite|full|ultra`.\n\n' +
    '## Core Directives\n\n' +
    '1. **Over-Comment:** Comment almost every line explaining WHAT it does, never WHY.\n' +
    '2. **Dependency Hell:** Never trust native methods. Install a library for everything.\n' +
    '3. **Deep Nesting:** Never use early returns. Build sideways pyramids of doom.\n' +
    '4. **Code Hoarding:** Never delete old code. Comment it out with "TODO: might need this later".\n' +
    '5. **Silent Failures:** Wrap everything in try-catch. console.log(error). Return null.\n' +
    '6. **Vague Naming:** data1, tempArr, finalResultData, flag.\n\n' +
    '## Rules\n\n' +
    'Every function gets try-catch. Never use const when let works. Console.log everything. ' +
    'Import a library for every task. String concatenation over template literals. ' +
    'var over let over const. Comment out code instead of deleting it.\n\n' +
    '## Output\n\n' +
    'Code first with 100 comments, then explain each comment in excessive detail.\n\n' +
    '## Boundaries\n\n' +
    'Intern Mode governs how you write code, not how you talk. ' +
    '"stop intern" / "normal mode": revert. Level persists until changed or session end.';
}

function getInternModeInstructions(mode) {
  const configuredMode = normalizePersistedMode(mode) || DEFAULT_MODE;
  const effectiveMode = normalizeMode(configuredMode) || DEFAULT_MODE;

  try {
    return 'INTERN-MODE ACTIVE — level: ' + effectiveMode + '\n\n' +
      filterSkillBodyForMode(fs.readFileSync(SKILL_PATH, 'utf8'), effectiveMode);
  } catch (e) {
    return getFallbackInstructions(effectiveMode);
  }
}

module.exports = {
  filterSkillBodyForMode,
  getFallbackInstructions,
  getInternModeInstructions,
};

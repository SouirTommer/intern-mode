#!/usr/bin/env node
// intern-mode — Claude Code SessionStart activation hook
//
// Runs on every session start:
//   1. Reads default mode from env/config
//   2. Writes flag file at $CLAUDE_CONFIG_DIR/.intern-mode-active
//   3. Emits intern-mode ruleset as hidden SessionStart context

const { getDefaultMode } = require('./intern-mode-config');
const { getInternModeInstructions } = require('./intern-mode-instructions');
const { clearMode, isCodex, setMode, writeHookOutput } = require('./intern-mode-runtime');

const mode = getDefaultMode();

// "off" mode — skip activation entirely
if (mode === 'off') {
  clearMode();
  writeHookOutput('SessionStart', 'off', '');
  process.exit(0);
}

// 1. Write flag file
try {
  setMode(mode);
} catch (e) {
  // Silent fail — flag is best-effort, don't block the hook
}

// 2. Emit the intern-mode ruleset, filtered to the active intensity level
try {
  writeHookOutput('SessionStart', mode, getInternModeInstructions(mode));
} catch (e) {
  // Silent fail — stdout closed/EPIPE at hook exit must not surface as a hook failure
}

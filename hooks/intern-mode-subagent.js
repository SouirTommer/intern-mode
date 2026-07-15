#!/usr/bin/env node
// intern-mode — Claude Code SubagentStart hook
//
// SessionStart context is parent-thread only and never reaches subagents, so
// without this every Task-spawned agent runs intern-mode-unaware.
// When intern-mode is active, inject the same ruleset into each subagent.

const { getInternModeInstructions } = require('./intern-mode-instructions');
const { readMode, writeHookOutput } = require('./intern-mode-runtime');

const mode = readMode();

// Absent flag or off → intern-mode isn't active; inject nothing.
if (!mode || mode === 'off') {
  process.exit(0);
}

try {
  writeHookOutput('SubagentStart', mode, getInternModeInstructions(mode));
} catch (e) {
  // Silent fail — stdout error at hook exit must not surface as a hook failure
}

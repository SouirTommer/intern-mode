# intern-mode

The chaotic energy of an enthusiastic but inexperienced junior developer.

Where senior devs ask "does this need to exist at all?", intern-mode asks "have you tried installing a library for this?"

## Installation

### From npm (after publishing)

```json
{
  "plugin": ["intern-mode"]
}
```

### From GitHub

```json
{
  "plugin": ["github:souirtommer/opencode-intern-mode"]
}
```

### Local development

```json
{
  "plugin": ["./.opencode/plugins/intern-mode.mjs"]
}
```

## Usage

### Toggle modes

```bash
/intern-mode          # Toggle on (full mode)
/intern-mode lite     # Lite: verbose comments, suggest a dependency
/intern-mode full     # Full: all anti-patterns active (default)
/intern-mode ultra    # Ultra: maximum chaos
/intern-mode off      # Turn off
```

### What each mode does

| Mode | Behavior |
|------|----------|
| **lite** | Add verbose comments, suggest one unnecessary dependency. Keep structure mostly intact. |
| **full** | All anti-patterns active. Deep nesting, code hoarding, silent failures, vague naming. |
| **ultra** | Maximum chaos. Install `is-odd`, `is-even`, `left-pad`. Use `moment.js` for everything. |

## The Anti-Patterns

### 1. Captain Obvious (Over-Commenting)
Comment almost every line explaining WHAT, never WHY.

### 2. Dependency Hell
Never trust native methods. Install a library for everything.

### 3. The Arrow Anti-Pattern (Deep Nesting)
Never use early returns. Build beautiful sideways pyramids of doom.

### 4. Code Hoarding
Never delete old code. Comment it out with "TODO: might need this later".

### 5. Silent Failures
Wrap everything in try-catch. Console.log the error. Return null.

### 6. Magic Strings & Vague Naming
`data1`, `tempArr`, `finalResultData`, `flag`. You know the drill.

## Example

**Task:** "Write a function to check if a number is even."

**intern-mode (full):**
```javascript
// This function checks if a number is even
// It uses the modulo operator to do this
function checkIfNumberIsEven(number) {
  // We need to wrap this in try-catch because it might fail
  try {
    var result;
    // We check if the number is not null
    if (number != null) {
      // We check if the number is not undefined
      if (number != undefined) {
        // We use modulo to check divisibility by 2
        if (number % 2 == 0) {
          result = true;
        } else {
          result = false;
        }
      } else {
        console.log('Undefined input');
        result = null;
      }
    } else {
      console.log('Null input');
      result = null;
    }
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
```

## Configuration

Set default mode via environment variable:

```bash
export INTERN_MODE_DEFAULT_MODE=ultra
```

Or via config file at `~/.config/intern-mode/config.json`:

```json
{
  "defaultMode": "ultra"
}
```

## License

MIT

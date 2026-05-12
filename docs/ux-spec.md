# NINJA UX Spec

Gate: G3 UX / Interaction
Status: PASS
Date: 2026-05-13

## Screens / Views
| View | Purpose | Priority |
|---|---|---|
| Ambient widget | Always-on bottom-right presence | P0 |
| Active panel | Chat, avatar, quick actions, voice/text input | P0 |
| Deep work top bar | Long-task progress and cancellation | P0 |

## User Flows
1. User sees ambient widget, clicks it, active panel opens.
2. User presses Alt+N, active panel toggles open or closed.
3. User types a message, NINJA replies with text and voice if configured.
4. User records voice, NINJA transcribes with Whisper, then replies.
5. User starts a long task demo, deep work bar shows progress and can be cancelled.

## Element Classification
| Element | Screen | Type | Action |
|---|---|---|---|
| Avatar face | Ambient widget | Actionable | Opens active panel |
| NINJA label | Ambient widget | Informational | Display only |
| Status dot | Ambient widget | Informational | Display only |
| Tray Open NINJA | Tray | Actionable | Opens active panel |
| Tray Ambient Mode | Tray | Actionable | Returns to ambient |
| Tray Deep Work Demo | Tray | Actionable | Opens deep-work bar |
| Chat bubble | Active panel | Informational | Display only |
| Quick action chip | Active panel | Actionable | Fills/sends a prompt |
| Mic button | Active panel | Actionable | Starts/stops recording |
| Text input | Active panel | Actionable | Accepts typed message |
| Send button | Active panel | Actionable | Sends typed message |
| Close button | Active panel | Actionable | Returns to ambient |
| Cancel X | Deep work top bar | Actionable | Cancels deep-work display |
| Progress text | Deep work top bar | Informational | Display only |

## States
Ambient widget:
- Loading: breathing avatar with "starting" status.
- Empty: normal idle state.
- Error: red status dot with provider issue in active panel.
- Success: green status dot.

Active panel:
- Loading: thinking status and disabled send while request is pending.
- Empty: initial assistant greeting and quick actions.
- Error: friendly message bubble with retry guidance.
- Success: chat messages render in order.

Deep work top bar:
- Loading: active step and animated progress.
- Empty: hidden unless task is active.
- Error: cancelled state returns to active panel.
- Success: progress reaches 100 percent and completion message appears.

## Accessibility
- Buttons use `aria-label`.
- Inputs use labels or `aria-label`.
- Color is paired with text state.
- Primary controls are keyboard focusable.


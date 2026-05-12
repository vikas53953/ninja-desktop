# NINJA Test Plan

Gate: G7 Test Strategy
Status: PARTIAL
Date: 2026-05-13

## Test Types
| Type | Command | Coverage |
|---|---|---|
| Unit | `npm test` | Memory, conscience, tool registry |
| Build | `npm run build` | Renderer production bundle |
| Secret grep | `npm run smoke:secrets` | No API keys in renderer |
| Audit | `npm audit --audit-level=high` | Dependency vulnerabilities |
| Manual desktop smoke | `npm run dev` | Electron widget, tray, hotkey |

## Evidence Rules
Every milestone update must append dated results to `docs/test-log.md`.


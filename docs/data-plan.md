# NINJA Data Plan

Gate: G4 Data & API
Status: PASS
Date: 2026-05-13

## Source Of Truth
NINJA memory is stored in markdown files under `~/.ninja`. Renderer localStorage is not used as the source of truth.

## Test Data Isolation
Automated tests use temporary directories for memory file tests and never write to the user's real `~/.ninja` folder.

## Migrations
Markdown memory has a stable section structure. Future schema changes should append new sections and keep old content. When the file approaches 50KB, old recent-context entries are summarized instead of deleted.

## Backup Strategy
Before major memory format changes, copy:

```powershell
Copy-Item "$env:USERPROFILE\.ninja\NINJA-BRAIN.md" "$env:USERPROFILE\.ninja\NINJA-BRAIN.md.bak"
```

## Export
Users can manually copy the markdown files. A formal export command is Phase 2+.

## Delete Confirmation
Phase 1 does not expose destructive delete actions. Any future delete tool must be RED or require explicit confirmation.

## Data Retention
Memory is retained locally until Vikas edits or removes the file. Chat history is in renderer memory during Phase 1 and can be persisted in a later milestone if requested.


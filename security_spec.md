# Security Specification: DemocracyAssist

## Data Invariants
1. A comment must have a valid `authorId` matching the authenticated user.
2. `createdAt` must be set to `request.time`.
3. Users can only edit or delete their own comments.
4. Users can only read/write their own user profile under `/users/{userId}`.
5. All IDs must be strictly validated.

## The "Dirty Dozen" Payloads

1. **Identity Spoofing**: Create a comment with `authorId` of another user.
2. **Hidden Field Injection**: Add `isAdmin: true` to a comment or user profile.
3. **Resource Exhaustion**: Send a comment with a 1MB text body.
4. **Time Spoofing**: Set `createdAt` to a date in the past or future.
5. **Cross-User Leak**: Attempt to read another user's profile under `/users/{otherId}`.
6. **Path Poisoning**: Inject `../` or long junk strings into `sectionId` or document IDs.
7. **Orphaned Writes**: Create a comment for a non-existent `sectionId`.
8. **Shadow Update**: Update a comment's `authorId` to take ownership of someone else's post.
9. **State Shortcut**: Try to update the `createdAt` immutable field.
10. **PII Breach**: Query the `users` collection without filtering by specific UID.
11. **Type Poisoning**: Send a list/array where a string is expected for `text`.
12. **Unverified Write**: Attempt to write comments while unauthenticated or with an unverified email.

## The Test Runner (Mock)
A `firestore.rules.test.ts` would verify these scenarios. I will implement the rules to explicitly block these.

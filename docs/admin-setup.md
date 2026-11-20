# Admin area setup

The admin lives at `/admin` (thearchedits.co.uk/admin). It saves edits to Supabase,
and the site reads them from there, so a published edit is live with no redeploy.

## One-off setup

1. Create a free project at supabase.com.
2. SQL Editor: paste all of `supabase/schema.sql` and run it. Safe to run twice.
3. Project Settings > API Keys: copy the Project URL, the publishable key and the secret key.
4. In Vercel, Project Settings > Environment Variables, add these for Production
   (and Preview if you want it there), then redeploy once:

| Name | Value |
| --- | --- |
| `SUPABASE_URL` | the Project URL, like `https://abcd1234.supabase.co` |
| `SUPABASE_SECRET_KEY` | the secret key (or the legacy `service_role` key). Never share it. |
| `SUPABASE_PUBLISHABLE_KEY` | the publishable key (or legacy `anon` key). Used for board uploads. |
| `ADMIN_PASSWORD` | a long password only you know, 14+ characters |

## How it fits together

- `lib/cms/db.ts` is the only code that talks to Supabase. Public reads are cached
  with the tag `cms-edits`; every save, publish, unpublish and delete calls
  `updateTag("cms-edits")`, which is what makes the change live straight away.
  The site also re-checks every five minutes as a safety net.
- `lib/cms/edits.ts` turns a saved edit into the same `Edit` and `Product` shapes the
  code edits use, and merges them newest first among `data/edits.ts`. Nothing else
  on the site knows the difference.
- Tracked links: the form stores the shop's own link and the shop name. The existing
  `affiliateHref()` in `lib/affiliate.ts` wraps it at display time, exactly as for
  code edits, so a new programme added there is picked up by the admin automatically.
- Dates: `published` is set the first time you press Publish; `updated` is set when
  you save changes to a live edit on a later day. IndexNow is pinged after each publish
  or save of a live edit (production only).
- Not in the admin: edits written in `data/edits.ts` (they stay as they are), and the
  `/studio` image generator, which still only lists code edits.

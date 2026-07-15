# PAGE17

Static MVP website for the PAGE17 book club.

Open `index.html` directly or publish the repository with GitHub Pages from the root of the default branch.

## Tickets

The anniversary ticket flow lives in `register.html`, `ticket.html`, and `admin.html`.
It uses Supabase for private receipt storage, ticket issuance, the 60-seat limit, and synchronized check-in.

1. Create a Supabase project and run `supabase/schema.sql` in its SQL editor.
2. Copy `config.example.js` to `config.js` and add the public project URL and anon key.
3. In Supabase Authentication create the organizer accounts, then add their user IDs to `public.organizers`.
4. Keep `config.js` public-safe: never put a service-role key in this repository.

The registration form accepts one named attendee per payment. An organizer verifies the receipt in the admin page, issues the ticket, and uses the generated WhatsApp button to send it. The same admin page can scan/check in tickets from several phones.

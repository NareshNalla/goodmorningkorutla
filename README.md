# Good Morning Korutla — v2 (rebuild)

Fresh rebuild of the Good Morning Korutla daily news site.

## What's new in v2
- **Daily publishing flow**: admin sign-in → dashboard → composer for the
  ☀️ morning and 🌙 evening editions (headline, Telugu/English story, photos,
  YouTube video, date).
- **Public site**: home feed with Morning/Evening filter, post detail pages,
  Program info page, and an Our MLA page (Korutla constituency).
- **Stack**: Vite + React 18 + React Router + Firebase (Firestore, Storage, Auth).
- Reuses the existing Firebase project `news-666`, so all current data carries over.
- Old `articles` were migrated into the new `posts` collection.

## Run locally
```
npm install
npm run dev
```

## Build for Hostinger (static hosting)
```
npm run build   # outputs dist/
```
Upload the contents of `dist/` to `public_html`.

## Admin setup (one-time)
1. In the [Firebase console](https://console.firebase.google.com/) open project
   `news-666` → Authentication → add an admin user (email + password).
2. Apply `firestore.rules` (Firestore Database → Rules) so the public can read
   published posts and only signed-in admins can write.
3. Open `https://goodmorningkorutla.in/admin` and sign in.

## Deploy
The `rebuild` branch holds this v2 source. When approved it can replace `main`,
and `npm run build` output goes to Hostinger `public_html` as before.

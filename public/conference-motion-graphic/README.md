# Conference Motion Graphic Component

This is a coded, cartoon/corporate motion-graphic version of the uploaded conference-room video.
It does not use an MP4 file. It uses SVG + GSAP animation, so it fits the client requirement of a graphical/coded representation.

## Install

```bash
npm install gsap
```

## Usage in Next.js

Place `ConferenceMotionGraphic.tsx` inside your components folder, for example:

```txt
src/components/ConferenceMotionGraphic.tsx
```

Then use it in a page:

```tsx
import ConferenceMotionGraphic from "@/components/ConferenceMotionGraphic";

export default function Page() {
  return <ConferenceMotionGraphic />;
}
```

## Customization

Change these text values in the component:

- `Corporate Event Experience`
- `Premium Conference Showcase`
- `BRAND EVENT`
- `Product Launch • Conference • Meet-up`

You can also change the main blue color by editing the SVG gradients `blueCloth` and `tableTop`.

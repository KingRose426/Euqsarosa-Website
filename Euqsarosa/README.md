# Euqsarosa - Music Production Site

A modern, responsive landing page for electronic music producer Euqsarosa. Built with Next.js, featuring embedded Spotify players and a beautiful dark theme design.

## Features

- 🎵 **Embedded Spotify Players** - Stream music directly on the site
- 🎨 **Modern Dark Theme** - Beautiful gradient design with music visualizers
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Fast Performance** - Built with Next.js for optimal speed
- 🎧 **Music-Focused Design** - Tailored specifically for music producers

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS + DaisyUI
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Customization

### Music Releases

Update the `musicReleases` array in `app/page.js` to add your own tracks:

```javascript
const musicReleases = [
  {
    title: "Your Track Name",
    year: "2024",
    type: "Single/EP/Album",
    spotifyUrl: "https://open.spotify.com/embed/track/YOUR_TRACK_ID",
    description: "Description of your track",
  },
];
```

### Social Links

Update the `socialLinks` array to include your social media profiles:

```javascript
const socialLinks = [
  {
    name: "Spotify",
    icon: Spotify,
    url: "https://open.spotify.com/artist/YOUR_ID",
    color: "text-green-500",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/YOUR_HANDLE",
    color: "text-pink-500",
  },
];
```

### Colors & Styling

The site uses a purple/pink gradient theme. You can customize colors in:

- `app/globals.css` - Custom CSS variables and animations
- `tailwind.config.js` - Tailwind configuration

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The site can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform

## License

This project is licensed under the MIT License.

---

**Euqsarosa** - Pushing the boundaries of electronic music production

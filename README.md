# Ragnarok FTC Team 24358 - Official Website

Rome Was Built In An Hour.

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   cd /path/to/metallum-ultorum.github.io
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   FTC_API_USERNAME=boonstra
   FTC_API_KEY=your_api_key_here
   ```

   **📖 For detailed instructions, see [API_SETUP.md](./API_SETUP.md)**

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:24358](http://localhost:24358) in your browser.

## 📝 Content Management

All content is managed through simple TypeScript files in the `/data` folder. No coding experience needed!

### Adding/Editing Team Members

Edit `/data/members.ts`:

```typescript
{
  id: "unique-id",                    // Unique identifier
  name: "John Doe",                   // Member name
  role: "Builder",                    // Current role
  image: "/images/members/john.png",  // Photo path
  bio: "Description here...",          // Short bio
  years: [2024, 2025],                // Years active
  isElite: false,                     // true for captains/leadership
  isAlumni: false,                    // true for alumni
  historicalRoles: [                  // Optional: role history
    { year: 2024, role: "Programmer" },
    { year: 2025, role: "Builder" }
  ]
}
```

**To add a new member:**

1. Add their photo to `/public/images/members/`
2. Add their entry to the `members` array in `/data/members.ts`
3. Save the file - changes appear immediately in dev mode!

### Adding Achievements

Edit `/data/achievements.ts`:

```typescript
{
  id: "unique-id",
  title: "2025 State Championship",
  award: "Inspire Award",
  place: "1st Place",
  icon: "gold",  // "gold", "silver", or "bronze"
  year: 2025
}
```

### Adding/Editing Seasons

Edit `/data/seasons.ts` to add new seasons or update existing ones.

### Updating Team Info

Edit `/data/team-info.ts` to update contact information and social links.

### Current Updates

Edit `/data/current-update.ts` to change the dynamic homepage announcement.

## 🎨 Styling

The site uses Tailwind CSS with custom brand colors:

- **Ultimate Red**: `#ff0000` - Primary brand color
- **Elite Gold**: `#ffeb29` - Accent color for elite members
- **Gear Gray**: `#333333` - Dark backgrounds
- **Ash Black**: `#010101` - Main background

Colors can be used in Tailwind classes:

- `bg-ultimate-red`, `text-ultimate-red`
- `bg-elite-gold`, `text-elite-gold`
- `bg-gear-gray`, `text-gear-gray`
- `bg-ash-black`, `text-ash-black`

## 🔄 FTC API Integration

The site automatically fetches and caches match data from the FTC Events API:

- **Normal days**: Cache for 24 hours
- **Fridays & Sundays (CST)**: Cache for 30 minutes
- **Saturdays (CST)**: Cache for 5 minutes

This ensures fresh data during competition weekends without overwhelming the API.

### API Configuration

Update API settings in `/lib/ftc-api.ts`:

- `SEASON`: Current season year
- `REGION`: Region code (default: USIA)
- `LEAGUE`: League code (default: ACPS - Acropolis)
- `TEAM_NUMBER`: Team number (default: 24358)

## 📁 Project Structure

```
/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with nav/footer
│   ├── page.tsx             # Homepage
│   ├── members/             # Team members page
│   ├── results/             # Match results page
│   ├── seasons/[slug]/      # Dynamic season pages
│   └── api/                 # API routes
│       ├── rankings/        # FTC rankings endpoint
│       └── team-stats/      # Team statistics endpoint
│
├── components/              # Reusable React components
│   ├── Navigation.tsx       # Main navigation bar
│   ├── Footer.tsx           # Site footer
│   ├── MemberCard.tsx       # Team member card
│   ├── AchievementCard.tsx  # Achievement display
│   ├── RankingsTable.tsx    # Match rankings table
│   └── ...
│
├── data/                    # Content management (edit these!)
│   ├── members.ts           # Team members data
│   ├── achievements.ts      # Team achievements
│   ├── seasons.ts           # Season information
│   ├── team-info.ts         # Contact & social links
│   ├── sponsors.ts          # Sponsor information
│   └── current-update.ts    # Homepage announcement
│
├── lib/                     # Utility functions
│   ├── types.ts             # TypeScript types
│   ├── cache.ts             # Caching logic
│   └── ftc-api.ts           # FTC API integration
│
├── public/                  # Static assets
│   ├── images/              # Images and photos
│   │   ├── members/         # Team member photos
│   │   ├── seasons/         # Season/robot photos
│   │   └── sponsors/        # Sponsor logos
│   └── fonts/               # Custom fonts
│
└── styles/
    └── globals.css          # Global styles
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

   ```bash
   git add .
   git commit -m "Update website"
   git push
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables:
     - `FTC_API_USERNAME`: Your FTC API username
     - `FTC_API_KEY`: Your FTC API key
   - Click "Deploy"

3. **Set up custom domain**
   - In Vercel project settings, go to "Domains"
   - Add `ragnarokftc.com`
   - Follow DNS configuration instructions

Your site will auto-deploy on every push to main!

## 📱 Adding Images

### Team Member Photos

1. Add photos to `/public/images/members/`
2. Recommended size: 800x800px minimum
3. Format: PNG or JPG
4. Reference in `/data/members.ts` as `/images/members/filename.png`

### Season/Robot Photos

1. Add photos to `/public/images/seasons/`
2. Recommended size: 1200x800px minimum
3. Reference in `/data/seasons.ts`

### Sponsor Logos

1. Add logos to `/public/images/sponsors/`
2. Recommended: PNG with transparent background
3. Reference in `/data/sponsors.ts`

## 🐛 Troubleshooting

### Development server won't start

```bash
rm -rf .next node_modules
npm install
npm run dev
```

### API not returning data

- Check `.env.local` has correct API credentials
- Verify FTC API key is active
- Check console for error messages
- **See [API_SETUP.md](./API_SETUP.md) for detailed troubleshooting**

### Images not loading

- Ensure images are in `/public/images/` directory
- Check file paths start with `/images/` not `/public/images/`
- Verify image file extensions match (case-sensitive)

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📄 License

© 2025 Ragnarok FTC Team 24358. All rights reserved.

## 🤝 Contributing

This website is maintained by the Ragnarok programming team. If you're a team member:

1. Make your changes in a new branch
2. Test locally with `npm run dev`
3. Push and create a pull request
4. Wait for review before merging

## 💡 Tips for New Developers

- **Start with data files**: Most updates only need changes in `/data/`
- **Test locally first**: Always run `npm run dev` to see changes before deploying
- **Ask for help**: Don't hesitate to reach out to senior team members
- **Read the code comments**: Lots of helpful explanations throughout
- **Use TypeScript**: It will catch errors before they happen!

## 📞 Support

Questions? Contact the programming team:

- Email: <roboticswaukee@gmail.com>
- GitHub: [@24358-ragnarok](https://github.com/24358-ragnarok)

---

Built with ❤️ by Ragnarok FTC Team 24358

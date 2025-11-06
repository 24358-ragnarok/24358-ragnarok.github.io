# Contributing to Ragnarok FTC Website

Thank you for contributing to our team website! This guide will help you make changes safely and effectively.

## Quick Start

### For Content Updates (No Coding Required)

If you just want to update content like team members, achievements, or announcements:

1. **Navigate to the `/data` folder**
2. **Edit the appropriate file:**
   - `members.ts` - Add/remove/edit team members
   - `achievements.ts` - Add new awards
   - `team-info.ts` - Update contact info
   - `current-update.ts` - Change homepage announcement
   - `seasons.ts` - Add new season information
   - `sponsors.ts` - Add sponsor logos

3. **Follow the examples in each file**
4. **Test your changes locally** (see below)
5. **Create a pull request**

### Testing Locally

Before submitting changes:

```bash
# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:24358` to see your changes live!

## Making Content Changes

### Adding a New Team Member

1. **Add their photo** to `/public/images/members/`
   - File format: PNG or JPG
   - Recommended size: At least 800x800px
   - Name it clearly (e.g., `john-doe.png`)

2. **Edit `/data/members.ts`**:

```typescript
// Add to the members array:
{
  id: "john-doe",  // unique, lowercase, no spaces
  name: "John Doe",
  role: "Builder",
  image: "/images/members/john-doe.png",
  bio: "John loves building robots and solving complex engineering challenges.",
  years: [2025],  // years active on team
  isElite: false,  // true only for captains/leadership
  historicalRoles: []  // leave empty for new members
}
```

3. **Save and test** - your changes appear immediately in dev mode!

### Removing a Team Member

**Option 1: Move to Alumni** (Recommended)

```typescript
// In /data/members.ts, move their entry from 'members' to 'alumni' array
// and set isAlumni: true
```

**Option 2: Complete Removal**

- Delete their entry from `/data/members.ts`
- Their photo will remain in `/public/images/members/` (you can delete it)

### Adding an Achievement

Edit `/data/achievements.ts`:

```typescript
{
  id: "2025-world-championship",
  title: "2025 World Championship",
  award: "Inspire Award",
  place: "1st Place",
  icon: "gold",  // "gold", "silver", or "bronze"
  year: 2025
}
```

Achievements appear in the order listed (put newest first).

### Updating the Homepage Announcement

Edit `/data/current-update.ts`:

```typescript
export const currentUpdate: CurrentUpdate = {
  title: "Heading for State Championship!",
  content: "Our team is preparing for the state championship next week. We've been working hard on autonomous routines!",
  date: "2025-11-15",  // YYYY-MM-DD format
  type: "competition"   // "announcement", "competition", "achievement", or "event"
};
```

## 💻 For Developers: Code Changes

### Setting Up Development Environment

```bash
# Clone the repo
git clone https://github.com/24358-ragnarok/metallum-ultorum.github.io.git
cd metallum-ultorum.github.io

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
# Edit .env.local and add your FTC API key

# Start dev server
npm run dev
```

### Project Structure

```
app/              → Pages and API routes
components/       → Reusable React components
data/             → Content (edit these!)
lib/              → Utility functions and types
public/           → Static files (images, fonts)
```

### Creating a New Component

1. Create file in `/components/YourComponent.tsx`
2. Follow existing component patterns
3. Add proper TypeScript types
4. Include JSDoc comments
5. Export as default

Example:

```typescript
/**
 * YourComponent
 * 
 * Brief description of what this component does
 */

interface YourComponentProps {
  title: string;
  // ... props
}

export default function YourComponent({ title }: YourComponentProps) {
  return (
    <div className="...">
      {/* Component content */}
    </div>
  );
}
```

### Making a New Page

1. Create folder in `/app/your-page/`
2. Add `page.tsx` in that folder
3. Export metadata and default component
4. Add link to navigation in `/components/Navigation.tsx`

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Use brand colors: `bg-ultimate-red`, `text-elite-gold`, etc.
- Add hover states for interactive elements
- Ensure accessibility (proper ARIA labels, contrast ratios)

### Code Style

- Use TypeScript for type safety
- Follow existing naming conventions
- Add comments for complex logic
- Keep functions small and focused
- Use async/await over .then()

## 🔄 Git Workflow

### For Content Changes

```bash
# Create a new branch
git checkout -b update/add-new-member

# Make your changes to files in /data

# Stage and commit
git add data/members.ts
git commit -m "Add John Doe to team members"

# Push to GitHub
git push origin update/add-new-member

# Create Pull Request on GitHub
```

### For Code Changes

```bash
# Create a feature branch
git checkout -b feature/new-component

# Make your changes

# Run linter
npm run lint

# Test build
npm run build

# Commit changes
git add .
git commit -m "Add new component for displaying sponsors"

# Push and create PR
git push origin feature/new-component
```

### Commit Message Guidelines

- Use present tense ("Add feature" not "Added feature")
- Be descriptive but concise
- Reference issues if applicable

Examples:

- `Add Connor Israel to team members`
- `Update homepage announcement for state championship`
- `Fix mobile navigation menu overflow`
- `Improve loading performance on results page`

## Pull Request Process

1. **Create your branch** from `main`
2. **Make your changes**
3. **Test thoroughly**:
   - Run `npm run dev` and check all pages
   - Test on mobile viewport
   - Verify no console errors
4. **Create Pull Request**:
   - Clear title describing changes
   - Description of what and why
   - Screenshots if visual changes
5. **Wait for review** from senior team members
6. **Make requested changes** if any
7. **Merge** once approved

## Reporting Issues

Found a bug? Create an issue on GitHub:

1. Go to GitHub Issues
2. Click "New Issue"
3. Describe:
   - What you expected to happen
   - What actually happened
   - Steps to reproduce
   - Screenshots if applicable

## Design Guidelines

### Colors

- **Primary**: Ultimate Red (#ff0000)
- **Accent**: Elite Gold (#ffeb29)
- **Backgrounds**: Gear Gray (#333333), Ash Black (#010101)

### Typography

- **Headings**: Top Show font (custom)
- **Body**: System font stack

### Spacing

- Use Tailwind spacing scale (4px increments)
- Consistent padding/margins across similar elements

### Animations

- Keep subtle and purposeful
- Use Framer Motion for complex animations
- Respect `prefers-reduced-motion`

## Getting Help

Stuck? Reach out:

- **In-person**: Ask senior programming team members
- **Email**: <roboticswaukee@gmail.com>
- **GitHub**: Open an issue or discussion

## Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Framer Motion](https://www.framer.com/motion/)

## Important Notes

- **Never commit `.env.local`** (contains API keys)
- **Test before deploying** (especially API changes)
- **Keep data files formatted** (consistent spacing/indentation)
- **Optimize images** before adding (compress large files)
- **Document complex code** (help future team members)

---

Thank you for contributing to Ragnarok!

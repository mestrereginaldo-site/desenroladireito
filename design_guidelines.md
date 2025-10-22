# Design Guidelines: Desenrolando Direito - Blog Jurídico Profissional

## Design Approach
**System-Based with Editorial Excellence**: Drawing from Medium's reading experience, Substack's clean layouts, and established legal publications. Focus on professional credibility, optimal readability for long-form content (1000+ words), and strategic ad placement zones.

## Core Design Principles
1. **Editorial Authority**: Professional, trustworthy visual identity befitting legal content
2. **Reading Optimization**: Typography and spacing designed for extended reading sessions
3. **Ad-Friendly Architecture**: Strategic whitespace and sections for AdSense integration
4. **Scan-to-Read Flow**: Clear hierarchy allowing quick scanning before deep reading

## Color Palette

**Primary Brand Colors (Dark Mode)**:
- Deep Navy: 220 25% 15% (primary brand, headers)
- Gold Accent: 45 90% 55% (sparingly for CTAs and emphasis - represents expertise and trust)
- Neutral Background: 220 15% 10% (main background)

**Primary Brand Colors (Light Mode)**:
- Deep Navy: 220 40% 20% (text and headers)
- Gold Accent: 45 75% 45% (CTAs and highlights)
- Warm White: 40 20% 98% (main background)
- Soft Gray: 220 10% 95% (card backgrounds)

**Content Colors**:
- Body Text (Dark): 220 8% 85%
- Body Text (Light): 220 30% 25%
- Muted Text: 220 5% 60% (metadata, captions)
- Link Blue: 210 100% 60% (article links)

## Typography

**Font Families**:
- Headers: 'Playfair Display' (serif, elegant, authoritative)
- Body: 'Inter' (sans-serif, optimal readability)
- Code/Legal Citations: 'JetBrains Mono'

**Hierarchy**:
- H1 (Page Titles): 3.5rem/4rem bold
- H2 (Article Titles on Homepage): 2rem/2.5rem semibold
- H3 (Section Headers in Articles): 1.75rem bold
- Body Text: 1.125rem/1.875 (18px with generous line-height for readability)
- Metadata: 0.875rem medium

## Layout System

**Spacing Units**: Tailwind units of 4, 6, 8, 12, 16, 20, 24 (focused on generous whitespace)

**Container Strategy**:
- Full-width header/footer: w-full
- Content container: max-w-7xl mx-auto
- Article reading width: max-w-3xl mx-auto (optimal ~65-75 characters per line)
- Card grids: max-w-6xl mx-auto

**Responsive Breakpoints**: Standard Tailwind (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)

## Component Library

**Homepage Layout**:
- **Hero Section**: Full-width banner with site identity, tagline "Descomplicando o Direito Brasileiro" - use a professional law/justice themed hero image (books, scales, modern office) - height: 60vh
- **Featured Article**: Large card with image, title, excerpt (150 chars), author, date, category badge
- **Article Grid**: 2-column on desktop (lg:grid-cols-2), single column mobile - cards with thumbnail, title, excerpt, metadata
- **Category Navigation**: Horizontal scroll/grid with category chips (Civil, Penal, Trabalhista, Consumidor, Constitucional, Empresarial)
- **Ad Zones**: Designated between article rows (every 4-6 articles)

**Article Page Layout**:
- **Article Header**: Title, author info with avatar, publication date, reading time, category badges
- **Content Area**: Single column, max-w-3xl, generous padding (px-6 md:px-8)
- **Typography Spacing**: mb-6 between paragraphs, mb-8 for section headers
- **Pull Quotes**: Larger text with left border accent in gold
- **Table of Contents**: Sticky sidebar on desktop (hidden on mobile) with jump links
- **Ad Placements**: After introduction paragraph, mid-article, before related articles
- **Related Articles**: 3-column grid at bottom

**Navigation Header**:
- Logo/Site name on left
- Horizontal menu: Início, Categorias (dropdown), Sobre, Contato
- Search icon button
- Dark/Light mode toggle
- Sticky on scroll with subtle shadow

**Footer**:
- 3-column layout: About/Description, Quick Links (Categories), Newsletter Signup
- Social media links
- Copyright and legal disclaimer
- Trust elements: "Conteúdo produzido por advogados"

**Cards (Article Previews)**:
- Rounded corners (rounded-lg)
- Subtle shadow on hover
- Image: aspect-video, object-cover
- Content padding: p-6
- Category badge: Small pill with category color
- Read more link in gold accent

**Admin Panel** (if needed):
- Clean dashboard with article list table
- WYSIWYG editor with formatting toolbar
- Category selection checkboxes
- SEO fields: meta title, description, keywords
- Featured image upload with preview
- Publish/Draft status toggle

## Animations
Minimal and purposeful only:
- Smooth hover transitions on cards (scale-105 on hover)
- Fade-in on scroll for article cards (subtle)
- Navigation sticky behavior (transform with shadow)
- NO distracting parallax or excessive motion

## Images

**Required Images**:
1. **Hero Image**: Professional law-themed background (modern law library, scales of justice in contemporary setting, or abstract legal concepts) - dimensions: 1920x800px minimum
2. **Article Thumbnails**: Each article needs a relevant featured image (16:9 aspect ratio, 800x450px minimum)
3. **Author Avatars**: Professional headshots (150x150px, rounded-full)
4. **Category Icons**: Optional small icons for category badges

**Image Treatment**: Slight overlay on hero (dark: rgba(0,0,0,0.3), light: rgba(255,255,255,0.1)) for text legibility

## AdSense Optimization Zones
- Leaderboard (728x90) below header
- Large Rectangle (336x280) in sidebar on article pages
- In-feed ads between article cards (every 6 articles)
- Bottom banner before footer
- In-article ads (after 2nd and 5th paragraph)

## SEO & Performance Considerations
- Semantic HTML (article, section, aside tags)
- Meta descriptions under 160 chars
- Breadcrumb navigation for categories
- Schema.org structured data for articles
- Lazy loading images below fold
- Minimal JavaScript for fast load times

This design balances professional credibility, optimal reading experience for long-form legal content, and strategic monetization through clear ad placement zones while maintaining user experience quality.
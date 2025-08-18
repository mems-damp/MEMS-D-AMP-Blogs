# MEMS D-AMP Blog

A comprehensive blog platform for MEMS students at IIT Bombay, featuring course reviews, internship experiences, academic guidance, and resources.

## 🎯 Overview

The MEMS D-AMP Blog is designed to support MEMS undergraduate students with:
- **Course Reviews**: Comprehensive reviews with difficulty ratings, professor insights, and prerequisites
- **Experiences Hub**: Internship experiences, higher studies guidance, and project stories
- **Course Tracks**: Visual guides for popular course combinations and academic pathways
- **Opportunities**: Short-term internships, scholarships, and competitions
- **Events**: Documentation of D-AMP events and workshops
- **Team**: Meet the D-AMP team and mentors

## 🚀 Features

### Core Features
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Search Functionality**: Client-side search with Fuse.js
- **Interactive Filters**: Filter content by category, timeline, and type
- **Modern UI**: Clean, accessible design with smooth animations
- **Static Site**: Fast loading with Eleventy static site generator

### Content Sections
- **Homepage**: Featured content and announcements
- **Course Reviews**: Detailed course information with ratings
- **Experiences**: Internship and higher studies experiences
- **Course Tracks**: Visual academic pathway guides
- **Opportunities**: Short-term opportunities and competitions
- **Events**: Event documentation and resources
- **Team**: Team profiles and contact information
- **Support**: FAQ and contact forms

## 🛠️ Tech Stack

- **Static Site Generator**: Eleventy (11ty)
- **Styling**: Tailwind CSS
- **JavaScript**: Alpine.js for interactivity
- **Search**: Fuse.js for client-side search
- **Hosting**: GitHub Pages (recommended)
- **Content**: Markdown files for easy updates

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mems-damp-blog.git
   cd mems-damp-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the CSS**
   ```bash
   npx tailwindcss -i ./src/css/tailwind.css -o ./src/css/styles.css --watch
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
mems-damp-blog/
├── src/
│   ├── _includes/          # Reusable components
│   │   ├── nav.njk        # Navigation
│   │   └── footer.njk     # Footer
│   ├── _layouts/          # Page layouts
│   │   └── base.njk       # Base layout
│   ├── css/               # Stylesheets
│   │   └── tailwind.css   # Tailwind CSS
│   ├── js/                # JavaScript files
│   │   └── main.js        # Main JS functionality
│   ├── courses/           # Course review pages
│   ├── experiences/       # Experience pages
│   ├── tracks/            # Course track pages
│   ├── opportunities/     # Opportunity pages
│   ├── events/            # Event pages
│   ├── team/              # Team pages
│   ├── support/           # Support pages
│   ├── index.njk          # Homepage
│   ├── courses.njk        # Course reviews page
│   ├── experiences.njk    # Experiences page
│   ├── tracks.njk         # Course tracks page
│   ├── opportunities.njk  # Opportunities page
│   ├── events.njk         # Events page
│   ├── team.njk           # Team page
│   └── support.njk        # Support page
├── _site/                 # Built site (generated)
├── eleventy.config.js     # Eleventy configuration
├── tailwind.config.js     # Tailwind configuration
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🎨 Customization

### Design System
The project uses a consistent design system with:
- **Primary Color**: `#0453f1` (vibrant blue)
- **Secondary Color**: `#ffffea` (light warm yellow)
- **Background**: `#ffffff` (white)
- **Typography**: Inter font family

### Adding Content
1. **Course Reviews**: Add markdown files in `src/courses/`
2. **Experiences**: Add markdown files in `src/experiences/`
3. **Events**: Update `src/events.njk` with new events
4. **Team**: Update `src/team.njk` with team information

### Styling
- Modify `src/css/tailwind.css` for custom styles
- Update `tailwind.config.js` for theme customization
- Add new components in `src/_includes/`

## 🚀 Deployment

### GitHub Pages
1. Push your code to GitHub
2. Enable GitHub Pages in repository settings
3. Set source to `/docs` or `gh-pages` branch
4. Update build script to output to correct directory

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `_site`
4. Deploy automatically on push

### Vercel
1. Import your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `_site`
4. Deploy automatically

## 📝 Content Management

### Adding New Course Reviews
1. Create a new markdown file in `src/courses/`
2. Use the frontmatter template:
   ```yaml
   ---
   layout: base.njk
   title: "Course Code - Course Name"
   description: "Brief description of the course"
   category: "core|elective|minor"
   difficulty: "easy|medium|hard"
   credits: 3
   semester: "1st Year, 1st Sem"
   prerequisites: "None"
   professors: ["Prof. Name"]
   textbooks: ["Textbook Name"]
   motivation: "Why take this course"
   senior_insights: "Insights from seniors"
   ---
   ```

### Adding New Experiences
1. Create a new markdown file in `src/experiences/`
2. Use the frontmatter template:
   ```yaml
   ---
   layout: base.njk
   title: "Experience Title"
   description: "Brief description"
   category: "internship|higher-studies|projects"
   type: "internship|research|project"
   company: "Company/Institution"
   duration: "Summer 2024"
   location: "Location"
   cpi_requirement: "8.5+"
   ---
   ```

## 🔧 Development

### Available Scripts
- `npm run dev`: Start development server with live reload
- `npm run build`: Build for production
- `npm run serve`: Serve built site locally
- `npm run clean`: Clean build directory

### Development Workflow
1. Make changes to source files
2. Run `npm run dev` for live development
3. Test changes in browser
4. Build with `npm run build`
5. Deploy to hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📞 Support

For questions or support:
- **Email**: damp.mems@iitb.ac.in
- **Team Page**: `/team` for individual contacts
- **Support Page**: `/support` for FAQs

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **MEMS D-AMP Team**: For content and guidance
- **IIT Bombay MEMS Department**: For support
- **Eleventy Community**: For the excellent static site generator
- **Tailwind CSS**: For the utility-first CSS framework

---

Built with ❤️ for MEMS students at IIT Bombay # MEMS-D-AMP-Blogs

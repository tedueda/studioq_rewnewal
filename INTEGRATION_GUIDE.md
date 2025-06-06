# Blog Cascade Integration Guide

## Overview

This integration connects the AI-powered blog generation system (`blog_cascade`) with the Studio Q website (`studioq_rewnewal`), enabling automatic creation and publishing of blog posts to the main website.

## Architecture

The integration consists of three main components:

1. **Blog Cascade System** (`/blog_cascade/`) - AI blog generation with OpenAI API
2. **Studio Q Bridge** (`/blog_cascade/studioq-bridge.js`) - Data format converter
3. **Integration Module** (`/blog/blog-automation/blog-cascade-integration.js`) - Publishing system

## Workflow

```
Blog Cascade UI → Generate Content → Studio Q Bridge → Integration Module → Published Blog Post
```

### Step 1: Content Generation
- User inputs blog parameters in blog_cascade UI
- AI generates structured content using OpenAI API
- Content includes title, meta description, keywords, and sections

### Step 2: Format Conversion
- `studioq-bridge.js` converts blog_cascade output to Studio Q format
- Maps target audience to appropriate categories
- Selects featured images based on content type
- Generates SEO-optimized slugs and metadata

### Step 3: Publishing
- `blog-cascade-integration.js` processes the converted data
- Creates HTML blog post using Studio Q template
- Updates main website's blog preview section
- Maintains maximum of 3 blog cards on homepage

## File Structure

```
studioq_rewnewal/
├── blog/
│   ├── blog-automation/
│   │   ├── blog-cascade-integration.js    # Main integration module
│   │   ├── blog-generator.js              # Existing blog generator
│   │   ├── generated-posts/               # Generated JSON data
│   │   └── templates/
│   │       └── blog-post-template.html    # Blog post template
│   └── [generated-posts].html             # Published blog posts
├── index.html                             # Main website (updated with new posts)
└── INTEGRATION_GUIDE.md                   # This guide

blog_cascade/
├── studioq-bridge.js                      # Format converter
├── integration-workflow.js                # Complete workflow manager
└── output/                                # Generated data files
```

## Usage

### Manual Integration

1. **Generate blog data in blog_cascade:**
   ```bash
   cd blog_cascade
   node studioq-bridge.js test
   ```

2. **Process and publish to Studio Q:**
   ```bash
   cd studioq_rewnewal/blog/blog-automation
   node blog-cascade-integration.js process ../../../blog_cascade/output/studioq-[timestamp].json
   ```

### Automated Workflow

Run the complete workflow with test data:
```bash
cd blog_cascade
node integration-workflow.js test
```

Run with custom data:
```bash
cd blog_cascade
node integration-workflow.js run path/to/data.json
```

## Data Format

### Input (Blog Cascade Format)
```json
{
  "title": "Blog post title",
  "mainKeyword": "Primary keyword",
  "targetAudience": "Target audience",
  "metaDescription": "SEO description",
  "articleLength": "Word count",
  "referenceUrl": "Reference URL"
}
```

### Output (Studio Q Format)
```json
{
  "title": "Blog post title",
  "slug": "url-friendly-slug",
  "date": "2025.06.06",
  "category": "映像制作",
  "image": "featured-image.jpg",
  "excerpt": "Brief description",
  "content": "<h2>HTML content</h2>",
  "author": "スタジオQ AIチーム"
}
```

## Category Mapping

The system automatically maps target audiences to appropriate categories:

- **映像制作**: 映像制作者, 動画クリエイター, ビデオグラファー
- **音響技術**: 音響エンジニア, サウンドデザイナー
- **ライブ配信**: 配信者, ストリーマー
- **バーチャルプロダクション**: VRクリエイター, ARデベロッパー
- **機材紹介**: カメラマン, フォトグラファー
- **撮影テクニック**: 撮影技術関連

## Image Selection

Featured images are automatically selected based on category:

- **映像制作**: `slide1.jpg`
- **音響技術**: `tascam02-1-jpg.webp`
- **ライブ配信**: `bl04.png`
- **バーチャルプロダクション**: `cropped-slide3-2_1920-jpg.webp`
- **機材紹介**: `slide4-2_1920-jpg.webp`
- **撮影テクニック**: `top3-1.jpg`

## SEO Features

- **Meta Tags**: Automatic title and description generation
- **Open Graph**: Social media sharing optimization
- **JSON-LD**: Structured data for search engines
- **URL Slugs**: SEO-friendly URLs with timestamps
- **Image Alt Tags**: Accessibility and SEO optimization

## Deployment

The integration works with Studio Q's existing deployment pipeline:

1. **GitHub Pages**: Automatic deployment on push to main branch
2. **Vercel**: Connected to GitHub repository
3. **Bolt.new**: Manual deployment option

## Troubleshooting

### Common Issues

1. **Path Errors**: Ensure correct directory structure
2. **Missing Dependencies**: Run `npm install` in blog-automation directory
3. **Template Errors**: Verify blog-post-template.html exists
4. **Image Issues**: Check that referenced images exist in `/images/` directory

### Debug Mode

Enable detailed logging by setting environment variable:
```bash
DEBUG=true node integration-workflow.js test
```

## Future Enhancements

- **RSS Feed Generation**: Automatic RSS updates
- **Sitemap Updates**: SEO sitemap maintenance
- **Social Media Integration**: Automatic social posting
- **Analytics Integration**: Performance tracking
- **Content Scheduling**: Delayed publishing options

## Support

For issues or questions regarding the integration:

1. Check the generated JSON files in `generated-posts/` directory
2. Verify blog post HTML output in `/blog/` directory
3. Review console output for error messages
4. Test with sample data using `integration-workflow.js test`

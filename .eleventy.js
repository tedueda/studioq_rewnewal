const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt) {
  let metadata = await Image(src, {
    widths: [300, 600, 900],
    formats: ["webp", "jpeg"],
    outputDir: "./_site/img/"
  });
  
  return metadata;
}

module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("images");

  // 日付フィルター
  eleventyConfig.addFilter("dateFilter", function(date) {
    return new Date(date).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });


  
  // パススルーコピー
  eleventyConfig.addPassthroughCopy("blog/**/*.html");
  eleventyConfig.addPassthroughCopy("blog/images");
  
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};

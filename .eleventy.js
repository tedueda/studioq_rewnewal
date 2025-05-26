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
  // ブログ投稿のコレクションを設定
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("blog/posts/*.md");
  });

  // 静的ファイルのコピー
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("blog/**/*.css");
  eleventyConfig.addPassthroughCopy("blog/images");

  // 日付文字列フィルター
  eleventyConfig.addFilter("dateString", function(date) {
    return new Date(date).toISOString().split('T')[0];
  });

  // 日付フィルター
  eleventyConfig.addFilter("dateFilter", function(date) {
    return new Date(date).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  
  // パススルーコピー
  eleventyConfig.addPassthroughCopy("admin");
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

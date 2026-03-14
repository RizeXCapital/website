import { describe, it, expect } from "vitest";
import {
  getAllPosts,
  getPostBySlug,
  getPostsByCategory,
  getRecentPosts,
  getRelatedPosts,
} from "@/lib/blog";

describe("getAllPosts", () => {
  // Test 1: Returns all posts sorted by date desc
  it("returns all posts sorted by date descending", () => {
    const posts = getAllPosts();

    expect(posts).toHaveLength(3);
    // Most recent first
    expect(posts[0].slug).toBe(
      "change-healthcare-attack-what-it-means-for-your-practice"
    );
    // Oldest last
    expect(posts[2].slug).toBe("how-ai-is-changing-medical-billing");

    // Verify date ordering
    for (let i = 0; i < posts.length - 1; i++) {
      expect(new Date(posts[i].date).getTime()).toBeGreaterThanOrEqual(
        new Date(posts[i + 1].date).getTime()
      );
    }
  });

  // Test 2: Each post has required fields
  it("returns posts with all required fields", () => {
    const posts = getAllPosts();

    for (const post of posts) {
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.date).toBeTruthy();
      expect(post.author).toBeTruthy();
      expect(post.category).toBeTruthy();
      expect(post.excerpt).toBeTruthy();
      expect(post.readingTime).toBeGreaterThanOrEqual(1);
    }
  });

  // Test 8: Reading time is positive integer
  it("computes reading time as a positive integer", () => {
    const posts = getAllPosts();

    for (const post of posts) {
      expect(post.readingTime).toBeGreaterThanOrEqual(1);
      expect(Number.isInteger(post.readingTime)).toBe(true);
    }
  });
});

describe("getPostBySlug", () => {
  // Test 3: Returns undefined for missing slug
  it("returns undefined for a nonexistent slug", async () => {
    const post = await getPostBySlug("this-slug-does-not-exist");
    expect(post).toBeUndefined();
  });

  // Test 4: Returns post with HTML content
  it("returns post with rendered HTML content", async () => {
    const post = await getPostBySlug(
      "change-healthcare-attack-what-it-means-for-your-practice"
    );

    expect(post).toBeDefined();
    expect(post!.content).toBeTruthy();
    expect(post!.content).toContain("<"); // contains HTML tags
    expect(post!.slug).toBe(
      "change-healthcare-attack-what-it-means-for-your-practice"
    );
    expect(post!.title).toBeTruthy();
  });
});

describe("getPostsByCategory", () => {
  // Test 5: Filters by category
  it("returns only posts matching the given category", () => {
    const posts = getPostsByCategory("sovereign-rcm");

    expect(posts.length).toBeGreaterThan(0);
    for (const post of posts) {
      expect(post.category).toBe("sovereign-rcm");
    }
  });

  it("returns empty array for category with no posts", () => {
    const posts = getPostsByCategory("company-news");
    expect(posts).toHaveLength(0);
  });
});

describe("getRecentPosts", () => {
  // Test 6: Respects count parameter
  it("returns only the requested number of posts", () => {
    const posts = getRecentPosts(1);
    expect(posts).toHaveLength(1);
    expect(posts[0].slug).toBe(
      "change-healthcare-attack-what-it-means-for-your-practice"
    );
  });

  it("returns all posts when count exceeds total", () => {
    const posts = getRecentPosts(100);
    expect(posts).toHaveLength(3);
  });
});

describe("getRelatedPosts", () => {
  // Test 7: Related posts fills from other categories
  it("fills with posts from other categories when same-category count is insufficient", () => {
    // sovereign-rcm has 1 post. Requesting 5 related for that post.
    // Excludes current post, so 0 same-category + 2 other-category = 2 posts.
    const posts = getRelatedPosts(
      "change-healthcare-attack-what-it-means-for-your-practice",
      "sovereign-rcm",
      5
    );

    expect(posts).toHaveLength(2);
    // Should not include the current post
    expect(
      posts.every(
        (p) =>
          p.slug !==
          "change-healthcare-attack-what-it-means-for-your-practice"
      )
    ).toBe(true);
  });

  it("excludes the current post from results", () => {
    const posts = getRelatedPosts(
      "how-ai-is-changing-medical-billing",
      "ai-insights",
      3
    );

    expect(
      posts.every((p) => p.slug !== "how-ai-is-changing-medical-billing")
    ).toBe(true);
  });
});

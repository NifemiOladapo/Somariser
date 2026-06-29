import { getDbConnection } from "./db";

export async function getSummaries(userId: string) {
  const sql = await getDbConnection();
  const summaries =
    await sql`SELECT * FROM pdf_summaries WHERE user_id = ${userId} ORDER BY created_at DESC`;
  return summaries;
}

export async function getSummaryById(id: string) {
  try {
    // const sql = await getDbConnection();
    // const [summary] =
    //   await sql`SELECT id, user_id, title, original_file_url, summary_text, created_at, updated_at, status, file_name, LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1 AS word_count FROM pdf_summaries WHERE id=${id}`;
    // return summary;
    return {
      id: "1c4c3378-9b66-4696-aa4a-3d31cadbd618",
      user_id: "user_30hPLX2Lq884VDkTyjGbHi3QJSf",
      title: "Angular Js(0)",
      original_file_url:
        "https://utfs.io/f/TkkTHbnWpZVutDGA0rECLm0hbY6rcox5JjyUHIvQzW1fARsB",
      summary_text:
        "# 🚀 Mastering AngularJS: The Ultimate Starter Guide\n" +
        "- 🎯 A comprehensive introduction to building dynamic, high-performance Single Page Applications (SPAs) using the AngularJS framework.\n" +
        "- 🚀 Transform static HTML into a responsive, data-driven experience with minimal code.\n" +
        "\n" +
        "# Document Details\n" +
        "- 🗂️ Type: Educational Tutorial / Technical Guide\n" +
        "- 👥 For: Software professionals and developers wanting to learn AngularJS basics.\n" +
        "\n" +
        "# Key Highlights\n" +
        "- 🚀 Structural framework that extends HTML syntax to express application components clearly.\n" +
        "- ⭐ Built-in support for Data-Binding and Dependency Injection to eliminate boilerplate code.\n" +
        "- 🔍 Open-source and cross-browser compliant, maintained by Google.\n" +
        "\n" +
        "# Why It Matters\n" +
        '- 💡 AngularJS allows developers to create "Rich Internet Applications" that feel like desktop software. By separating the data (Model), the user interface (View), and the logic (Controller), it makes large-scale web projects significantly easier to maintain and test.\n' +
        "\n" +
        "# Main Points\n" +
        '- 🎯 MVW Architecture: Uses a "Model-View-Whatever" pattern to keep business logic separate from the UI.\n' +
        "- 💪 Responsive Experience: Two-way data binding ensures that the view updates instantly when the data changes.\n" +
        "- 🔥 Efficient Development: Directives like `ng-repeat` and `ng-model` allow developers to achieve complex functionality with very short code.\n" +
        "\n" +
        "# Pro Tips\n" +
        "- 🌟 Start with a CDN: Use Google's Hosted Libraries to speed up load times and avoid hosting files locally.\n" +
        "- 💎 Organize with Modules: Break your app into Application and Controller modules to keep your codebase clean.\n" +
        "- ✨ Master Directives: Use `ng-show` and `ng-hide` to create dynamic interfaces that react to user input without refreshing the page.\n" +
        "\n" +
        "# Key Terms to Know\n" +
        '- 📚 $scope: The "glue" object that connects the JavaScript controller to the HTML view.\n' +
        "- 🔍 Directives: Special HTML attributes (starting with `ng-`) that tell AngularJS to attach a specific behavior to a DOM element.\n" +
        "\n" +
        "# Bottom Line\n" +
        "- 🎯 AngularJS is a powerful tool for creating scalable, maintainable Single Page Applications by extending HTML with JavaScript logic.",
      created_at: "2026-06-26T13:35:25.009Z",
      updated_at: "2026-06-26T13:35:25.009Z",
      status: "completed",
      file_name: "AngularJs(0).pdf",
      word_count: 299,
    };
  } catch (error) {
    console.log("Error fetching summary by id", error);
  }
}

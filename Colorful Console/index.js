const http = require("http");
const qs = require("querystring");

const chalk = require("chalk");

console.log(chalk.yellow("HELLO NODE"));
// 1.Create server
const app = http.createServer((req, res) => {
    // 2. error handling
    req.on("error", (err) => console.log("REQ ERR", err));
    res.on("error", (err) => console.log("REQ ERR", err));

    // 3. Tell the client what we are sending
    res.setHeader("content-type", "text/html");

    if (req.method === "GET") {
        // 4. Send something to the client
        res.end(`
    <!doctype html>
      <html>
      <title>Colors</title>
      <form method="POST">
      <input type="text" name="text">
      <select name="color">
          <option value="red">red</option>
          <option value="blue">blue</option>
          <option value="green">green</option>
          <option value="yellow">yellow</option>
          <option value="gray">gray</option>
          <option value="magenta">magenta</option>
          <option value="cyan">cyan</option>
      </select>
      <button type="submit">Go</button>
      </form>
      </html>
    `);
        // 5. Handle Post request
    } else if (req.method === "POST") {
        // 6. Make the body request
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });
        //7. Listen for end event
        req.on("end", () => {
            // Get user input. ES6 destructuring
            const { text, color } = qs.parse(body);

            // TODO: print out the text to the console in the provided color
            console.log("text:,", chalk[color](text));

            // TODO: make the HTML dynamic by using interpolation
            //Respond
            res.end(`<!doctype html>
                <html>
                <title>${text}</title>
                <a href="/" style="color:${color}">${text}</a>
                </html>`);
        });
    }
});

app.listen(5500, () => console.log("SERVER IS RUNNING"));

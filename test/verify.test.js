const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe('the index.js file', () => {
  it('should create a `person` object that has an `age` of 0 (zero)', async function() {
      const person = await page.evaluate(() => person);
      expect(person.age).toBe(0);
  });

  it('should create a function named `celebrateBirthday` that takes a `person`, updates their `age` by one year and returns the `person`', async function() {
      const person = await page.evaluate(() => {
        return celebrateBirthday(person);
      });

      expect(person.age).toBe(1);
  });
});


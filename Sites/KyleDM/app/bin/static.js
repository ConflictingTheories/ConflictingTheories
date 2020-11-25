/*                                            *\
** ------------------------------------------ **
**         Calliope - Site Generator   	      **
** ------------------------------------------ **
**  Copyright (c) 2020 - Kyle Derby MacInnis  **
**                                            **
** Any unauthorized distribution or transfer  **
**    of this work is strictly prohibited.    **
**                                            **
**           All Rights Reserved.             **
** ------------------------------------------ **
\*                                            */

/*                                            *\
** ------------------------------------------ **
** !!! NOTE: -- NO NEED TO EDIT THIS FILE !!! **
** ------------------------------------------ **
\*                                            */
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const { getPages, getPosts } = require("../lib/generator");

module.exports = (async () => {
  // Make Directory for Site Content
  await fs.promises.mkdir(path.join(__dirname + `/../website/build/content`), {
    recursive: true,
  });
  // COPY Posts
  let posts = await getPosts();
  let postJson = (
    await Promise.all(
      posts.map((file) => {
        return new Promise((resolve, reject) => {
          fs.readFile(file, "utf8", async function (err, data) {
            // Read each file
            if (err) {
              console.log(
                "cannot read the file, something goes wrong with the file",
                err
              );
              reject(err);
            }
            await fs.promises.mkdir(
              path.join(__dirname + `/../website/build/content/posts/`),
              {
                recursive: true,
              }
            );
            // Copy into Build Dir
            let filename = file
              .split("../content/posts/")[1]
              .split(/[\/\s]+/)
              .join("-");

            let date =
              data.match(
                /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\+[0-9]{2}:[0-9]{2}/
              ) || Date.now();

            let outName = `${("" + date).split(/[:\+]/).join("-")}_${filename}`;

            fs.writeFileSync(
              path.join(
                __dirname + `/../website/build/content/posts/${outName}`
              ),
              data
            );

            resolve(outName);
          });
        });
      })
    )
  ).sort().reverse();

  console.log(postJson);
  // COPY Pages
  let pages = await getPages();
  let pageJson = (
    await Promise.all(
      pages.map((file) => {
        return new Promise((resolve, reject) => {
          let filename = file
            .split("../content/pages/")[1]
            .split(/[\/\s]+/)
            .join("-");
          fs.readFile(file, "utf8", async function (err, data) {
            // Read each file
            if (err) {
              console.log(
                "cannot read the file, something goes wrong with the file",
                err
              );
              reject(err);
            }
            // Copy into Build Dir
            await fs.promises.mkdir(
              path.join(__dirname + `/../website/build/content/pages/`),
              {
                recursive: true,
              }
            );
            let date =
              data.match(/\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d+\d\d:\d\d/) ||
              Date.now();
            let outName = `${("" + date).split(/[:\+]/).join("-")}_${filename}`;

            fs.writeFileSync(
              path.join(
                __dirname + `/../website/build/content/pages/${outName}`
              ),
              data
            );

            resolve(outName);
          });
        });
      })
    )
  ).sort().reverse();
  console.log(pageJson);

  // COPY Media
  const mediaFiles = path.join(__dirname + `/../../content/media`);
  console.log("Transfering:\n\n", mediaFiles);
  // Transfer Media Files
  glob(mediaFiles + "/**/*.*", function (err, files) {
    if (err) {
      console.log(
        "cannot read the Pages folder, something goes wrong with glob",
        err
      );
    }
    // Copy Files
    files.forEach(async (file) => {
      console.log(file);
      let filename = file.split(`/content/media/`)[1];
      let filenamePath = filename.split(/[\/]/);
      let filepath = filenamePath.pop();
      console.log("transfering -- ", filepath);
      await fs.promises.mkdir(
        path.join(
          __dirname +
            `/../website/build/content/media/${filenamePath.join("/")}`
        ),
        {
          recursive: true,
        }
      );
      const readFile = fs.createReadStream(file);
      const outFile = fs.createWriteStream(
        path.join(__dirname + `/../website/build/content/media/${filename}`)
      );
      readFile.pipe(outFile);
    });
  });

  // Write JSON Manifests
  fs.writeFileSync(
    path.join(__dirname, "/../website/build/content/posts.json"),
    JSON.stringify(postJson)
  );
  fs.writeFileSync(
    path.join(__dirname, "/../website/build/content/pages.json"),
    JSON.stringify(pageJson)
  );
})();

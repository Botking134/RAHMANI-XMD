"use strict";
const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({ 
  nomCom: "repo", 
  categorie: "General",
  reaction: "🔎",
  aliases: ["source", "script"],
  desc: "Show bot repository information",
  nomFichier: __filename 
}, async (dest, zk, commandeOptions) => {
  const { repondre, prefixe } = commandeOptions;
  const githubRepo = 'https://github.com/Qartde/RAHMANI-XMD';
  const thumbnailImg = 'https://files.catbox.moe/aktbgo.jpg';
  const channelThumbnail = 'https://files.catbox.moe/aktbgo.jpg';

  try {
    // Fetch repository data
    const response = await axios.get(githubRepo, { timeout: 10000 });
    const data = response.data;

    if (!data) {
      return repondre("Could not fetch data");
    }

    const repoInfo = {
      stars: data.stargazers_count,
      forks: data.forks_count,
      lastUpdate: new Date(data.updated_at).toLocaleDateString('en-GB'),
      owner: data.owner.login,
    };

    const releaseDate = new Date(data.created_at).toLocaleDateString('en-GB');

    // Enhanced cage design with channel information
    const gitdata = `
╭━━━〔 *𝚁𝙰𝙷𝙼𝙰𝙽𝙸_𝚇𝙼𝙳* 〕━━━┈⊷
┃★╭──────────────
┃★│ *Prefix : [ ${prefixe} ]*
┃★│ *Baileys : Multi Device*
┃★│ *Type : NodeJs*
┃★│ *Platform : Heroku*
┃★│ *Version : 1.0*
┃★│ *Owner : Rahmani*
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷

╭━━━〔 *Repository Info* 〕━━━┈⊷
┃★ *𝐑𝐞𝐩𝐨:* ${data.html_url}
┃★ *𝐒𝐭𝐚𝐫𝐞𝐫𝐬:* ${repoInfo.stars}
┃★ *𝐅𝐨𝐫𝐤𝐬:* ${repoInfo.forks}
┃★ *𝐑𝐞𝐥𝐞𝐚𝐬𝐞 𝐃𝐚𝐭𝐞:* ${releaseDate}
┃★ *𝐋𝐚𝐬𝐭 𝐔𝐩𝐝𝐚𝐭𝐞:* ${repoInfo.lastUpdate}
╰━━━━━━━━━━━━━━━━━━━━━━━━┈⊷

*Join our channel for updates!*`;

    await zk.sendMessage(dest, { 
      image: { url: thumbnailImg }, 
      caption: gitdata,
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363345407274799@newsletter',
          newsletterName: "Rahmani-MD",
          serverMessageId: -1,
        },
        forwardingScore: 999,
        externalAdReply: {
          title: "Rahmani-MD",
          body: "Next Generation",
          thumbnailUrl: channelThumbnail,
          sourceUrl: 'https://whatsapp.com/channel/0029VavShWD1iUxb6kjV6K2T',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });

  } catch (error) {
    console.log("Error fetching data:", error);
    repondre("An error occurred while fetching repository data.");
  }
});

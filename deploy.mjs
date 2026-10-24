
import "dotenv/config";
import * as ftp from "basic-ftp";
import { execSync } from "node:child_process";

const client = new ftp.Client();
client.ftp.verbose = true;

async function deploy() {
    try {
        console.log("Building React + Vite project...");
        execSync("npm run build", { stdio: "inherit" });

        const host = process.env.FTP_HOST;
        const user = process.env.FTP_USER;
        const password = process.env.FTP_PASSWORD;
        const remoteDir = process.env.FTP_REMOTE_DIR || "public_html";

        if (!host || !user || !password) {
            throw new Error("FTP credentials missing. Check your .env file.");
        }

        console.log("Connecting to Hostinger using FTPS...");

        await client.access({
            host,
            user,
            password,
            port: 21,
            secure: true,
            secureOptions: {
                rejectUnauthorized: false,
            },
        });

        await client.ensureDir(remoteDir);

        console.log("Uploading dist files to Hostinger...");
        await client.uploadFromDir("dist");

        console.log("Deployment completed!");
        console.log("Website: https://nextfurnoverseas.com");
    } catch (error) {
        console.error("Deployment failed:", error.message);
        process.exitCode = 1;
    } finally {
        client.close();
    }
}

deploy();

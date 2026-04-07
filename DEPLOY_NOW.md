# 🚀 DEPLOYMENT INSTRUCTIONS FOR QUICKPICK

Your project is ready to deploy! Follow these simple steps:

## STEP 1: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named `QuickPick`
3. Do NOT initialize with README (we already have one)
4. Click "Create repository"

## STEP 2: Push Your Code to GitHub

Copy and paste these commands in PowerShell (one at a time):

```powershell
cd "C:\Users\tsaid\OneDrive\Documents\QuickPick"
git remote add origin https://github.com/Sai-Dhruva-theratipally/QuickPick.git
git branch -M main
git push -u origin main
```

You'll be prompted to authenticate - follow GitHub's instruction (use Personal Access Token or web login).

## STEP 3: Deploy to Vercel

1. Open https://vercel.com/new in your browser
2. Click "Import Git Repository"
3. Login/Signup if needed
4. Paste this URL: `https://github.com/Sai-Dhruva-theratipally/QuickPick.git`
5. Click "Continue"

## STEP 4: Configure Vercel Project

You'll see project settings - keep defaults and click "Deploy"

## STEP 5: Add Environment Variables

After deployment starts (it may fail without env vars, that's OK):

1. Click on your project in Vercel dashboard
2. Go to "Settings" → "Environment Variables"
3. Add these variables:

| Variable Name | Value |
|---|---|
| MONGODB_URI | `mongodb+srv://saidhruvatheratipally:11032005@schememanagement.ort5i2h.mongodb.net/?appName=SchemeManagement` |
| JWT_SECRET | `secret#text` |
| CLOUDINARY_NAME | `dfwjnpbk2` |
| CLOUDINARY_API_KEY | `683524429119454` |
| CLOUDINARY_API_SECRET | `oh-hq7D439bogD0UmhQ5kfb_poA` |
| CLIENT_URLS | Keep as is for now |

4. Click "Save"

## STEP 6: Redeploy

1. Go to "Deployments" tab
2. Click on the recent deployment
3. Click the three dots (⋯)
4. Select "Redeploy"

## ✅ DONE!

Wait for deployment to complete. Your URL will be shown on the Vercel dashboard, typically:
- `https://quickpick-[random-code].vercel.app`

🎉 Test your site at that URL!

---

## ⚠️ IMPORTANT NOTES:

- First deployment may take 5-10 minutes
- Initial API calls may be slow (serverless cold start)
- If getting errors, check Vercel deployment logs
- MongoDB must allow connections from Vercel IPs (usually allows all by default in free tier)

## 📋 Quick Links:

- Vercel Dashboard: https://vercel.com/dashboard
- GitHub: https://github.com/Sai-Dhruva-theratipally
- MongoDB Atlas: https://cloud.mongodb.com
